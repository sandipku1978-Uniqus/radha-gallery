import { getFeaturedPaintings, getArtistProfile } from '@/lib/data';
import { Hero } from '@/components/home/Hero';
import { FeaturedWorks } from '@/components/home/FeaturedWorks';

export default async function HomePage() {
  const [featured, artist] = await Promise.all([getFeaturedPaintings(), getArtistProfile()]);
  const heroPainting = featured[0];

  return (
    <>
      <Hero painting={heroPainting} artist={artist} />
      <FeaturedWorks paintings={featured} />
    </>
  );
}
