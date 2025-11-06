import * as React from 'react'

interface StepCardProps {
  stepNumber: string;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description }) => {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg">
      {/* Step Number Badge */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
        {stepNumber}
      </div>

      <h3 className="text-xl font-semibold mb-2 mt-8">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}