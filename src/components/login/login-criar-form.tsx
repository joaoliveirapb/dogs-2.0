'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../form/button'
import { Input } from '../form/input'
import { ErrorMessage } from '../helper/error-message'
import { userPost } from '@/actions/user-post'
import styles from './login-form.module.css'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? 'Cadastrando...' : 'Cadastrar'}
    </Button>
  )
}

export function LoginCriarForm() {
  const [state, action] = useFormState(userPost, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.ok) window.location.href = '/conta'
  }, [state.ok])

  return (
    <form action={action} className={styles.form}>
      <Input label="Usuário" name="username" type="text" />
      <Input label="E-mail" name="email" type="email" />
      <Input label="Senha" name="password" type="password" />
      <ErrorMessage error={state.error} />
      <FormButton />
    </form>
  )
}
