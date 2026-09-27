import "server-only"

import { auth } from "@clerk/nextjs/server"
import { desc, eq } from "drizzle-orm"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

export type GameListItem = Pick<typeof games.$inferSelect, "id" | "title">

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