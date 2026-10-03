import { anthropic } from "@ai-sdk/anthropic"
import { chat, upsertIncomingMessage } from "@trigger.dev/sdk/ai"
import { eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

export const gameChat = chat.agent({
  id: "game-chat",
  hydrateMessages: async ({ chatId, trigger, incomingMessages }) => {
    const [game] = await db
      .select({ messages: games.messages })
      .from(games)
      .where(eq(games.id, chatId))
      .limit(1)

    if (!game) {
      throw new Error("Game not found")
    }

    const storedMessages = game.messages

    if (upsertIncomingMessage(storedMessages, { trigger, incomingMessages })) {
      await db
        .update(games)
        .set({ messages: storedMessages })
        .where(eq(games.id, chatId))
    }

    return storedMessages
  },
  onTurnComplete: async ({ chatId, uiMessages, lastEventId }) => {
    await db
      .update(games)
      .set({
        messages: uiMessages,
        ...(lastEventId ? { lastEventId } : {}),
      })
      .where(eq(games.id, chatId))
  },
  run: async ({ messages, signal, streamText }) =>
    streamText({
      model: anthropic("claude-sonnet-5"),
      messages,
      abortSignal: signal,
    }),
})