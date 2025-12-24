import { verifySession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }) {
    const user = await verifySession();
    if(!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="bg-white border-b px-6 py-4 flex justify-between">
                <span className="font-bold">Bem-vindo, {user.email}!</span>
                <span className="text-sm text-gray-500"><Link href="/dashboard">Voltar ao Dashboard</Link></span>
            </nav>
            <main className="p-6">{children}</main>
        </div>
    )
}