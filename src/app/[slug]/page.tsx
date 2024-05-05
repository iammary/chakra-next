import CharactersLayout from '@/app/layouts/CharactersLayout';

export default function Page({ params }: { params: { slug: string } }) {
  return <CharactersLayout page={parseInt(params.slug)} />;
}
