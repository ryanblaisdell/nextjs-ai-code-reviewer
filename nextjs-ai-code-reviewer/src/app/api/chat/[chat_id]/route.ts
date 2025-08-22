import { UUID } from "mongodb";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export interface NewConversationRequest {
    email: string,
    conversationId: UUID
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chat_id: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const { chat_id } = await params;

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, email })
    });

    const responseBody = await response.json();
    console.log('Received response:', responseBody);

    if (!response.ok) {
      return NextResponse.json({ error: responseBody.detail }, { status: response.status });
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.log('[Conversation Retrieval Error]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}