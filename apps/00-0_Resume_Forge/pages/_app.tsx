import { useState } from 'react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import type { AppProps } from 'next/app'

// 1. Import global styles using the correct relative path
import '../styles/globals.css'; 

// 2. Import shared UI components
import { HeaderBar, Footer } from '@repo/ui'

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  // Create a new supabase browser client on every page load
  const [supabaseClient] = useState(() => createPagesBrowserClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {/* 3. Render the HeaderBar */}
      <HeaderBar /> 
      
      {/* This is your active page */}
      <Component {...pageProps} /> 
      
      {/* 4. Render the Footer */}
      <Footer /> 
    </SessionContextProvider>
  )
}

export default MyApp