'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-card/50 px-6 py-5">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-52 border-border bg-input text-xl h-14">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="border-border bg-card">
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="flex-1 resize-none bg-card p-10 font-mono text-xl leading-loose text-foreground placeholder-muted-foreground outline-none"
        spellCheck="false"
      />
    </div>
  )
}
