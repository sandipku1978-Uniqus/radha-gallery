import { streamText, createUIMessageStreamResponse } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { buildChatContext } from '@/lib/chat/context';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const systemPrompt = buildChatContext();

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: systemPrompt,
    messages,
    maxOutputTokens: 500,
  });

  return createUIMessageStreamResponse({
    stream: result.toUIMessageStream(),
  });
}
