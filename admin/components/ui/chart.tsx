'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type ChartConfig = Record<string, { label: string; color: string }>

export function ChartContainer({ config, className, children }: { config: ChartConfig; className?: string; children: React.ReactNode }) {
  return <div className={cn('h-full w-full', className)}>{children}</div>
}

export function ChartTooltip({ content, ...props }: any) {
  // Thin wrapper to keep API similar to shadcn chart examples
  const Content = content
  return <Content {...props} />
}

export function ChartTooltipContent({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (!active || !payload || payload.length === 0) return null
  const p = payload[0]
  return (
    <div className="bg-background border rounded-md p-2 shadow-md">
      <div className="text-sm font-medium">{p.name || p.dataKey}</div>
      <div className="text-xs text-muted-foreground">{typeof p.value === 'number' ? `$${p.value.toLocaleString()}` : String(p.value)}</div>
    </div>
  )
}


