import { User } from 'lucide-react'
import { userGet } from '@/actions/user-get'
import Link from 'next/link'
import Image from 'next/image'
import styles from './header.module.css'

export async function Header() {
  const { data } = await userGet()

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} href="/">
          <Image
            src="/assets/dogs.svg"
            alt="Dogs"
            width={28}
            height={22}
            priority
          />
        </Link>
        {data ? (
          <Link className={styles.login} href="/conta">
            {data.username}
            <User size={20} />
          </Link>
        ) : (
          <Link className={styles.login} href="/login">
            Login / Criar
            <User size={20} />
          </Link>
        )}
      </nav>
    </header>
  )
}
