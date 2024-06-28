'use server'

import { USER_GET } from '@/functions/api'
import { apiError } from '@/functions/api-error'
import { cookies } from 'next/headers'

export interface User {
  id: number
  email: string
  username: string
  nome: string
}

export async function userGet() {
  try {
    const token = cookies().get('token')?.value

    if (!token) throw new Error('Token não encontrado.')

    const { url } = USER_GET()

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) throw new Error('Erro ao pegar o usuário.')

    const data = (await response.json()) as User

    return { ok: true, error: '', data }
  } catch (error: unknown) {
    return apiError(error)
  }
}
