"use client"

import { useState } from "react"
import Image from "next/image"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"

import { ChatComposer } from "@/components/chat/ChatComposer"
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
}

const ChatThread = ({ gameId, initialMessages }: ChatThreadProps) => {
  const [value, setValue] = useState("")
  const { messages, sendMessage, status, error } = useChat({
    id: gameId,
    messages: initialMessages,
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isSending = status === "submitted" || status === "streaming"

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
          disabled={isSending}
          submitLabel="Send message"
        />
      </div>
    </div>
  )
}

export { ChatThread }