import type { Metadata } from 'next'
import { LoginResetarForm } from '@/components/login/login-resetar-form'

export const metadata: Metadata = {
  title: 'Resetar a senha | Dogs',
  description: 'Resete a sua senha.',
}

interface ResetarPageProps {
  searchParams: {
    key: string
    login: string
  }
}

export default function ResetarPage({ searchParams }: ResetarPageProps) {
  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <LoginResetarForm
        keyToken={searchParams.key}
        login={searchParams.login}
      />
    </div>
  )
}
