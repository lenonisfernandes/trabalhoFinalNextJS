"use client";

import { useState } from "react";

export default function NovoFilmePage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    director: "",
    year: "",
    rating: "",
    release: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/filmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          rating: Number(form.rating),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao cadastrar filme");
      }

      setForm({
        title: "",
        slug: "",
        director: "",
        year: "",
        rating: "",
        release: "",
        date: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Novo Filme
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Título
        </label>
        <input
          name="title"
          required
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white text-gray-800 border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Slug
        </label>
        <input
          name="slug"
          required
          value={form.slug}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white text-gray-800 border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Diretor
        </label>
        <input
          name="director"
          value={form.director}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white text-gray-800 border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Ano
        </label>
        <input
          name="year"
          type="number"
          value={form.year}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white text-gray-800 border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Nota
        </label>
        <input
          name="rating"
          type="number"
          min="0"
          max="10"
          value={form.rating}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white text-gray-800 border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Data de Lançamento
        </label>
        <input
          name="release"
          type="date"
          value={form.release}
          onChange={handleChange}
          className="w-full p-2 mb-4 rounded bg-white text-gray-800 border border-gray-700"
        />

        <label className="block mb-2 text-sm font-bold text-gray-800">
          Data
        </label>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-6 rounded bg-white text-gray-800 border border-gray-700"
        />

        <button
          disabled={loading}
          className="w-full mt-6 bg-blue-400 hover:bg-blue-500 disabled:opacity-50 text-gray-800 p-2 rounded font-bold transition"
        >
          {loading ? "Salvando..." : "Salvar Filme"}
        </button>
      </form>
    </div>
  );
}
