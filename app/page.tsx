'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Sparkles, Trash2, ArrowRight } from 'lucide-react'
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
        toast.error(data.error || 'Failed to explain code')
        return
      }

      setExplanation(data.explanation)
      toast.success('Analysis complete!')
    } catch (error) {
      console.error('Error explaining code:', error)
      toast.error('Network error. Please try again.')
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
    <main className="min-h-screen bg-background bg-mesh overflow-x-hidden">
      <Header />

      <div className="mx-auto max-w-[1600px] px-6 py-12 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-12">
          {/* Hero Heading */}
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto mb-4 animate-float">
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white">
              Understand Code <br />
              <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
                Instantly with AI
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Paste your complex snippets and let our advanced Gemini-powered engine
              break down the logic, complexity, and potential improvements.
            </p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            {/* Code Input Section */}
            <div className="flex flex-col gap-6 group animate-in slide-in-from-left duration-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 bg-primary rounded-full"></div>
                  <h3 className="text-2xl font-bold text-white">Input Source</h3>
                  <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20">
                    {language.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="relative group/card">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover/card:opacity-100 transition duration-500"></div>
                <Card className="relative flex flex-col border-white/10 bg-black/40 backdrop-blur-xl p-0 overflow-hidden rounded-2xl">
                  <CodeEditor
                    code={code}
                    setCode={setCode}
                    language={language}
                    setLanguage={setLanguage}
                  />
                </Card>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleExplain}
                  disabled={!code.trim() || isLoading}
                  size="xl"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98]"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3 px-8">
                      <Sparkles className="h-5 w-5 animate-pulse text-accent" />
                      <span>Deep Analysis...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span>Analyze Code</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="xl"
                  className="border-white/10 bg-white/5 hover:bg-white/10 text-white px-8 transition-all"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Explanation Section */}
            <div className="flex flex-col gap-6 animate-in slide-in-from-right duration-700">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 bg-accent rounded-full"></div>
                <h3 className="text-2xl font-bold text-white">AI Insights</h3>
              </div>

              {!explanation && !isLoading && (
                <Card className="flex flex-col items-center justify-center border-dashed border-white/10 bg-white/[0.02] p-12 text-center min-h-[500px] rounded-2xl">
                  <div className="relative mb-8">
                    <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full"></div>
                    <Sparkles className="h-16 w-16 text-primary relative" />
                  </div>
                  <h4 className="text-2xl font-semibold text-white mb-2">Ready to Decode</h4>
                  <p className="text-muted-foreground max-w-xs mx-auto">
                    Paste your code snippets to uncover the underlying logic and complexity.
                  </p>
                </Card>
              )}

              {isLoading && (
                <Card className="flex flex-col items-center justify-center border-white/5 bg-white/[0.02] p-12 min-h-[500px] rounded-2xl overflow-hidden">
                  <div className="relative flex items-center justify-center w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-t-2 border-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-4 border-b-2 border-accent rounded-full animate-spin-reverse"></div>
                    <Sparkles className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <p className="text-lg font-medium text-white/80 animate-pulse tracking-wide">
                    Gemini AI is processing your request...
                  </p>
                </Card>
              )}

              {explanation && !isLoading && (
                <div className="min-h-[500px]">
                  <ExplanationPanel explanation={explanation} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background blobs for extra spice */}
      <div className="fixed top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </main>
  )
}
