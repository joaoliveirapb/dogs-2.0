import type { Metadata } from 'next'
import { photosGet } from '@/actions/photos-get'
import { Feed } from '@/components/feed/feed'
import { userGet } from '@/actions/user-get'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Minha Conta',
}

export default async function ContaPage() {
  const { data: user } = await userGet()
  const { data } = await photosGet({ user: user?.username })

  return (
    <section>
      {data?.length ? (
        <Feed photos={data} user={user?.username} />
      ) : (
        <div>
          <p
            style={{ color: '#444', fontSize: '1.25rem', marginBottom: '1rem' }}
          >
            Sem foto!
          </p>
          <Link
            href="/conta/postar"
            className="button"
            style={{ display: 'inline-block' }}
          >
            Postar foto
          </Link>
        </div>
      )}
    </section>
  )
}
