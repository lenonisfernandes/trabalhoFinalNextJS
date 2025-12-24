import Link from "next/link";
import { notFound } from "next/navigation";

export default async function FilmePage({ params }) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query Filme($slug: String!) {
            filme(slug: $slug) {
              title
              director
              year
              rating
              release
              date
            }
          }
        `,
      variables: { slug },
    }),
    next: { revalidate: 60000 },
  });

  const json = await res.json();

  if (json.errors) {
    console.error("GRAPHQL ERROR:", json.errors);
    notFound();
  }

  const filme = json.data?.filme;

  if (!filme) {
    notFound();
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-white text-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">{filme.title}</h1>
        <p className="mt-4">
          <b>Diretor:</b> {filme.director}
        </p>
        <p className="mt-4">
          <b>Ano:</b> {filme.year}
        </p>
        <p className="mt-4">
          <b>Nota:</b> {filme.rating}
        </p>
        <p className="mt-4">
          <b>Lançamento:</b> {filme.release}
        </p>
        <p className="mt-4">
          <b>Data:</b> {filme.date}
        </p>
      </div>

      <div>
        <Link
          href="/dashboard/filmes"
          className="mt-6 text-blue-500 hover:underline"
        >
          Voltar
        </Link>
      </div>
    </main>
  );
}
