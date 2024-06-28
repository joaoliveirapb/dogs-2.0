'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../form/button'
import { Input } from '../form/input'
import { ErrorMessage } from '../helper/error-message'
import { passwordLost } from '@/actions/password-lost'
import styles from './login-form.module.css'
import { useEffect, useState } from 'react'

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar e-mail'}
    </Button>
  )
}

export function LoginPerdeuForm() {
  const [state, action] = useFormState(passwordLost, {
    ok: false,
    error: '',
    data: null,
  })

  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href.replace('perdeu', 'resetar'))
  }, [])

  return (
    <form action={action} className={styles.form}>
      <Input label="E-mail / Usuário" name="login" type="text" />
      <input type="hidden" name="url" value={url} />
      <ErrorMessage error={state.error} />
      {state.ok ? (
        <p style={{ color: '#4c1' }}>E-mail enviado.</p>
      ) : (
        <FormButton />
      )}
    </form>
  )
}
