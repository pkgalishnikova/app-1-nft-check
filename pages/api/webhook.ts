// pages/api/webhook.ts

import type { NextApiRequest, NextApiResponse } from 'next'

// TEMPORARY in-memory store for recent payments (resets on server restart)
let latestPayments: any[] = []

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const payload = req.body
    const eventName = payload.event_name

    // Make sure it's the right event from your smart contract
    if (eventName === "PaymentCompleted") {
      const { user, tokenId, contractId, donations } = payload.payload

      latestPayments.push({
        user: user.toLowerCase(),
        tokenId,
        contractId,
        donations,
        timestamp: Date.now()
      })

      // Optional: keep only the last 20 entries
      latestPayments = latestPayments.slice(-20)

      return res.status(200).json({ received: true })
    }

    return res.status(200).json({ received: false, reason: "Unknown event" })
  }

  if (req.method === "GET") {
    return res.status(200).json({ payments: latestPayments })
  }

  res.status(405).end() // Method Not Allowed
}
