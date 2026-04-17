import React, { useState, useEffect } from 'react'
import { AgentChatTranscript } from '@agents-ui/shadcn'
import './ChatTranscript.css'

interface ChatTranscriptProps {
  className?: string
  agent?: any
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
}

export default function ChatTranscript({ className, agent }: ChatTranscriptProps) {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (!agent) return

    // Listen for transcript updates from agent
    const handleTranscriptUpdate = (event: any) => {
      if (event.transcript) {
        setMessages(prev => [...prev, ...event.transcript])
      }
    }

    agent.on('transcript', handleTranscriptUpdate)

    return () => {
      agent.off('transcript', handleTranscriptUpdate)
    }
  }, [agent])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`bg-card p-4 rounded-lg ${className || ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Conversation Transcript</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No messages yet. Start a conversation to see the transcript.</p>
          </div>
        ) : (
          messages.map((message: Message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-medium ${
                    message.sender === 'user' ? 'text-primary-foreground/70' : 'text-secondary-foreground/70'
                  }`}>
                    {message.sender === 'user' ? 'You' : 'CSR Agent'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">
                  {message.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          <p>Conversation is encrypted and secure</p>
          <p>Messages are processed in real-time</p>
        </div>
      </div>
    </div>
  )
}
