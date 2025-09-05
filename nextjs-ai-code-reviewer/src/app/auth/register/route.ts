import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8000";

export interface UserRegistrationRequest {
  name: string | null;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: responseBody.detail }, { status: response.status });
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("[Register API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
