import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

export default function Login() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  if (user) {
    router.push('/dashboard') // Redirect to dashboard if already logged in
  }

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert(error.message)
    } else {
      alert('Check your email for a confirmation link!')
    }
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = event.currentTarget.email.value
    const password = event.currentTarget.password.value
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="container mx-auto max-w-sm p-8">
      <form onSubmit={handleSignUp} className="space-y-4">
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <button type="submit" className="w-full rounded-md bg-blue-600 px-4 py-2 text-white">
          Sign Up
        </button>
      </form>

      <hr className="my-8" />

      <form onSubmit={handleLogin} className="space-y-4">
        <h2 className="text-2xl font-semibold">Log In</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <button type="submit" className="w-full rounded-md bg-gray-700 px-4 py-2 text-white">
          Log In
        </button>
      </form>
    </div>
  )
}