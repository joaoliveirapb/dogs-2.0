import type { Metadata } from 'next'
import { LoginForm } from '@/components/login/login-form'

export const metadata: Metadata = {
  title: 'Login | Dogs',
  description: 'Logue na sua conta no site Dogs.',
}

export default function LoginPage() {
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <LoginForm />
    </section>
  )
}
