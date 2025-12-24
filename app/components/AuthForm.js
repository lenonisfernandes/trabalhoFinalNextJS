'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthForm({
  title,
  apiRoute,
  submitText,
  loadingText,
  onSuccessRedirect,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch(apiRoute, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.refresh();
      router.push(onSuccessRedirect);
    } else {
      const data = await res.json();
      setError(data.error || 'Erro inesperado');
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-white">
          {title}
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="block mb-2 text-sm font-bold text-gray-300">
          Email:
        </label>
        <input
          name="email"
          type="email"
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-300">
          Senha:
        </label>
        <input
          name="password"
          type="password"
          required
          className="w-full p-2 mb-6 rounded bg-gray-800 text-white border border-gray-700"
        />

        <button
          disabled={loading}
          className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white p-2 rounded font-bold transition"
        >
          {loading ? loadingText : submitText}
        </button>
      </form>
    </div>
  );
}
