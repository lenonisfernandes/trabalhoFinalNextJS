import { NextResponse } from "next/server";
import { admin } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const user = await admin.auth().createUser({
      email,
      password,
    });

    return NextResponse.json(
      {
        uid: user.uid,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
