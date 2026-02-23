'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Terminal, Cpu } from 'lucide-react'

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'csharp', label: 'C#' },
]

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
  language: string
  setLanguage: (language: string) => void
}

export default function CodeEditor({
  code,
  setCode,
  language,
  setLanguage,
}: CodeEditorProps) {
  return (
    <div className="flex h-full min-h-[500px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] px-6 py-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Terminal className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Source Editor</span>
        </div>

        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-40 border-white/10 bg-black/40 text-sm h-10 ring-offset-black">
            <div className="flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5 text-primary" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-zinc-900">
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value} className="focus:bg-primary/20 focus:text-white">
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative flex-1 overflow-hidden group">
        <div className="absolute inset-0 flex">
          {/* Gutter / Line Numbers */}
          <div className="w-12 bg-white/[0.01] border-r border-white/5 flex flex-col items-center pt-6 pointer-events-none select-none overflow-hidden">
            {code.split('\n').map((_, i) => (
              <div
                key={i}
                className="text-[10px] font-mono text-white/10 h-[28px] flex items-center justify-center"
              >
                {i + 1}
              </div>
            ))}
            {/* Fallback for empty state */}
            {code.length === 0 && (
              <div className="text-[10px] font-mono text-white/10 h-[28px] flex items-center justify-center">1</div>
            )}
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={(e) => {
              const target = e.target as HTMLTextAreaElement;
              const gutter = target.previousElementSibling as HTMLElement;
              if (gutter) gutter.scrollTop = target.scrollTop;
            }}
            placeholder="// Paste your code here to begin analysis..."
            className="flex-1 resize-none bg-transparent pl-4 pr-4 py-6 font-mono text-lg leading-[28px] text-zinc-300 placeholder-zinc-700 outline-none scrollbar-thin selection:bg-primary/30"
            spellCheck="false"
          />
        </div>
      </div>

      <div className="px-6 py-2 border-t border-white/5 bg-white/[0.01] flex items-center justify-between">
        <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">CHARS: {code.length}</span>
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse"></div>
          <span className="text-[10px] text-zinc-600 font-mono tracking-tighter uppercase">Ready to compile</span>
        </div>
      </div>
    </div>
  )
}
