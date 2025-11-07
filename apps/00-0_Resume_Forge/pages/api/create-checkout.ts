import type { NextApiRequest, NextApiResponse } from 'next'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

// !!! REPLACE THIS with the Variant ID from your Lemon Squeezy product !!!
const YOUR_VARIANT_ID = 12345; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    const supabase = createSupabaseServerClient({ req, res })
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY!)

    const checkout = await ls.createCheckout({
      store: process.env.LEMONSQUEEZY_STORE_ID!,
      variant: YOUR_VARIANT_ID,
      checkout_data: {
        email: user.email,
        custom: {
          user_id: user.id, // This is critical for the webhook
        },
      },
    })

    res.status(200).json({ url: checkout.data.attributes.url })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}