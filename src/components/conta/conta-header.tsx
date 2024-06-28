'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { logout } from '@/actions/logout'
import { useUser } from '@/contexts/user-context'
import { useMedia } from '@/hooks/use-media'
import { BarChart, LayoutGrid, LogOut, Plus } from 'lucide-react'
import Link from 'next/link'
import styles from './conta-header.module.css'

function getTitle(pathname: string) {
  switch (pathname) {
    case '/conta/postar':
      return 'Poste Sua Foto'
    case '/conta/estatisticas':
      return 'Estatísticas'
    default:
      return 'Minha Conta'
  }
}

export default function ContaHeader() {
  const mobile = useMedia('(max-width: 40rem)')
  const [mobileMenu, setMobileMenu] = useState(false)

  const pathname = usePathname()
  useEffect(() => {
    setMobileMenu(false)
  }, [pathname])

  const { setUserState } = useUser()
  async function handleLogout() {
    await logout()
    setUserState(null)
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        />
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link href="/conta" className={pathname === '/conta' ? 'active' : ''}>
          <LayoutGrid />
          {mobile && 'Minhas Fotos'}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={pathname === '/conta/estatisticas' ? 'active' : ''}
        >
          <BarChart />
          {mobile && 'Estatísticas'}
        </Link>
        <Link
          href="/conta/postar"
          className={pathname === '/conta/postar' ? 'active' : ''}
        >
          <Plus />
          {mobile && 'Adicionar Foto'}
        </Link>
        <button onClick={handleLogout}>
          <LogOut />
          {mobile && 'Sair'}
        </button>
      </nav>
    </header>
  )
}
