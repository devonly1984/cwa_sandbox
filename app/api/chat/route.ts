import { anthropic } from "@ai-sdk/anthropic"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from "ai"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

const POST=async(request: Request) =>{
  const { userId, orgId } = await auth()

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!orgId) {
    return Response.json({ error: "Organization required" }, { status: 403 })
  }

  const { chatId, messages }: { chatId: string; messages: UIMessage[] } =
    await request.json()
  const [game] = await db
    .select({ id: games.id })
    .from(games)
    .where(and(eq(games.id, chatId), eq(games.orgId, orgId)))
    .limit(1)

  if (!game) {
    return Response.json({ error: "Game not found" }, { status: 404 })
  }

  const result = streamText({
    model: anthropic("claude-sonnet-5"),
   
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      originalMessages: messages,
      onEnd: async ({ messages: completedMessages }) => {
        await db
          .update(games)
          .set({ messages: completedMessages })
          .where(and(eq(games.id, chatId), eq(games.orgId, orgId)))
      },
    }),
  })
}
export { POST }