import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'

// This new type will accept either the context from a Page
// or the req/res objects from an API route
type ServerContext = 
  | GetServerSidePropsContext
  | { req: NextApiRequest; res: NextApiResponse };

export const createSupabaseServerClient = (ctx: ServerContext) => {
  return createPagesServerClient(ctx)
}