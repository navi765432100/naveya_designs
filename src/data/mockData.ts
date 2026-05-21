export interface DesignerInfo {
  name: string;
  title: string;
  biographyShort: string;
  biographyLong: string;
  philosophy: string;
  portraitUrl: string;
  stats: { label: string; value: string }[];
  socialLinks: { platform: string; url: string }[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  year: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'runway' | 'sketches' | 'editorial' | 'details';
  image: string;
  secondaryImages: string[];
  description: string;
  collectionId: string;
  year: string;
  materials: string[];
  credits?: string;
}

export const designerInfo: DesignerInfo = {
  name: "Naveya Designs",
  title: "Haute Couture & Editorial Designer",
  biographyShort: "123An avant-garde force in modern haute couture, Naveya Designs creates garments that exist at the intersection of sculptural art and wearable poetry.",
  biographyLong: "Naveya Designs is an award-winning fashion designer based in Milan, known for her structural silhouettes, meticulous fabric manipulations, and commitment to sustainable luxury. Graduating from the Istituto Marangoni, she completed apprenticeships with leading Parisian fashion houses before launching her namesake atelier. Her designs challenge traditional garment construction by mixing organic raw textures with fluid silk drapes, resulting in pieces that evoke strength, vulnerability, and timeless elegance.",
  philosophy: "Fashion is not merely about dressing the body; it is a sculptural architecture for the soul. I design for those who carry their clothing as a form of non-verbal poetry, embracing both structural armor and fluid sensuality.",
  portraitUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200",
  stats: [
    { label: "Years of Design", value: "8+" },
    { label: "Couture Collections", value: "12" },
    { label: "Global Runways", value: "6" },
    { label: "Sustainable Sourced", value: "100%" }
  ],
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "Pinterest", url: "https://pinterest.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" }
  ]
};

export const collections: Collection[] = [
  {
    id: "noir-26",
    title: "The Noir Collection '26",
    description: "An exploration of darkness, shadow play, and architectural silhouettes using rich black silks, structured wool, and hand-woven mesh.",
    coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200",
    year: "2026",
    category: "Haute Couture"
  },
  {
    id: "organic-drapes",
    title: "Organic Drapes & Textures",
    description: "Honoring earth and form, this collection combines raw linens, crinkled organza, and unbleached cotton with fluid liquid-silk drapes.",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200",
    year: "2025",
    category: "Ready-to-Wear"
  },
  {
    id: "avant-garde-sculptures",
    title: "Avant-Garde Sculptures",
    description: "Pushing boundaries of shape and materials, featuring structural cages, metallic threads, and oversized asymmetrical collars.",
    coverImage: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1200",
    year: "2025",
    category: "Editorial & Runway"
  }
];

export const portfolioItems: PortfolioItem[] = [
  // Noir Collection Items
  {
    id: "noir-silhouette-1",
    title: "The Sculptured Tuxedo Gown",
    category: "runway",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200",
    secondaryImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200"
    ],
    description: "A hybrid piece combining the sharp shoulders of a traditional tuxedo jacket with the flowing elegance of a structured satin gown. Crafted from wool-crepe and silk satin.",
    collectionId: "noir-26",
    year: "2026",
    materials: ["Silk Satin", "Wool-Crepe", "Satin-faced Organza"],
    credits: "Photography: Marcus Thorne | Model: Elena Rostova"
  },
  {
    id: "noir-veil-details",
    title: "Hand-pleated Silk Crêpe Veil",
    category: "details",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200",
    secondaryImages: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200"
    ],
    description: "Extreme close-up detailing the fine hand-pleating process. Takes over 45 hours of handwork in our Milan atelier.",
    collectionId: "noir-26",
    year: "2026",
    materials: ["Silk Crêpe de Chine", "Metallic Threading"],
    credits: "Studio Detail Shot"
  },
  {
    id: "noir-sketch-1",
    title: "Conceptual Tuxedo Sketch",
    category: "sketches",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200",
    secondaryImages: [
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200"
    ],
    description: "Initial pencil and charcoal study exploring the structural tension between hard shoulder padding and fluid skirt folds.",
    collectionId: "noir-26",
    year: "2025",
    materials: ["Charcoal", "Heavy Canson Paper", "Watercolour"],
    credits: "Naveya Designs Sketches Archive"
  },

  // Organic Drapes Items
  {
    id: "organic-drape-1",
    title: "Liquid Gold Silk Draped Slip",
    category: "editorial",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200",
    secondaryImages: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200"
    ],
    description: "An elegant, backless dress constructed from bias-cut heavy silk charmeuse that wraps around the figure like liquid gold. Shot on location in the olive groves of Tuscany.",
    collectionId: "organic-drapes",
    year: "2025",
    materials: ["100% Bias-Cut Silk Charmeuse", "Organic Linen Linings"],
    credits: "Photography: Sofia Bianchi | Model: Clara Mensah"
  },
  {
    id: "organic-linen-sketches",
    title: "Draped Linen Silhouette Study",
    category: "sketches",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1200",
    secondaryImages: [],
    description: "Exploration of gravity and natural falls on loose-fit organic linen structures. Hand sketched during a residency in Kyoto.",
    collectionId: "organic-drapes",
    year: "2024",
    materials: ["Ink", "Handmade Mulberry Paper"],
    credits: "Naveya Designs Sketches Archive"
  },

  // Avant-Garde Items
  {
    id: "avant-garde-sculpture-1",
    title: "The Origami Organza Shell",
    category: "runway",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1200",
    secondaryImages: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200"
    ],
    description: "A sculptural masterpiece constructed using geometric origami folding techniques on stiff silk organza. It stands away from the body, creating an architectural aura.",
    collectionId: "avant-garde-sculptures",
    year: "2025",
    materials: ["Stiffened Silk Organza", "Internal Wire Framework"],
    credits: "Paris Fashion Week - AW '25"
  },
  {
    id: "avant-garde-editorial-1",
    title: "Structural Organza Gown in Motion",
    category: "editorial",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200",
    secondaryImages: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?q=80&w=1200"
    ],
    description: "Capturing the motion and structural integrity of the Origami Gown against a high-contrast industrial backdrop.",
    collectionId: "avant-garde-sculptures",
    year: "2025",
    materials: ["Silk Organza", "Polished Aluminum Clasp"],
    credits: "Photography: Arthur Chen | Model: Yuka Sato"
  },
  {
    id: "avant-garde-detail-1",
    title: "Wire Shell Structure Close Up",
    category: "details",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200",
    secondaryImages: [],
    description: "Detail of the custom-forged internal aluminum structure that supports the geometric folding of the organza outer shell.",
    collectionId: "avant-garde-sculptures",
    year: "2025",
    materials: ["Anodized Aluminum", "Fine Silk Thread"],
    credits: "Studio Detail Shot"
  }
];
