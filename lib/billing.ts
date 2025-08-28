import { getDbConnection } from './db'

export async function getPriceIdForActiveUser(email: string) {
  const sql = await getDbConnection()

  try {
    const [query] = await sql`
      SELECT price_id
      FROM users
      WHERE email = ${email}
      AND status = 'active'
    `

    return query?.price_id || null
  } catch (err) {
    console.error('Error getting price ID for user:', err)
    return null
  }
}
export async function hasActivePlan(email: string) {
  const sql = await getDbConnection()

  try {
    const query = await sql`
      SELECT price_id, status
      FROM users
      WHERE email = ${email}
      AND status = 'active'
      AND price_id IS NOT NULL
    `

    return query && query.length > 0
  } catch (err) {
    console.error('Error checking active plan for user:', err)
    return false
  }
}
