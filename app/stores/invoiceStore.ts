// stores/invoiceStore.ts
import { defineStore } from 'pinia'
import type { Invoice, InvoiceItem, BusinessInfo, ClientInfo } from '~/types/invoice'

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
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
    }
  }
})