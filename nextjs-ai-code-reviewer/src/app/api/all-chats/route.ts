import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8000";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const response = await fetch(`${API_BASE_URL}/chats?email=${encodeURIComponent(email)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const responseBody = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: responseBody.detail }, { status: response.status });
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("[Chats API Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
