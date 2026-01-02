import { getDb } from '@/db'

const db = getDb()

async function setAdminUser(email: string) {
  const { user } = await import('@/db/schema')
  const { eq } = await import('drizzle-orm')

  const result = await db
    .update(user)
    .set({ role: 'admin' })
    .where(eq(user.email, email))
    .returning()

  if (result.length === 0) {
    console.error('User not found with email:', email)
    process.exit(1)
  }

  console.log('User set as admin:', result[0])
}

const email = process.argv[2]
if (!email) {
  console.error('Please provide an email address')
  process.exit(1)
}

setAdminUser(email)
