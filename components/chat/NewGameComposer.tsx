"use client"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ChatComposer } from "./ChatComposer"
import { createGame } from "@/lib/games/actions"

const NewGameComposer = () => {
  const router = useRouter()
  const [prompt, setPrompt] = useState("")
  const [isPending,startTransaction]= useTransition()

  const handleSubmit =  (value: string) => {
    const trimmedPrompt = value.trim()

    if (!trimmedPrompt) {
      return
    }

    startTransaction(async()=>{
      const gameId = await createGame(trimmedPrompt)

      if (!gameId) {
        return
      }

      setPrompt("")
      router.push(`/games/${gameId}?prompt=${encodeURIComponent(trimmedPrompt)}`)
    })
    
  }
  

  return (
    <ChatComposer
      value={prompt}
      onValueChange={setPrompt}
      onSubmit={handleSubmit}
      disabled={isPending}
    />
  )
}

export { NewGameComposer }
