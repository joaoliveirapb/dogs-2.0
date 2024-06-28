'use client'

import { ChangeEvent, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../form/button'
import { Input } from '../form/input'
import { ErrorMessage } from '../helper/error-message'
import { photoPost } from '@/actions/photo-post'
import styles from './conta-photo-post.module.css'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>{pending ? 'Enviando...' : 'Enviar'}</Button>
  )
}

export function ContaPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  })

  const [img, setImg] = useState('')

  function handleImageChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) setImg(URL.createObjectURL(target.files[0]))
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome" name="nome" type="text" />
        <Input label="Peso" name="peso" type="number" />
        <Input label="Idade" name="idade" type="number" />
        <input
          onChange={handleImageChange}
          type="file"
          name="img"
          id="img"
          className={styles.file}
        />
        <ErrorMessage error={state.error} />
        <FormButton />
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
    </section>
  )
}
