import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const API_BASE_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export async function POST(req: Request) {
  try {
    const { message, email } = await req.json();
    const chat_id = uuidv4();

    const response = await fetch(`${API_BASE_URL}/create-chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, email, message })
    });
    
    const responseBody = await response.json();

    if (!response.ok) {
        return NextResponse.json({ error: responseBody.detail }, { status: response.status });
    }

    return NextResponse.json({ chat_id, response: "Conversation started" });
  } catch (error) {
    console.log('[Conversation Retrieval Error]', error);
    return NextResponse.json({ error: "Failed to create chat" }, { status: 500 });
  }
}
