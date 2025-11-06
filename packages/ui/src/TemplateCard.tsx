import * as React from 'react'

export const TemplateCard = () => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden">
      {/* Placeholder for template image */}
      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Template Preview</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Modern Template</h3>
        <p className="text-sm text-gray-500">4.9/5 Rating</p>
      </div>
    </div>
  )
}