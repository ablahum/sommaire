import { spring } from 'motion'
import { isDev } from './helpers'

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

export const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: spring,
      damping: 15,
      stiffness: 50,
      duration: 0.8
    }
  }
}

export const buttonVariants = {
  scale: 1.05,
  transition: {
    type: spring,
    stiffness: 300,
    damping: 10
  }
}

export const listVariants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: spring,
      damping: 20,
      stiffness: 100
    }
  }
}
