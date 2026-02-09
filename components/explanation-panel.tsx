'use client'

import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

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
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
      {/* Overview Section */}
      <Card className="border-border bg-card p-0 overflow-hidden">
        <button
          onClick={() => toggleSection('overview')}
          className="w-full flex items-center justify-between px-8 py-6 border-b border-border hover:bg-card/80 transition-colors"
        >
          <div className="flex items-center gap-6">
            <span className="text-4xl">📝</span>
            <span className="font-semibold text-2xl text-foreground">Overview</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSections.overview ? '' : '-rotate-90'
              }`}
          />
        </button>
        {expandedSections.overview && (
          <div className="px-8 py-6 text-xl text-muted-foreground leading-loose">
            {explanation.overview}
          </div>
        )}
      </Card>

      {/* Logic Section */}
      <Card className="border-border bg-card p-0 overflow-hidden">
        <button
          onClick={() => toggleSection('logic')}
          className="w-full flex items-center justify-between px-8 py-6 border-b border-border hover:bg-card/80 transition-colors"
        >
          <div className="flex items-center gap-6">
            <span className="text-4xl">⚙️</span>
            <span className="font-semibold text-2xl text-foreground">Logic Flow</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSections.logic ? '' : '-rotate-90'
              }`}
          />
        </button>
        {expandedSections.logic && (
          <div className="px-8 py-6 space-y-6">
            {explanation.logic.map((item, idx) => (
              <div key={idx} className="flex gap-6 text-xl">
                <span className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </span>
                <p className="text-muted-foreground pt-1.5">{item}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Complexity Section */}
      <Card className="border-border bg-card p-0 overflow-hidden">
        <button
          onClick={() => toggleSection('complexity')}
          className="w-full flex items-center justify-between px-8 py-6 border-b border-border hover:bg-card/80 transition-colors"
        >
          <div className="flex items-center gap-6">
            <span className="text-4xl">📊</span>
            <span className="font-semibold text-2xl text-foreground">Complexity</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSections.complexity ? '' : '-rotate-90'
              }`}
          />
        </button>
        {expandedSections.complexity && (
          <div className="px-8 py-6 space-y-6">
            <div className="flex items-center justify-between p-6 bg-card/50 rounded-lg border border-border/50">
              <span className="text-xl font-medium text-muted-foreground">
                Time Complexity
              </span>
              <Badge className="font-mono text-lg px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30">
                {explanation.complexity.time}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-6 bg-card/50 rounded-lg border border-border/50">
              <span className="text-xl font-medium text-muted-foreground">
                Space Complexity
              </span>
              <Badge className="font-mono text-lg px-4 py-2 bg-secondary/20 text-secondary hover:bg-secondary/30">
                {explanation.complexity.space}
              </Badge>
            </div>
          </div>
        )}
      </Card>

      {/* Improvements Section */}
      <Card className="border-border bg-card p-0 overflow-hidden">
        <button
          onClick={() => toggleSection('improvements')}
          className="w-full flex items-center justify-between px-8 py-6 border-b border-border hover:bg-card/80 transition-colors"
        >
          <div className="flex items-center gap-6">
            <span className="text-4xl">💡</span>
            <span className="font-semibold text-2xl text-foreground">Improvements</span>
          </div>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform ${expandedSections.improvements ? '' : '-rotate-90'
              }`}
          />
        </button>
        {expandedSections.improvements && (
          <div className="px-8 py-6 space-y-6">
            {explanation.improvements.length > 0 ? (
              explanation.improvements.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 p-6 rounded-lg bg-accent/10 border border-accent/20"
                >
                  <span className="flex-shrink-0 text-accent font-bold text-2xl">✓</span>
                  <p className="text-xl text-muted-foreground">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-xl text-muted-foreground italic">
                No improvements suggested for this code.
              </p>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}
