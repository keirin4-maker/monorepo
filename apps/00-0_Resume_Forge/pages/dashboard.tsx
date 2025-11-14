import { GetServerSidePropsContext } from 'next'
import { createSupabaseServerClient } from '../lib/supabase/server'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { isUserPro } from '../lib/subscription'

export default function Dashboard() {
  const user = useUser()
  const supabase = useSupabaseClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/') // Redirect to home after logout
  }

  if (!user) return null

  return (
    <div className="container mx-auto max-w-xl p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome, {user.email}!</p>
      <p>You are a <b>Pro User</b>. You can now create your resumes.</p>
      <button 
        onClick={handleLogout}
        className="mt-6 rounded-md bg-gray-700 px-4 py-2 text-white"
      >
        Log Out
      </button>
    </div>
  )
}

// This is the server-side protection
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createSupabaseServerClient(ctx)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // Check if the user is "pro"
  const isPro = await isUserPro(ctx); 
  if (!isPro) {
    return {
      redirect: {
        destination: '/pricing',
        permanent: false,
      },
    }
  }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}