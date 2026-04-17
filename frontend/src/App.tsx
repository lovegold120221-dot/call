import React, { useState, useEffect } from 'react'
import { AgentState, useAgent } from '@agents-ui/react'
import { AgentControlBar, AgentChatTranscript } from '@agents-ui/shadcn'
import { Phone, Mic, MicOff, Video, VideoOff } from 'lucide-react'
import AudioVisualizer from './components/AudioVisualizer'
import ChatTranscript from './components/ChatTranscript'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const agent = useAgent()

  useEffect(() => {
    if (agent) {
      setIsConnected(true)
      console.log('CSR Agent connected')
    }
  }, [agent])

  const handleConnect = async () => {
    try {
      await agent?.connect()
      setIsConnected(true)
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await agent?.disconnect()
      setIsConnected(false)
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">CSR Agent</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Customer Service Representative with Voice AI
          </p>
          
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={handleConnect}
              disabled={isConnected}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
            >
              <Phone className="w-4 h-4 mr-2" />
              {isConnected ? 'Connected' : 'Connect to Agent'}
            </button>
            
            <button
              onClick={handleDisconnect}
              disabled={!isConnected}
              className="bg-destructive text-destructive-foreground px-6 py-3 rounded-lg font-semibold hover:bg-destructive/90 disabled:opacity-50"
            >
              <VideoOff className="w-4 h-4 mr-2" />
              Disconnect
            </button>
          </div>
        </div>

        <AgentControlBar
          agent={agent}
          className="w-full max-w-2xl mx-auto"
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AudioVisualizer agent={agent} />
          <ChatTranscript agent={agent} />
        </div>
      </div>
    </div>
  )
}

export default App
