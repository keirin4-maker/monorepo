import * as React from 'react'
import { Button } from './Button'

interface PricingCardProps {
  title: string;
  price: string;
  priceDescription: string;
  features: string[];
  isRecommended?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  priceDescription,
  features,
  isRecommended = false,
}) => {
  return (
    <div 
      className={`border rounded-lg p-6 ${isRecommended ? 'border-blue-600 shadow-xl' : 'border-gray-300'}`}
    >
      {isRecommended && (
        <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full -mt-2 mb-4">
          RECOMMENDED
        </span>
      )}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-4xl font-bold my-4">
        {price}
        <span className="text-lg font-normal text-gray-500">{priceDescription}</span>
      </p>

      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button className="w-full">
        {isRecommended ? 'Build & Download' : 'Start Building'}
      </Button>
    </div>
  )
}