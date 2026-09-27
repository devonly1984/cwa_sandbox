"use server"

import { auth } from "@clerk/nextjs/server"
import { refresh } from "next/cache"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

export async function createGame(formData: FormData) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    throw new Error("Select an organization before creating a game")
  }

  const title = formData.get("title")

  if (typeof title !== "string" || !title.trim()) {
    throw new Error("A game title is required")
  }

  await db.insert(games).values({ orgId, title: title.trim() })
  refresh()
}