import React from 'react'
import { Code2, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-6 py-4 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 blur-lg bg-gradient-to-r from-primary to-purple-600 opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-background border border-white/10">
                <Code2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Code<span className="text-primary italic">Lens</span>
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">AI Engine Active</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-muted-foreground/80">
              <span className="hover:text-foreground transition-colors cursor-pointer">Documentation</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Examples</span>
            </div>
            <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-white/5 text-xs font-semibold">
              <Zap className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
              <span>v2.0 Flash</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
