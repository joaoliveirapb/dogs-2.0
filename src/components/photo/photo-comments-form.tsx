'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { ErrorMessage } from '../helper/error-message'
import { Comment } from '@/actions/photo-get'
import { commentPost } from '@/actions/comment-post'
import styles from './photo-comments-form.module.css'

interface PhotoCommentsFormProps {
  single: boolean
  id: number
  setComments: Dispatch<SetStateAction<Comment[]>>
}

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <Image
        src="/assets/enviar.svg"
        alt="Logo enviar"
        width={43}
        height={31}
      />
    </button>
  )
}

export function PhotoCommentsForm({
  single,
  id,
  setComments,
}: PhotoCommentsFormProps) {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    error: '',
    data: null,
  })

  const [comment, setComment] = useState('')

  useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data])
      setComment('')
    }
  }, [state, setComments])

  return (
    <form
      action={action}
      className={`${styles.form} ${single && styles.single}`}
    >
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <input type="hidden" name="id" id="id" value={id} />
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  )
}
