import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts'
import { GoogleGenAI } from '@google/genai'

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const result = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: SUMMARY_SYSTEM_PROMPT
            },
            {
              text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
            }
          ]
        }
      ]
    })
    const summary = result.text
    if (!summary) throw new Error('Empty response from Gemini API')

    return summary
  } catch (err: any) {
    console.error('Gemini API Error: ', err)

    throw err
  }
}
