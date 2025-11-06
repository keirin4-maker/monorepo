import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  appName?: string; // 1. Accept the prop here
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, appName, className, ...props }, ref) => { // 2. Destructure it here
    return (
      <button
        ref={ref}
        className={`
          bg-blue-600 hover:bg-blue-700 text-white font-semibold 
          py-2 px-4 rounded-lg shadow-md transition duration-300
          ${className || ''}
        `}
        {...props} // 3. Now 'props' no longer contains 'appName'
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'