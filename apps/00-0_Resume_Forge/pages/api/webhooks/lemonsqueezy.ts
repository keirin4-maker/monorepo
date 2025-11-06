import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Helper to get the raw body for signature verification
const getRawBody = (req: NextApiRequest): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', (err) => reject(err))
  })
}

// Disable Next.js's body parser, we need the raw body
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
  const rawBody = (await getRawBody(req)).toString()

  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(req.headers['x-signature'] as string, 'utf8')

  if (!crypto.timingSafeEqual(digest, signature)) {
    return res.status(400).send('Invalid signature')
  }

  const { data, meta } = JSON.parse(rawBody)
  const userId = meta?.custom_data?.user_id

  if (!userId) {
    return res.status(400).send('No user_id in webhook')
  }

  try {
    switch (meta.event_name) {
      case 'subscription_created':
      case 'subscription_updated':
        await supabaseAdmin
          .from('profiles')
          .update({
            lemon_subscription_id: data.id,
            lemon_plan_id: data.attributes.variant_id,
            lemon_status: data.attributes.status,
          })
          .eq('id', userId)
        break;

      case 'subscription_cancelled':
      case 'subscription_expired':
        await supabaseAdmin
          .from('profiles')
          .update({ lemon_status: data.attributes.status })
          .eq('id', userId)
        break;
    }
    res.status(200).json({ success: true })
  } catch (e: any) {
    res.status(500).json({ message: e.message })
  }
}