// composables/useSupabase.ts
import { createClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  const config = useRuntimeConfig()
  
  // Tambahkan opsi untuk debugging
  const supabase = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey,
    {
      auth: {
        persistSession: false, // Nonaktifkan session persistence jika tidak perlu login
        autoRefreshToken: false
      },
      db: {
        schema: 'public'
      }
    }
  )
  
  // Test koneksi
  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('invoices').select('count', { count: 'exact', head: true })
      if (error) throw error
      console.log('Supabase connection successful!')
      return true
    } catch (error) {
      console.error('Supabase connection failed:', error)
      return false
    }
  }
  
  return { supabase, testConnection }
}