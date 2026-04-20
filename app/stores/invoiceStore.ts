// stores/invoiceStore.ts
import { defineStore } from 'pinia'
import type { Invoice, InvoiceItem, BusinessInfo, ClientInfo } from '~/types/invoice'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [] as Invoice[],
    currentInvoice: null as Invoice | null,
    loading: false,
    error: null as string | null,
    businessInfo: {
      name: '',
      email: '',
      whatsapp: '',
      bankName: '',
      bankAccount: '',
      address: ''
    } as BusinessInfo,
    clientInfo: {
      name: '',
      email: '',
      whatsapp: '',
      invoiceNumber: `INV-${Date.now()}`,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      address: ''
    } as ClientInfo,
    items: [
      {
        id: '1',
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }
    ] as InvoiceItem[],
    discountType: 'percentage' as 'percentage' | 'amount',
    discountValue: 0,
    taxRate: 0,
    notes: '',
    saving: false
  }),

  getters: {
    subtotal: (state) => {
      return state.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0)
    },

    discountAmount: (state) => {
      if (state.discountType === 'percentage') {
        return (state.subtotal * state.discountValue) / 100
      }
      return state.discountValue
    },

    taxableAmount: (state) => {
      return state.subtotal - state.discountAmount
    },

    taxAmount: (state) => {
      return (state.taxableAmount * state.taxRate) / 100
    },

    total: (state) => {
      return state.taxableAmount + state.taxAmount
    },

    // 🔥 Perbaikan: Format data untuk dikirim ke Supabase (snake_case)
    formattedForDatabase: (state) => {
      return {
        business_info: state.businessInfo,  // snake_case, bukan camelCase
        client_info: state.clientInfo,      // snake_case
        items: state.items,
        discount_type: state.discountType,  // snake_case
        discount_value: state.discountValue, // snake_case
        tax_rate: state.taxRate,            // snake_case
        notes: state.notes,
        subtotal: state.subtotal,
        discount_amount: state.discountAmount, // snake_case
        tax_amount: state.taxAmount,        // snake_case
        total: state.total
      }
    },

    getInvoiceById: (state) => (id: string) => {
      return state.invoices.find(invoice => invoice.id === id)
    }
  },

  actions: {
    addItem() {
      this.items.push({
        id: Date.now().toString(),
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      })
    },

    removeItem(id: string) {
      if (this.items.length > 1) {
        this.items = this.items.filter(item => item.id !== id)
      }
    },

    updateItem(id: string, field: keyof InvoiceItem, value: any) {
      const item = this.items.find(i => i.id === id)
      if (item) {
        item[field] = value
        if (field === 'quantity' || field === 'unitPrice') {
          item.total = item.quantity * item.unitPrice
        }
      }
    },

    async saveInvoice() {
      this.saving = true
      const { supabase } = useSupabase()

      try {
        const dataToSave = this.formattedForDatabase

        console.log('Data yang akan disimpan:', dataToSave) // Debugging

        const { data, error } = await supabase
          .from('invoices')
          .insert([dataToSave])
          .select()

        if (error) {
          console.error('Supabase error detail:', error)
          throw error
        }

        console.log('Invoice berhasil disimpan:', data)
        return { success: true, data }
      } catch (error) {
        console.error('Error saving invoice:', error)
        return { success: false, error }
      } finally {
        this.saving = false
      }
    },

    resetForm() {
      this.businessInfo = {
        name: '',
        email: '',
        whatsapp: '',
        bankName: '',
        bankAccount: '',
        address: ''
      }
      this.clientInfo = {
        name: '',
        email: '',
        whatsapp: '',
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        address: ''
      }
      this.items = [{
        id: '1',
        description: '',
        quantity: 1,
        unitPrice: 0,
        total: 0
      }]
      this.discountType = 'percentage'
      this.discountValue = 0
      this.taxRate = 0
      this.notes = ''
    },

    async fetchInvoices() {
      this.loading = true
      const { supabase } = useSupabase()
      const authStore = useAuthStore()

      try {
        const { data, error } = await supabase
          .from('invoices')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        this.invoices = data
        return { success: true, data }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async fetchInvoiceById(id: string) {
      this.loading = true
      const { supabase } = useSupabase()

      try {
        const { data, error } = await supabase
          .from('invoices')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        this.currentInvoice = data
        return { success: true, data }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async saveInvoice() {
      this.saving = true
      const { supabase } = useSupabase()

      try {
        const dataToSave = this.formattedForDatabase

        const { data, error } = await supabase
          .from('invoices')
          .insert([dataToSave])
          .select()

        if (error) throw error

        await this.fetchInvoices()
        return { success: true, data }
      } catch (error: any) {
        console.error('Error saving invoice:', error)
        return { success: false, error: error.message }
      } finally {
        this.saving = false
      }
    },

    async updateInvoice(id: string, invoiceData: any) {
      this.loading = true
      const { supabase } = useSupabase()

      try {
        const { data, error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', id)
          .select()

        if (error) throw error

        await this.fetchInvoices() // Refresh list
        return { success: true, data }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    async deleteInvoice(id: string) {
      this.loading = true
      const { supabase } = useSupabase()

      try {
        const { error } = await supabase
          .from('invoices')
          .delete()
          .eq('id', id)

        if (error) throw error

        await this.fetchInvoices() // Refresh list
        return { success: true }
      } catch (error: any) {
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    loadInvoiceToForm(invoice: Invoice) {
      // Load data invoice ke form untuk edit
      this.businessInfo = invoice.business_info
      this.clientInfo = invoice.client_info
      this.items = invoice.items
      this.discountType = invoice.discount_type
      this.discountValue = invoice.discount_value
      this.taxRate = invoice.tax_rate
      this.notes = invoice.notes
    },
    
  }
})