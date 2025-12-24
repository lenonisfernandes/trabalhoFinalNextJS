import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Site de Análise de Filmes</title>
      </head>
      <body className="min-h-screen bg-gray-950 text-gray-100">
        <header className="bg-gray-900 border-b border-gray-800">
          <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-lg font-bold text-white">
              Site de Análise de Filmes
            </h1>

            <ul className="flex gap-6 text-sm font-medium">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-red-400 transition"
                >
                  Cadastrar
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {children}
        
        <footer className="bg-gray-900 border-t border-gray-800 mt-8">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Site de Análise de Filmes. Todos
            os direitos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
