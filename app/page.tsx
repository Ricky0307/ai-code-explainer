'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import CodeEditor from '@/components/code-editor'
import ExplanationPanel from '@/components/explanation-panel'
import Header from '@/components/header'

export default function Home() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState<{
    overview: string
    logic: string[]
    complexity: { time: string; space: string }
    improvements: string[]
  } | null>(null)

  const handleExplain = async () => {
    if (!code.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle error responses
        toast.error(data.error || 'Failed to explain code')
        return
      }

      setExplanation(data.explanation)
      toast.success('Code explained successfully!')
    } catch (error) {
      console.error('Error explaining code:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    setCode('')
    setExplanation(null)
    toast.dismiss()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-10">
        {/* Main Content Split */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Code Input Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-4xl font-bold text-foreground">Your Code</h2>
                <Badge variant="secondary" className="font-mono text-lg px-4 py-2">
                  {language}
                </Badge>
              </div>
            </div>

            <Card className="flex flex-1 flex-col border-border bg-card p-0">
              <CodeEditor
                code={code}
                setCode={setCode}
                language={language}
                setLanguage={setLanguage}
              />
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={handleExplain}
                disabled={!code.trim() || isLoading}
                className="flex-1 bg-primary hover:bg-primary/90 h-16 text-xl"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Explaining...
                  </div>
                ) : (
                  '✨ Explain Code'
                )}
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-border bg-transparent h-16 text-xl px-10"
                size="lg"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-foreground">AI Explanation</h2>

            {!explanation && !isLoading && (
              <Card className="flex flex-1 items-center justify-center border-border bg-card p-8 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">🔍</div>
                  <p className="text-muted-foreground">
                    Paste your code and click "Explain Code" to get AI-powered insights
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports Python, JavaScript, Java, C++, Go, and more
                  </p>
                </div>
              </Card>
            )}

            {isLoading && (
              <Card className="flex flex-1 items-center justify-center border-border bg-card p-8">
                <div className="space-y-4 text-center">
                  <div className="flex justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                  </div>
                  <p className="text-muted-foreground">Analyzing your code...</p>
                </div>
              </Card>
            )}

            {explanation && !isLoading && (
              <ExplanationPanel explanation={explanation} />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
