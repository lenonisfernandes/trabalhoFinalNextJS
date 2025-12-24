import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await db.collection("filmes").get();

    const filmes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(filmes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar filmes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // validação mínima
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { error: "Title e slug são obrigatórios" },
        { status: 400 }
      );
    }

    const filme = {
      title: body.title,
      date: body.date,       // "2025-10-18"
      year: body.year,       // 2025
      release: body.release, // "2025-10-10"
      director: body.director,
      rating: body.rating,
      slug: body.slug,
      createdAt: new Date(),
    };

    const docRef = await db.collection("filmes").add(filme);

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ERRO AO INSERIR FILME:", error);
    return NextResponse.json(
      { error: "Erro ao inserir filme" },
      { status: 500 }
    );
  }
}
