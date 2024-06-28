'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../form/button'
import { Input } from '../form/input'
import { ErrorMessage } from '../helper/error-message'
import { passwordReset } from '@/actions/password-reset'
import styles from './login-form.module.css'

interface LoginResetarFormProps {
  keyToken: string
  login: string
}

function FormButton() {
  const { pending } = useFormStatus()

  return (
    <Button disabled={pending}>
      {pending ? 'Resetando...' : 'Resetar senha'}
    </Button>
  )
}

export function LoginResetarForm({ keyToken, login }: LoginResetarFormProps) {
  const [state, action] = useFormState(passwordReset, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form action={action} className={styles.form}>
      <Input label="Nova senha" name="password" type="password" />
      <input type="hidden" name="key" value={keyToken} />
      <input type="hidden" name="login" value={login} />
      <ErrorMessage error={state.error} />
      <FormButton />
    </form>
  )
}
