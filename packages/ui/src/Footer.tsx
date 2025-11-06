import * as React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div>
          <span className="font-bold text-lg">ResumeForge</span>
          <p className="text-sm text-gray-500">
            © 2025 ResumeForge. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4 text-gray-600">
          {/* These are placeholders for now */}
          <span>Templates</span>
          <span>Blog</span>
          <span>Pricing</span>
        </div>
      </div>
    </footer>
  )
}