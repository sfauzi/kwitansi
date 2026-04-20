// stores/authStore.ts
import { defineStore } from 'pinia'
import type { User, LoginForm, RegisterForm } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    session: null as any,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user
  },

  actions: {
    async login(credentials: LoginForm) {
      this.loading = true
      this.error = null
      const { supabase } = useSupabase()

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })

        if (error) throw error

        this.user = data.user
        this.session = data.session
        return { success: true, data }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async register(userData: RegisterForm) {
      this.loading = true
      this.error = null
      const { supabase } = useSupabase()

      try {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              full_name: userData.fullName
            }
          }
        })

        if (error) throw error

        return { success: true, data }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      const { supabase } = useSupabase()

      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        this.user = null
        this.session = null
        return { success: true }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async getCurrentUser() {
      const { supabase } = useSupabase()
      
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error

        this.session = data.session
        this.user = (data.session?.user as any) ?? null
        return this.user
      } catch (error) {
        this.user = null
        this.session = null
        return null
      }
    },

    async resetPassword(email: string) {
      const { supabase } = useSupabase()
      
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) throw error
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      }
    }
  }
})