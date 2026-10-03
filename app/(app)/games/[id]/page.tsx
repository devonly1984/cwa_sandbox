import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

import { mintGameChatAccessToken } from "@/app/actions"
import { ChatThread } from "@/components/chat/ChatThread"
import { getGame } from "@/lib/games/queries"

const GamePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ prompt?: string | string[] }>
}) => {
  await auth.protect({ unauthenticatedUrl: "/sign-in" })

  const [{ id }, { prompt }] = await Promise.all([params, searchParams])
  const game = await getGame(id)

  if (!game) {
    notFound()
  }

  const initialSession = game.messages.length
    ? {
        publicAccessToken: await mintGameChatAccessToken(game.id),
        lastEventId: game.lastEventId ?? undefined,
      }
    : undefined

  return (
    <ChatThread
      key={game.id}
      gameId={game.id}
      initialMessages={game.messages}
      initialSession={initialSession}
      initialPrompt={
        game.messages.length === 0 && typeof prompt === "string"
          ? prompt
          : undefined
      }
    />
  )
}

export default GamePage