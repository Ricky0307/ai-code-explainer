'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ChevronDown,
  Lightbulb,
  Settings2,
  ScanLine,
  BarChart3,
  CheckCircle2,
  Clock,
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Explanation {
  overview: string
  logic: string[]
  complexity: { time: string; space: string }
  improvements: string[]
}

interface ExplanationPanelProps {
  explanation: Explanation
}

export default function ExplanationPanel({
  explanation,
}: ExplanationPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    logic: true,
    complexity: true,
    improvements: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
      {/* Overview Section */}
      <Card className="glass-card overflow-hidden rounded-2xl border-white/5">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-primary/20 text-primary">
              <ScanLine className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-white">Summary Overview</span>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              !expandedSections.overview && "-rotate-90"
            )}
          />
        </button>
        {expandedSections.overview && (
          <div className="px-6 pb-6 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {explanation.overview}
            </p>
          </div>
        )}
      </Card>

      {/* Logic Section */}
      <Card className="glass-card overflow-hidden rounded-2xl border-white/5">
        <button
          onClick={() => toggleSection('logic')}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400">
              <Settings2 className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-white">Execution Logic</span>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              !expandedSections.logic && "-rotate-90"
            )}
          />
        </button>
        {expandedSections.logic && (
          <div className="px-6 pb-6 pt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {explanation.logic.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <span className="flex-shrink-0 h-7 w-7 rounded-lg bg-white/5 border border-white/10 text-white/40 flex items-center justify-center font-bold text-xs group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  {idx + 1}
                </span>
                <p className="text-muted-foreground pt-0.5 text-base leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Complexity Section */}
      <Card className="glass-card overflow-hidden rounded-2xl border-white/5">
        <button
          onClick={() => toggleSection('complexity')}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-accent/20 text-accent">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-white">Efficiency Analysis</span>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              !expandedSections.complexity && "-rotate-90"
            )}
          />
        </button>
        {expandedSections.complexity && (
          <div className="px-6 pb-6 pt-2 grid gap-4 sm:grid-cols-2 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Time Complexity</span>
              </div>
              <Badge className="w-fit font-mono text-base bg-primary/10 text-primary border-primary/20 py-1 px-3">
                {explanation.complexity.time}
              </Badge>
            </div>
            <div className="flex flex-col gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Database className="h-4 w-4" />
                <span className="text-sm font-medium">Space Complexity</span>
              </div>
              <Badge className="w-fit font-mono text-base bg-accent/10 text-accent border-accent/20 py-1 px-3">
                {explanation.complexity.space}
              </Badge>
            </div>
          </div>
        )}
      </Card>

      {/* Improvements Section */}
      <Card className="glass-card overflow-hidden rounded-2xl border-white/5">
        <button
          onClick={() => toggleSection('improvements')}
          className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400">
              <Lightbulb className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-white">Recommendations</span>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-muted-foreground transition-transform duration-300",
              !expandedSections.improvements && "-rotate-90"
            )}
          />
        </button>
        {expandedSections.improvements && (
          <div className="px-6 pb-6 pt-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {explanation.improvements.length > 0 ? (
              explanation.improvements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-4 rounded-xl bg-emerald-500/[0.02] border border-emerald-500/10"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic text-sm">
                No optimization suggestions found.
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
