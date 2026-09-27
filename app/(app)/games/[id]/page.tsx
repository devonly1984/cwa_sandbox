import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

import { ChatThread } from "@/components/chat/ChatThread"
import { getGame } from "@/lib/games/queries"

const GamePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  await auth.protect({ unauthenticatedUrl: "/sign-in" })

  const { id } = await params
  const game = await getGame(id)

  if (!game) {
    notFound()
  }

  return (
    <ChatThread
      key={game.id}
      gameId={game.id}
      initialMessages={game.messages}
    />
  )
}

export default GamePage