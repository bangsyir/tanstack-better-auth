import { authClient } from '@/utils/auth-client'

export async function isAdmin() {
  try {
    const session = await authClient.getSession()
    if (!session.data?.user) {
      return false
    }
    const user = session.data.user as {
      role?: string | null
    }
    return user.role === 'admin'
  } catch {
    return false
  }
}

export async function requireAdmin() {
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
}
