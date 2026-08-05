'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  defaultChecked?: boolean
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, defaultChecked = false, ...props }, ref) => {
    const [checked, setChecked] = React.useState(defaultChecked)

    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={cn(
          'inline-flex items-center rounded-full transition-colors',
          'h-6 w-11 bg-gray-300 hover:bg-gray-400 focus:outline-none',
          checked && 'bg-primary hover:bg-primary/90',
          className
        )}
        {...props}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch }
