export interface ArtistProfile {
  name: string;
  tagline: string;
  bio: string;
  processDescription: string;
  location: string;
  email: string;
  instagram: string;
  gradient: string; // placeholder for photo
}

export const artistProfile: ArtistProfile = {
  name: 'Radha Khetan',
  tagline: 'Abstract & Nature-Inspired Paintings',
  bio: `Radha Khetan is a self-taught painter based in San Jose, California, whose work explores the intersection of abstract expression and the natural world. Drawing from her roots in India and her life in the Bay Area, Radha's paintings are rich with color, texture, and emotional depth.

Her artistic journey began as a deeply personal practice — a way to process the beauty she observed in everyday moments: the light filtering through redwood canopies, the rhythm of monsoon rain, the warmth of terracotta under a summer sun. Over the past year, what started as a private meditation has grown into a collection of 15+ original paintings that celebrate the universal language of color and form.

Radha works primarily in acrylic on canvas, though she frequently experiments with mixed media — incorporating charcoal, watercolor, and textured materials to add depth and tactile quality to her pieces. Her palette leans toward warm earth tones and the vivid hues of nature, though she is equally drawn to the quiet power of monochrome.

Each painting begins with observation — a walk through a garden, a memory of traveling through the Indian countryside, the changing light of a California sunset. These moments are distilled and abstracted on canvas, creating works that feel both specific and universal.`,
  processDescription: `My process begins with observation and stillness. I spend time in nature, collecting moments — the way light moves through leaves, the color of wet earth, the patterns in flowing water. These observations become the seeds of each painting.

In the studio, I work intuitively. I begin with broad washes of color, letting the paint guide the composition. As layers build, the painting begins to reveal its own story. I work in acrylic for its versatility and quick drying time, which allows me to build up layers rapidly and maintain the energy of the initial inspiration.

For my mixed media pieces, I incorporate materials that add texture and dimension — torn paper, charcoal, fabric scraps, even sand. These elements create a tactile surface that invites the viewer to look closer and discover new details with each viewing.

I believe art should be felt before it is understood. My goal is to create paintings that evoke an emotional response — a sense of warmth, calm, wonder, or vitality — before the viewer even considers what the painting "represents."`,
  location: 'San Jose, California',
  email: 'hello@radhakhetan.art',
  instagram: 'https://instagram.com/palletenpaint',
  gradient: 'linear-gradient(135deg, #D4A574 0%, #8B6E4E 50%, #C4A882 100%)',
};
