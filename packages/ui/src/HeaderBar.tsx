import * as React from 'react'
import { Button } from './Button' // Use your shared button

export const HeaderBar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4">
      <span className="font-bold text-lg">ResumeForge</span>
      <div className="flex items-center gap-4">
        <span>Pricing</span>
        <Button>Get Started</Button>
      </div>
    </nav>
  )
}