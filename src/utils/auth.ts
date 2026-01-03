import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { admin } from 'better-auth/plugins'
import { getDb } from '@/db'
import * as schema from '@/db/schema'

import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const db = getDb()
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or "mysql", "sqlite"
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [tanstackStartCookies(), admin()],
  trustedOrigins: [
    'http://localhost:3000',
    'http://bashir-tanstack.vercel.app',
  ],
})
