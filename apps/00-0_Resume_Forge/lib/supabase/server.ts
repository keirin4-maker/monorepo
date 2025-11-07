import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext } from 'next'

export const createSupabaseServerClient = (ctx: GetServerSidePropsContext) => {
  return createPagesServerClient(ctx)
}