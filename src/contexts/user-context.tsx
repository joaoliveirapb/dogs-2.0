'use client'

import { logout } from '@/actions/logout'
import { validateToken } from '@/actions/validate-token'
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

interface User {
  id: number
  email: string
  username: string
  nome: string
}

interface UserContextProps {
  user: User | null
  setUserState: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<UserContextProps | null>(null)

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode
  user: User | null
}) {
  const [userState, setUserState] = useState<User | null>(user)

  useEffect(() => {
    async function validate() {
      const { ok } = await validateToken()
      if (!ok) await logout()
    }
    if (userState) validate()
  }, [userState])

  return (
    <UserContext.Provider value={{ user: userState, setUserState }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)

  if (context === null) {
    throw new Error('useContext deve estar dentro do Provider.')
  }

  return context
}
