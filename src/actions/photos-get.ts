'use server'

import { PHOTOS_GET } from '@/functions/api'
import { apiError } from '@/functions/api-error'

export interface Photo {
  id: number
  author: string
  title: string
  date: string
  src: string
  peso: string
  idade: string
  acessos: string
  total_comments: string
}

interface PhotosGetProps {
  page?: number
  total?: number
  user?: 0 | string
}

export async function photosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetProps = {},
  optionsFront?: RequestInit,
) {
  try {
    const options = optionsFront || {
      next: { revalidate: 10, tags: ['photos'] },
    }

    const { url } = PHOTOS_GET({ page, total, user })

    const response = await fetch(url, options)
    if (!response.ok) throw new Error('Erro ao pegar as fotos.')
    const data = (await response.json()) as Photo[]
    return { ok: true, error: '', data }
  } catch (error) {
    return apiError(error)
  }
}
