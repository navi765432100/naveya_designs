import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { designerInfo, collections, portfolioItems, DesignerInfo, Collection, PortfolioItem } from '@/data/mockData';

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-20',
  useCdn: process.env.NODE_ENV === 'production',
};

// Create client only if project ID is provided, otherwise create a mock client or null
export const client = sanityConfig.projectId
  ? createClient(sanityConfig.projectId.startsWith('mock') ? { ...sanityConfig, projectId: 'placeholder' } : sanityConfig)
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (builder && source) {
    return builder.image(source).url();
  }
  // Fallback for mock data (which are direct URLs)
  if (typeof source === 'string') {
    return source;
  }
  return '/placeholder.jpg';
}

export const isSanityConfigured = (): boolean => {
  return !!sanityConfig.projectId && !sanityConfig.projectId.startsWith('mock');
};

// Fetch Helper Functions with Fallback to Mock Data
export async function getDesignerInfo(): Promise<DesignerInfo> {
  if (!isSanityConfigured()) {
    return designerInfo;
  }

  try {
    const query = `*[_type == "designer"][0] {
      name,
      title,
      biographyShort,
      biographyLong,
      philosophy,
      "portraitUrl": portrait.asset->url,
      stats,
      socialLinks
    }`;
    const data = await client!.fetch(query);
    return data || designerInfo;
  } catch (error) {
    console.warn("Sanity fetch failed for 'designerInfo', falling back to mock data.", error);
    return designerInfo;
  }
}

export async function getCollections(): Promise<Collection[]> {
  if (!isSanityConfigured()) {
    return collections;
  }

  try {
    const query = `*[_type == "collection"] | order(year desc) {
      "id": _id,
      title,
      description,
      "coverImage": coverImage.asset->url,
      year,
      category
    }`;
    const data = await client!.fetch(query);
    return data && data.length > 0 ? data : collections;
  } catch (error) {
    console.warn("Sanity fetch failed for 'collections', falling back to mock data.", error);
    return collections;
  }
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSanityConfigured()) {
    return portfolioItems;
  }

  try {
    const query = `*[_type == "portfolioItem"] | order(year desc) {
      "id": _id,
      title,
      category,
      "image": image.asset->url,
      "secondaryImages": secondaryImages[].asset->url,
      description,
      "collectionId": collection->_id,
      year,
      materials,
      credits
    }`;
    const data = await client!.fetch(query);
    return data && data.length > 0 ? data : portfolioItems;
  } catch (error) {
    console.warn("Sanity fetch failed for 'portfolioItems', falling back to mock data.", error);
    return portfolioItems;
  }
}
