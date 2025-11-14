import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function PricingPage() {
  const user = useUser()
  const router = useRouter()

  // This function calls our API route to create a checkout session
  const handleCreateCheckout = async () => {
    if (!user) {
      alert('Please log in to purchase.')
      router.push('/login')
      return
    }

    try {
      const res = await fetch('/api/create-checkout', { method: 'POST' })
      const { url } = await res.json()
      // Redirect user to the Lemon Squeezy checkout page
      window.location.href = url
    } catch (e) {
      alert('Error creating checkout.')
      console.error(e)
    }
  }

  return (
    <div className="container mx-auto max-w-xl p-8 text-center">
      <h1 className="text-3xl font-bold">You are not a Pro User</h1>
      <p className="mt-4 text-lg text-gray-600">
        Please purchase a plan to access the dashboard and create your resume.
      </p>
      <button 
        onClick={handleCreateCheckout}
        className="mt-8 rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-700"
      >
        Purchase Pro ($5 One-Time)
      </button>
    </div>
  )
}