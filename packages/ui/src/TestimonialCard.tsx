import * as React from 'react'

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-gray-600 italic">"{quote}"</p>
      <div className="mt-4">
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{title}</p>
      </div>
    </div>
  )
}