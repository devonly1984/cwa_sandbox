"use client"
import { useState } from "react"
import { ChatComposer } from "./ChatComposer"
import { createGame } from "@/lib/games/actions"

const NewGameComposer = () => {
  const [value, setValue] = useState("")

  const createNewGame = async (title: string) => {
    const formData = new FormData()
    formData.set("title", title)
    await createGame(formData)
    setValue("")
  }

  return (
    <ChatComposer
      value={value}
      onValueChange={setValue}
      onSubmit={createNewGame}
    />
  )
}

export { NewGameComposer }
