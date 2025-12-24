import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Visão Geral</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500">
            Status da Sessão
          </h3>
          <p className="text-2xl font-bold text-green-600 mt-2">
            Ativa & Segura
          </p>
        </div>
        <Link
  href="/dashboard/filmes"
  className="
    flex
    items-center
    justify-center
    rounded-lg
    border border-blue-200
    bg-white
    p-6
    text-blue-800
    shadow-sm
    transition
    hover:border-blue-400
    hover:shadow-md
  "
>
  <h2 className="text-2xl font-semibold">
    Ver Filmes
  </h2>
</Link>

<Link
  href="/dashboard/filmes/novo"
  className="
    flex
    items-center
    justify-center
    rounded-lg
    border border-blue-200
    bg-white
    p-6
    text-blue-800
    shadow-sm
    transition
    hover:border-blue-400
    hover:shadow-md
  "
>
  <h2 className="text-2xl font-semibold">
    Adicionar Filme
  </h2>
</Link>

        <div className="pt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
