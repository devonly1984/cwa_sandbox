import "server-only"

import { auth } from "@clerk/nextjs/server"
import { and, desc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

export type GameListItem = Pick<typeof games.$inferSelect, "id" | "title">
export type GameDetail = Pick<
  typeof games.$inferSelect,
  "id" | "title" | "messages" | "lastEventId"
>

export async function listGames(): Promise<GameListItem[]> {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return []
  }

  return db
    .select({ id: games.id, title: games.title })
    .from(games)
    .where(eq(games.orgId, orgId))
    .orderBy(desc(games.createdAt))
}

export async function getGame(id: string): Promise<GameDetail | null> {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return null
  }

  const [game] = await db
    .select({
      id: games.id,
      title: games.title,
      messages: games.messages,
      lastEventId: games.lastEventId,
    })
    .from(games)
    .where(and(eq(games.id, id), eq(games.orgId, orgId)))
    .limit(1)

  return game ?? null
}