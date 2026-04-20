// stores/invoiceStore.ts
import { defineStore } from 'pinia'
import type { Invoice, InvoiceItem, BusinessInfo, ClientInfo } from '~/types/invoice'
import type { TemplateType } from '~/types/template'

const calculateSubtotal = (items: InvoiceItem[]) => {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
}

const calculateDiscountAmount = (
  subtotal: number,
  discountType: 'percentage' | 'amount',
  discountValue: number
) => {
  if (discountType === 'percentage') {
    return (subtotal * discountValue) / 100
  }
  return discountValue
}

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    invoices: [] as Invoice[],
    currentInvoice: null as Invoice | null,
    loading: false,
    error: null as string | null,
    selectedTemplate: 'classic' as TemplateType,
    templateAccentColor: '#3b82f6',
    businessInfo: {
      name: '',
      email: '',
      whatsapp: '',
      bankName: '',
      bankAccount: '',
      bankAccountName: '',
      address: ''
    } as BusinessInfo,
    clientInfo: {
      name: '',
      email: '',
      whatsapp: '',
      invoiceNumber: `INV-${Date.now()}`,
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
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
      return calculateSubtotal(state.items)
    },

    discountAmount: (state) => {
      return calculateDiscountAmount(
        calculateSubtotal(state.items),
        state.discountType,
        state.discountValue
      )
    },

    taxableAmount: (state) => {
      const subtotal = calculateSubtotal(state.items)
      const discountAmount = calculateDiscountAmount(subtotal, state.discountType, state.discountValue)
      return subtotal - discountAmount
    },

    taxAmount: (state) => {
      const subtotal = calculateSubtotal(state.items)
      const discountAmount = calculateDiscountAmount(subtotal, state.discountType, state.discountValue)
      const taxableAmount = subtotal - discountAmount
      return (taxableAmount * state.taxRate) / 100
    },

    total: (state) => {
      const subtotal = calculateSubtotal(state.items)
      const discountAmount = calculateDiscountAmount(subtotal, state.discountType, state.discountValue)
      const taxableAmount = subtotal - discountAmount
      const taxAmount = (taxableAmount * state.taxRate) / 100
      return taxableAmount + taxAmount
    },

    // 🔥 Perbaikan: Format data untuk dikirim ke Supabase (snake_case)
    formattedForDatabase: (state) => {
      const subtotal = calculateSubtotal(state.items)
      const discountAmount = calculateDiscountAmount(subtotal, state.discountType, state.discountValue)
      const taxableAmount = subtotal - discountAmount
      const taxAmount = (taxableAmount * state.taxRate) / 100
      const total = taxableAmount + taxAmount

      return {
        business_info: state.businessInfo,
        client_info: state.clientInfo,
        items: state.items,
        discount_type: state.discountType,
        discount_value: state.discountValue,
        tax_rate: state.taxRate,
        notes: state.notes,
        subtotal,
        discount_amount: discountAmount,
        tax_amount: taxAmount,
        total,
        selected_template: state.selectedTemplate,
        template_accent_color: state.templateAccentColor
      }
    },

    getInvoiceById: (state) => (id: string) => {
      return state.invoices.find(invoice => invoice.id === id)
    }
  },

  actions: {
    isMissingTemplateColumnError(error: any) {
      const message = String(error?.message || '')
      return /could not find/i.test(message) && /(selected_template|template_accent_color)/i.test(message)
    },

    removeTemplateFields(payload: Record<string, any>) {
      const { selected_template, template_accent_color, ...rest } = payload
      return rest
    },

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
        ;(item as Record<keyof InvoiceItem, any>)[field] = value
        if (field === 'quantity' || field === 'unitPrice') {
          item.total = item.quantity * item.unitPrice
        }
      }
    },

    setTemplate(template: TemplateType) {
      this.selectedTemplate = template
      // Save to localStorage
      if (process.client) {
        localStorage.setItem('invoice_template', template)
      }
    },
    
    setTemplateAccentColor(color: string) {
      this.templateAccentColor = color
      if (process.client) {
        localStorage.setItem('template_accent_color', color)
      }
    },
    
    loadTemplateSettings() {
      if (process.client) {
        const savedTemplate = localStorage.getItem('invoice_template') as TemplateType
        const savedColor = localStorage.getItem('template_accent_color')
        
        if (savedTemplate) this.selectedTemplate = savedTemplate
        if (savedColor) this.templateAccentColor = savedColor
      }
    },

    async saveInvoice() {
      this.saving = true
      const { supabase } = useSupabase()

      try {
        const dataToSave = this.formattedForDatabase

        let { data, error } = await supabase
          .from('invoices')
          .insert([dataToSave])
          .select()

        if (error && this.isMissingTemplateColumnError(error)) {
          const fallbackPayload = this.removeTemplateFields(dataToSave)
          const fallbackResult = await supabase
            .from('invoices')
            .insert([fallbackPayload])
            .select()

          data = fallbackResult.data
          error = fallbackResult.error
        }

        if (error) throw error

        await this.fetchInvoices()
        return { success: true, data }
      } catch (error: any) {
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
        bankAccountName: '',
        address: ''
      }
      this.clientInfo = {
        name: '',
        email: '',
        whatsapp: '',
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: new Date().toISOString().slice(0, 10),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
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

    async updateInvoice(id: string, invoiceData: any) {
      this.loading = true
      const { supabase } = useSupabase()

      try {
        let { data, error } = await supabase
          .from('invoices')
          .update(invoiceData)
          .eq('id', id)
          .select()

        if (error && this.isMissingTemplateColumnError(error)) {
          const fallbackPayload = this.removeTemplateFields(invoiceData)
          const fallbackResult = await supabase
            .from('invoices')
            .update(fallbackPayload)
            .eq('id', id)
            .select()

          data = fallbackResult.data
          error = fallbackResult.error
        }

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
      this.businessInfo = invoice.business_info
      this.clientInfo = invoice.client_info
      this.items = invoice.items
      this.discountType = invoice.discount_type
      this.discountValue = invoice.discount_value
      this.taxRate = invoice.tax_rate
      this.notes = invoice.notes

      this.selectedTemplate = ((invoice as any).selected_template || 'classic')
      this.templateAccentColor = ((invoice as any).template_accent_color || '#3b82f6')
    },
    
  }
})