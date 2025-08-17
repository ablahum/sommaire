import { PdfSummary } from '@/types/summaries'
import { getDbConnection } from './db'

export async function getSummaries(userId: string) {
  const sql = await getDbConnection()

  const summaries = await sql`SELECT * from pdf_summaries
    WHERE user_id=${userId}
    ORDER BY created_at DESC`

  return summaries
}

export async function getSummaryById(id: string) {
  try {
    const sql = await getDbConnection()

    const [summary] = await sql`
      SELECT 
      id, 
      user_id,
      title,
      original_file_url,
      summary_text,
      created_at,
      updated_at,
      status,
      file_name,
      LENGTH(summary_text)-LENGTH(REPLACE(summary_text,' ',' '))+1 as word_count
      FROM pdf_summaries
      where id = ${id}
    `
    return summary
  } catch (err) {
    console.log('Error fetching Summary by id', err)

    return null
  }
}

export async function getSummaryFileUrlById(id: string, userId: string) {
  const sql = await getDbConnection()

  const [summary] = await sql`
    SELECT original_file_url
    FROM pdf_summaries
    WHERE id = ${id} AND user_id = ${userId}
  `

  return summary?.original_file_url || null
}

export async function getUserUploadCount(userId: string) {
  const sql = await getDbConnection()

  try {
    const [result] = await sql`
      SELECT COUNT(*) as COUNT FROM pdf_summaries WHERE user_id = ${userId}
    `

    return result?.count || 0
  } catch (err) {
    console.error('Error fetching user upload count', err)
    return 0
  }
}

export async function insertPdfSummary({ userId, fileUrl, summary, title, fileName }: PdfSummary) {
  const sql = await getDbConnection()
  const [row] = await sql`
    INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      title,
      file_name
    ) VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      ${title},
      ${fileName}
    ) RETURNING id, summary_text
  `
  return row
}

export async function deleteSummaryById(id: string, userId: string) {
  const sql = await getDbConnection()

  const [deletedSummary] = await sql`
    DELETE FROM pdf_summaries
    WHERE id = ${id} AND user_id = ${userId}
    RETURNING id
  `

  return deletedSummary?.id || null
}
