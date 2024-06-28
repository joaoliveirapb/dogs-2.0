'use client'

import Image from 'next/image'
import Link from 'next/link'
import { PhotoComments } from './photo-comments'
import { PhotoData } from '@/actions/photo-get'
import { useUser } from '@/contexts/user-context'
import { PhotoDelete } from './photo-delete'
import { Eye } from 'lucide-react'
import styles from './photo-content.module.css'

interface PhotoContentProps {
  data: PhotoData
  single: boolean
}

export function PhotoContent({ data, single }: PhotoContentProps) {
  const { user } = useUser()
  const { photo, comments } = data

  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} width={1000} height={1000} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={String(photo.id)} />
            ) : (
              <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>
              <Eye size={22} />
              {photo.acessos}
            </span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  )
}
