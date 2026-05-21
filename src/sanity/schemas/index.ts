// Sanity Schema Definitions for Fashion Portfolio website
// Copy these definitions into your Sanity Studio schemas folder.

export const designerSchema = {
  name: 'designer',
  title: 'Designer Info',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Designer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Professional Title',
      type: 'string',
      description: 'e.g. Haute Couture & Editorial Designer',
    },
    {
      name: 'biographyShort',
      title: 'Short Biography',
      type: 'text',
      description: 'A 1-2 sentence quick summary of style/essence.',
    },
    {
      name: 'biographyLong',
      title: 'Full Biography',
      type: 'text',
      description: 'The designer\'s background story, education, and career details.',
    },
    {
      name: 'philosophy',
      title: 'Design Philosophy',
      type: 'text',
      description: 'Statement about their relationship with fashion and form.',
    },
    {
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'stats',
      title: 'Aesthetic Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' }
          ]
        }
      ]
    }
  ]
};

export const collectionSchema = {
  name: 'collection',
  title: 'Collections',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Collection Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'The creative theme of the collection.',
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Release Year',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. Haute Couture, Ready-to-Wear, Editorial',
    }
  ]
};

export const portfolioItemSchema = {
  name: 'portfolioItem',
  title: 'Portfolio Gallery Items',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Item Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Runway', value: 'runway' },
          { title: 'Sketches', value: 'sketches' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Details & Textures', value: 'details' }
        ]
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Primary Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'secondaryImages',
      title: 'Gallery Carousel (Secondary Images)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'description',
      title: 'Detailed Description',
      type: 'text',
      description: 'Garment structure, inspirations, and manufacturing notes.',
    },
    {
      name: 'collection',
      title: 'Associated Collection',
      type: 'reference',
      to: [{ type: 'collection' }]
    },
    {
      name: 'year',
      title: 'Year Created',
      type: 'string',
    },
    {
      name: 'materials',
      title: 'Materials Used',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'credits',
      title: 'Credits (Photographer, Model)',
      type: 'string',
    }
  ]
};

export const schemas = [designerSchema, collectionSchema, portfolioItemSchema];
