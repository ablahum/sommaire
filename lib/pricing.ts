import { isDev } from '@/lib/env'

export const pricingPlans = [
  {
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    items: ['3 PDF summaries per month', 'Standard processing speed', 'Email support'],
    id: 'basic',
    paymentLink: isDev ? 'https://buy.stripe.com/test_dRm28kdR76Mm9zWfuA5J600' : '',
    priceId: isDev ? 'price_1RsF8M1TGZU2Ha8SxYCqYNYm' : ''
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For professionals and teams',
    items: ['Unlimited PDF summaries', 'Priority processing', '24/7 priority support', 'Markdown Export'],
    id: 'pro',
    paymentLink: isDev ? 'https://buy.stripe.com/test_8x2aEQ8wNeeO13q6Y45J601' : '',
    priceId: isDev ? 'price_1RsF9R1TGZU2Ha8SsvKyILU6' : ''
  }
]
