"use server"

import { auth } from "@clerk/nextjs/server"
import { refresh } from "next/cache"
import { anthropic } from "@ai-sdk/anthropic"
import { generateText } from "ai"

import { db } from "@/lib/db"
import { games } from "@/lib/db/schema"

export async function createGame(prompt: string) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    throw new Error("Select an organization before creating a game")
  }

  const trimmedPrompt = typeof prompt === 'string' ? prompt.trim() : ""

  if (!trimmedPrompt) {
    return
  }

  const { text: title } = await generateText({
    model: anthropic("claude-haiku-4-5"),
    instructions: "Create a short, memorable title for a game based on the user's idea. Return only the title, without quotes.",
    prompt: trimmedPrompt,
    maxOutputTokens: 24,
  })

  const [game] = await db
    .insert(games)
    .values({ orgId, title: title.trim() || trimmedPrompt })
    .returning({ id: games.id })
  refresh()
  return game.id
}