import Link from "next/link";

export default async function GraphQLPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          filmes(orderByDateDesc: true) {
            id
            title
            year
            slug
          }
        }
      `,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  const filmes = json.data.filmes;

  return (
    <main className="flex h-screen items-center justify-center  text-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Filmes analisados:</h1>

        {filmes.map((filme) => (
          <li key={filme.id} className="mt-4">
            <Link href={`/dashboard/filmes/${filme.slug}`}>
              {filme.title} ({filme.year})
            </Link>
          </li>
        ))}
      </div>
    </main>
  );
}
