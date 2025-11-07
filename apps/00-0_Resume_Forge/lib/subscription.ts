import { createSupabaseServerClient } from './supabase/server.ts'
import { GetServerSidePropsContext } from 'next'

export async function isUserPro(ctx: GetServerSidePropsContext): Promise<boolean> {
  const supabase = createSupabaseServerClient(ctx)

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  // Check the 'profiles' table for a real subscription
  const { data, error } = await supabase
    .from('profiles')
    .select('lemon_status')
    .eq('id', user.id)
    .single()

  if (error || !data) return false

  // Check if the subscription is active (or on trial)
  return data.lemon_status === 'active' || data.lemon_status === 'on_trial'
}