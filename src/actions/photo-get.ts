'use server'

import { PHOTO_GET } from '@/functions/api'
import { apiError } from '@/functions/api-error'
import { Photo } from './photos-get'

export interface Comment {
  comment_ID: string
  comment_post_ID: string
  comment_author: string
  comment_content: string
}

export interface PhotoData {
  photo: Photo
  comments: Comment[]
}

export async function photoGet(id: string) {
  try {
    const { url } = PHOTO_GET(id)

    const response = await fetch(url, {
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    })
    if (!response.ok) throw new Error('Erro ao pegar a foto.')
    const data = (await response.json()) as PhotoData
    return { ok: true, error: '', data }
  } catch (error) {
    return apiError(error)
  }
}
