'use client'

import { useState } from 'react'
import { photoDelete } from '@/actions/photo-delete'
import styles from './photo-delete.module.css'

interface PhotoDeleteProps {
  id: string
}

export function PhotoDelete({ id }: PhotoDeleteProps) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    const confirm = window.confirm('Tem certeza que deseja deletar?')
    if (confirm) {
      await photoDelete(id)
    }
    setLoading(false)
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  )
}
