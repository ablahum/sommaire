import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts'
import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OpenAI API key')
}
const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function generateSummaryFromOpenAI(pdfText: string) {
  try {
    const completion = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo', // Ganti dari 'gpt-4' ke 'gpt-3.5-turbo'
      messages: [
        {
          role: 'system',
          content: SUMMARY_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    })
    return completion.choices?.[0]?.message?.content || 'No summary generated.'
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error('RATE_LIMIT_EXCEEDED')
    }
    throw error
  }
}
