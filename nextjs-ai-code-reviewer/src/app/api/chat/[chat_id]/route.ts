import { UUID } from "mongodb";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://localhost:8000";

export interface NewConversationRequest {
  email: string;
  conversationId: UUID;
}

export async function GET(request: Request, { params }: { params: Promise<{ chat_id: string }> }) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const { chat_id } = await params;

    const query = new URLSearchParams({ chat_id, email: email ?? "" }).toString();

    const response = await fetch(`${API_BASE_URL}/chat?${query}`, {
      method: "GET",
    });

    const responseBody = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: responseBody.detail }, { status: response.status });
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.log("[Conversation Retrieval Error]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
