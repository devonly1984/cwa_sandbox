"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { useTriggerChatTransport } from "@trigger.dev/sdk/chat/react"
import type { UIMessage } from "ai"

import {
  mintGameChatAccessToken,
  startGameChatSession,
} from "@/app/actions"
import { ChatComposer } from "@/components/chat/ChatComposer"
import type { gameChat } from "@/trigger/chat"
import {
  Bubble,
  BubbleContent,
  BubbleGroup,
} from "@/components/ui/bubble"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
  MessageHeader,
} from "@/components/ui/message"

type ChatThreadProps = {
  gameId: string
  initialMessages: UIMessage[]
  initialSession?: { publicAccessToken: string; lastEventId?: string }
  initialPrompt?: string
}

const ChatThread = ({
  gameId,
  initialMessages,
  initialSession,
  initialPrompt,
}: ChatThreadProps) => {
  const router = useRouter()
  const initialPromptSent = useRef(false)
  const [value, setValue] = useState("")
  const transport = useTriggerChatTransport<typeof gameChat>({
    task: "game-chat",
    accessToken: ({ chatId }) => mintGameChatAccessToken(chatId),
    startSession: ({ chatId }) => startGameChatSession({ chatId }),
    sessions: initialSession ? { [gameId]: initialSession } : undefined,
  })
  const { messages, sendMessage, stop, status, error } = useChat({
    id: gameId,
    messages: initialMessages,
    transport,
    resume: initialMessages.length > 0,
  })

  useEffect(() => {
    const text = initialPrompt?.trim()

    if (!text || initialPromptSent.current) {
      return
    }

    initialPromptSent.current = true
    void sendMessage({ text })
    router.replace(`/games/${gameId}`, { scroll: false })
  }, [gameId, initialPrompt, router, sendMessage])

  const isSending = status === "submitted" || status === "streaming"

  const handleStop = () => {
    stop()
    void transport.stopGeneration(gameId)
  }

  const handleSubmit = (message: string) => {
    const text = message.trim()

    if (!text || isSending) {
      return
    }

    void sendMessage({ text })
    setValue("")
  }

  return (
    <div className="flex h-svh min-h-0 w-full flex-col">
      <MessageScrollerProvider>
        <MessageScroller className="flex-1">
          <MessageScrollerViewport>
            <MessageScrollerContent className="mx-auto w-full max-w-3xl justify-end px-4 py-8 sm:px-6">
              <MessageGroup>
                {messages.map((message) => {
                  const isAssistant = message.role === "assistant"

                  return (
                    <Message
                      key={message.id}
                      align={isAssistant ? "start" : "end"}
                    >
                      <MessageAvatar
                        className={
                          isAssistant
                            ? "size-8 self-start bg-transparent"
                            : "size-8 self-start bg-primary text-xs font-semibold text-primary-foreground"
                        }
                      >
                        {isAssistant ? (
                          <Image
                            src="/logo.svg"
                            alt="Assistant"
                            width={32}
                            height={32}
                            className="size-full object-contain"
                          />
                        ) : (
                          "Y"
                        )}
                      </MessageAvatar>
                      <MessageContent className="max-w-[min(42rem,85%)]">
                        <MessageHeader>
                          {isAssistant ? "Assistant" : "You"}
                        </MessageHeader>
                        <BubbleGroup>
                          <Bubble
                            align={isAssistant ? "start" : "end"}
                            variant={isAssistant ? "ghost" : "secondary"}
                          >
                            <BubbleContent>
                              {message.parts.map((part, index) =>
                                part.type === "text" ? (
                                  <span key={`${message.id}-${index}`}>
                                    {part.text}
                                  </span>
                                ) : null,
                              )}
                            </BubbleContent>
                          </Bubble>
                        </BubbleGroup>
                      </MessageContent>
                    </Message>
                  )
                })}
              </MessageGroup>
              <MessageScrollerItem scrollAnchor />
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <div className="mx-auto w-full max-w-3xl px-4 pb-4 pt-2 sm:px-6">
        {error ? (
          <p role="alert" className="mb-2 text-sm text-destructive">
            Unable to send your message. Please try again.
          </p>
        ) : null}
        <ChatComposer
          value={value}
          onValueChange={setValue}
          onSubmit={handleSubmit}
          isSending={isSending}
          onStop={handleStop}
          submitLabel="Send message"
        />
      </div>
    </div>
  )
}

export { ChatThread }