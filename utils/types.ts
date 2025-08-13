import { ReactNode } from 'react'

export type PriceType = {
  name: string
  price: number
  description: string
  items: string[]
  id: string
  paymentLink: string
  priceId: string
}

export type Step = {
  icon: ReactNode
  label: String
  description: string
}

export interface PdfSummary {
  userId?: string
  fileUrl: string
  summary: string
  title: string
  fileName: string
}

export interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
}

export interface DeleteButtonProps {
  summaryId: string
}
