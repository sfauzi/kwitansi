// composables/useInvoiceCalculator.ts
import { computed, ref } from 'vue'
import type { InvoiceItem } from '~/types/invoice'

export const useInvoiceCalculator = () => {
  const calculateItemTotal = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice
  }
  
  const calculateSubtotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }
  
  const calculateDiscountAmount = (subtotal: number, discountType: string, discountValue: number) => {
    if (discountType === 'percentage') {
      return (subtotal * discountValue) / 100
    }
    return discountValue
  }
  
  const calculateTaxAmount = (subtotal: number, discountAmount: number, taxRate: number) => {
    return ((subtotal - discountAmount) * taxRate) / 100
  }
  
  const calculateTotal = (subtotal: number, discountAmount: number, taxAmount: number) => {
    return subtotal - discountAmount + taxAmount
  }
  
  return {
    calculateItemTotal,
    calculateSubtotal,
    calculateDiscountAmount,
    calculateTaxAmount,
    calculateTotal
  }
}