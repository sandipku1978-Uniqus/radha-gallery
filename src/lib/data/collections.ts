export interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  gradient: string;
  sortOrder: number;
}

export const collections: Collection[] = [
  {
    id: 'c1',
    title: 'Abstract Landscapes',
    slug: 'abstract-landscapes',
    description: 'Vast horizons and open spaces distilled into color and form. These paintings capture the emotional essence of landscapes — the warmth of golden plains, the drama of mountain passes, and the energy of open skies — without literal representation.',
    gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6E4E 50%, #5A4A3A 100%)',
    sortOrder: 1,
  },
  {
    id: 'c2',
    title: 'Nature Studies',
    slug: 'nature-studies',
    description: 'Close observations of the natural world — rain, forests, flowers, oceans — translated through an abstract lens. Each piece begins with direct observation in nature and evolves into an expressive interpretation on canvas.',
    gradient: 'linear-gradient(135deg, #4A7C5E 0%, #2D6B4F 50%, #88C4D4 100%)',
    sortOrder: 2,
  },
  {
    id: 'c3',
    title: 'Mixed Media',
    slug: 'mixed-media',
    description: 'Experiments in texture, material, and process. These works combine acrylic, charcoal, paper, fabric, and found materials to create tactile surfaces that invite both visual and physical exploration.',
    gradient: 'linear-gradient(135deg, #C4724E 0%, #4A4A48 50%, #8B8B85 100%)',
    sortOrder: 3,
  },
];
