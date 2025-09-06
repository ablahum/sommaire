'use server'

import { AUTO_LOGIN_USERID } from '@/lib/env'
import { formatFileNameAsTitle } from '@/lib/formatter'
import { generateSummaryFromGemini } from '@/lib/gemini'
import { fetchAndExtract } from '@/lib/langchain'
import { generateSummaryFromOpenAI } from '@/lib/openai'
import { insertPdfSummary } from '@/lib/summaries'
import { PdfSummary } from '@/types/summaries'
import { revalidatePath } from 'next/cache'

// GENERATE THE SUMMARY ----------------------------------
export async function generateSummary({ fileUrl, fileName }: { fileUrl: string; fileName: string }) {
  if (!fileUrl)
    return {
      success: false,
      message: 'File Upload failed',
      data: null
    }

  try {
    // EXTRACT FILE FROM UPLOADTHING USING LANGCHAIN -----
    const pdfText = await fetchAndExtract(fileUrl)
    let summary

    // SUMMARIZE FILE USING AI ---------------------------
    try {
      // gemini api
      summary = await generateSummaryFromGemini(pdfText)
    } catch (err) {
      // openai api
      console.error('Gemini API Error:', err)

      if (err instanceof Error && err.message === 'RATE_LIMIT_EXCEEDED') {
        try {
          console.error('Gemini rate limit exceeded, trying OpenAI as fallback...')

          summary = await generateSummaryFromOpenAI(pdfText)
        } catch (openAIError) {
          console.error('OpenAI API also failed:', openAIError)

          summary = 'Failed to generate summary with available AI providers.'
        }
      } else {
        try {
          console.error('Gemini failed, trying OpenAI as fallback...')

          summary = await generateSummaryFromOpenAI(pdfText)
        } catch (openAIError) {
          console.error('OpenAI API also failed:', openAIError)

          summary = 'Failed to generate summary with available AI providers.'
        }
      }
    }

    if (!summary)
      return {
        success: false,
        message: 'Failed to Generate Summary',
        data: null
      }

    // format file name
    const formattedFileName = formatFileNameAsTitle(fileName)

    return {
      success: true,
      message: 'Summary generated successfully',
      data: {
        title: formattedFileName,
        summary
      }
    }
  } catch (err) {
    console.error(err)

    return {
      success: false,
      message: 'File Upload failed',
      data: null
    }
  }
}

// INSERT SUMMARY TO DB ----------------------------------
export async function storeSummary({ fileUrl, summary, title, fileName }: PdfSummary) {
  let savedSummary: any

  try {
    const userId = AUTO_LOGIN_USERID

    if (!userId)
      return {
        success: false,
        message: 'User not found'
      }

    savedSummary = await insertPdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName
    })

    if (!savedSummary)
      return {
        success: false,
        message: 'Failed to save PDF summary, please try again!'
      }
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Error Saving PDF Summary'
    }
  }

  revalidatePath(`/summaries/${savedSummary.id}`)
  return {
    success: true,
    message: 'PDF Summary saved Successfully',
    data: {
      id: savedSummary.id
    }
  }
}
