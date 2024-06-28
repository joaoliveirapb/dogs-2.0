'use server'

import { TOKEN_VALIDATE_POST } from '@/functions/api'
import { apiError } from '@/functions/api-error'
import { cookies } from 'next/headers'

export async function validateToken() {
  try {
    const token = cookies().get('token')?.value

    if (!token) throw new Error('Acesso negado.')

    const { url } = TOKEN_VALIDATE_POST()

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!response.ok) throw new Error('Erro ao validar o token.')

    const data = await response.json()
    return { ok: true, error: '', data }
  } catch (error) {
    return apiError(error)
  }
}
