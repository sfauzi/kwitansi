// types/invoice.ts
export interface BusinessInfo {
  name: string;
  email: string;
  whatsapp: string;
  bankName: string;
  bankAccount: string;
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

export interface Invoice {
  id?: string;
  businessInfo: BusinessInfo;
  clientInfo: ClientInfo;
  items: InvoiceItem[];
  discountType: 'percentage' | 'amount';
  discountValue: number;
  taxRate: number;
  notes: string;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  total: number;
  createdAt?: string;
  updatedAt?: string;
}