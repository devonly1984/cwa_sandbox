"use server"

import { auth as clerkAuth } from "@clerk/nextjs/server"
import { auth as triggerAuth } from "@trigger.dev/sdk"
import { chat } from "@trigger.dev/sdk/ai"
import { and, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"
import type { gameChat } from "@/trigger/chat"

const startSession = chat.createStartSessionAction<typeof gameChat>("game-chat")

async function assertGameAccess(chatId: string) {
  const { userId, orgId } = await clerkAuth()

  if (!userId || !orgId) {
    throw new Error("Organization required")
  }

  const [game] = await db
    .select({ id: games.id })
    .from(games)
    .where(and(eq(games.id, chatId), eq(games.orgId, orgId)))
    .limit(1)

  if (!game) {
    throw new Error("Game not found")
  }
}

export async function startGameChatSession({ chatId }: { chatId: string }) {
  await assertGameAccess(chatId)
  return startSession({ chatId })
}

export async function mintGameChatAccessToken(chatId: string) {
  await assertGameAccess(chatId)

  return triggerAuth.createPublicToken({
    scopes: {
      read: { sessions: chatId },
      write: { sessions: chatId },
    },
    expirationTime: "1h",
  })
}