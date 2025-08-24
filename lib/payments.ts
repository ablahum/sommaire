import Stripe from 'stripe'
import { getDbConnection } from './db'

async function createOrUpdateUser({
  sql,
  email,
  full_name,
  customerId,
  priceId,
  status,
}: {
  sql: any
  email: string
  full_name: string
  customerId: string
  priceId: string
  status: string
}) {
  try {
    const user = await sql`
      SELECT *
      FROM users
      WHERE email = ${email}
    `

    if (user.length === 0) {
      await sql`
        INSERT INTO users (
          email,
          full_name,
          customer_id,
          price_id,
          status
        ) VALUES (
          ${email},
          ${full_name},
          ${customerId},
          ${priceId},
          ${status}
        )
      `
    } else {
      await sql`
        UPDATE users 
        SET
          full_name = ${full_name},
          customer_id = ${customerId},
          price_id = ${priceId},
          status = ${status}
        WHERE email = ${email}
      `
    }
  } catch (err) {
    console.error('Error creating or updating user:', err)

    throw err
  }
}

async function createPayment({
  sql,
  session,
  priceId,
  user_email,
}: {
  sql: any
  session: Stripe.Checkout.Session
  priceId: string
  user_email: string
}) {
  try {
    const { amount_total, id, status } = session

    await sql`
      INSERT INTO payments (
        amount,
        status,
        stripe_payment_id,
        price_id,
        user_email
      ) VALUES (
        ${amount_total},
        ${status},
        ${id},
        ${priceId},
        ${user_email}
      )
    `
  } catch (err) {
    console.error('Error creating payment:', err)

    throw err
  }
}

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session
  stripe: Stripe
}) {
  const customerId = session.customer as string
  const customer = await stripe.customers.retrieve(customerId)
  const priceId = session.line_items?.data[0]?.price?.id

  if ('email' in customer && priceId) {
    const { email, name } = customer
    const sql = await getDbConnection()

    await createOrUpdateUser({
      sql,
      email: email as string,
      full_name: name as string,
      customerId,
      priceId: priceId as string,
      status: 'active',
    })

    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      user_email: email as string,
    })
  }
}

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string
  stripe: Stripe
}) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    const sql = await getDbConnection()

    await sql`
      UPDATE users
      SET
        status = 'inactive'
      WHERE customer_id = ${subscription.customer}
    `
  } catch (err) {
    console.error('Error handling subscription deletion:', err)

    throw err
  }
}
