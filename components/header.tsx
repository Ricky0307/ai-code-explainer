import React from 'react'

export default function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <span className="text-4xl font-bold text-primary-foreground">₹</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-foreground">Code Explainer</h1>
              <p className="text-xl text-muted-foreground">Powered by Gemini AI</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-lg text-muted-foreground">
            <div className="flex gap-2">
              <div className="h-4 w-4 rounded-full bg-primary animate-pulse"></div>
              <span>AI Ready</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
