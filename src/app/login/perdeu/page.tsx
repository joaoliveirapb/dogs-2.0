import type { Metadata } from 'next'
import { LoginPerdeuForm } from '@/components/login/login-perdeu-form'

export const metadata: Metadata = {
  title: 'Perdeu a senha | Dogs',
  description: 'Recupere a sua senha.',
}

export default function PerdeuPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Perdeu a senha?</h1>
      <LoginPerdeuForm />
    </div>
  )
}
