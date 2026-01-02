import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export function getDb() {
  const client = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  })

  return drizzle({ client })
}
