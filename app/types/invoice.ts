// types/invoice.ts
export interface BusinessInfo {
  name: string;
  email: string;
  whatsapp: string;
  bankName: string;
  bankAccount: string;
  bankAccountName: string;
  address: string;
}

export interface ClientInfo {
  name: string;
  email: string;
  whatsapp: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  address: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  amount: number;
  type: 'dp' | 'payment'; // dp = down payment, payment = pelunasan
  paymentDate: string;
  notes?: string;
  paymentMethod?: 'cash' | 'bank_transfer' | 'other';
  createdAt: string;
}

export interface Invoice {
  id: string
  user_id: string
  business_info: BusinessInfo
  client_info: ClientInfo
  items: InvoiceItem[]
  discount_type: 'percentage' | 'amount'
  discount_value: number
  tax_rate: number
  notes: string
  subtotal: number
  discount_amount: number
  tax_amount: number
  total: number
  selected_template?: 'classic' | 'modern' | 'minimal'
  template_accent_color?: string
  // Payment fields
  dp_amount?: number
  payments?: Payment[] // History pembayaran
  remaining_balance?: number // Sisa yang harus dibayar
  payment_status?: 'unpaid' | 'partial' | 'dp_paid' | 'paid'
  created_at: string
  updated_at: string
}