'use client'

import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { PhotoData } from '@/actions/photo-get'
import { PhotoContent } from '../photo/photo-content'
import styles from './feed-modal.module.css'

interface FeedModalProps {
  photo: PhotoData
}

export function FeedModal({ photo }: FeedModalProps) {
  const router = useRouter()
  const pathname = usePathname()

  if (!pathname.includes('foto')) {
    return null
  }

  function handleOutsideClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      router.back()
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <PhotoContent data={photo} single={false} />
    </div>
  )
}
