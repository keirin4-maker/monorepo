'use client' // Add this at the top for React hooks

import * as React from 'react'
import { useState } from 'react'

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-semibold"
      >
        <span>{title}</span>
        {/* Simple + / - icon */}
        <span className="text-2xl">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="pb-4 text-gray-600">
          {children}
        </div>
      )}
    </div>
  )
}