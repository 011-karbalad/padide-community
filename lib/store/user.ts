import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  avatar?: string
}

interface UserStore {
  user: UserProfile | null
  isLoggedIn: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  updateProfile: (profile: Partial<UserProfile>) => void
  setUser: (user: UserProfile) => void
  clearError: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          })

          const data = await response.json()

          if (data.success) {
            set({
              user: data.user,
              isLoggedIn: true,
              isLoading: false,
            })
            return true
          } else {
            set({
              error: data.error || 'خطا در ورود',
              isLoading: false,
            })
            return false
          }
        } catch (error) {
          set({
            error: 'خطا در اتصال',
            isLoading: false,
          })
          return false
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
          set({
            user: null,
            isLoggedIn: false,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
        }
      },

      updateProfile: (profile) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...profile } : null,
        }))
      },

      setUser: (user) => {
        set({
          user,
          isLoggedIn: true,
        })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'user-store',
    }
  )
)
