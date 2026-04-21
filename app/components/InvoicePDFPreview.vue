<!-- components/InvoicePDFPreview.vue -->
<template>
  <div class="invoice-pdf"
    style="padding:24px; background:white; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#111827;">

    <!-- Header -->
    <div style="border-bottom:1px solid #e5e7eb; padding-bottom:16px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div>
          <h2 style="font-size:24px; font-weight:700; margin:0 0 6px;">INVOICE</h2>
          <p style="color:#6b7280; margin:0;">No: {{ invoiceData.clientInfo.invoiceNumber }}</p>
        </div>
        <div style="text-align:right;">
          <p style="font-weight:600; font-size:18px; margin:0 0 4px;">{{ invoiceData.businessInfo.name }}</p>
          <p style="color:#6b7280; font-size:13px; margin:0;">{{ invoiceData.businessInfo.email }}</p>
          <p v-if="invoiceData.businessInfo.whatsapp" style="color:#6b7280; font-size:13px; margin:0;">
            Telp: {{ invoiceData.businessInfo.whatsapp }}
          </p>
        </div>
      </div>
    </div>

    <!-- Client & Date Info -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;">
      <div>
        <h3 style="font-weight:600; margin:0 0 8px;">Kepada Yth:</h3>
        <p style="font-weight:500; margin:0 0 2px;">{{ invoiceData.clientInfo.name }}</p>
        <p style="color:#6b7280; font-size:13px; margin:0 0 2px;">{{ invoiceData.clientInfo.email }}</p>
        <p v-if="invoiceData.clientInfo.whatsapp" style="color:#6b7280; font-size:13px; margin:0 0 2px;">
          Telp: {{ invoiceData.clientInfo.whatsapp }}
        </p>
        <p style="color:#6b7280; font-size:13px; margin:0;">{{ invoiceData.clientInfo.address }}</p>
      </div>
      <div style="text-align:right;">
        <p style="margin:0 0 4px;"><span style="font-weight:600;">Tanggal Terbit:</span> {{
          formatDate(invoiceData.clientInfo.issueDate) }}</p>
        <p style="margin:0;"><span style="font-weight:600;">Jatuh Tempo:</span> {{
          formatDate(invoiceData.clientInfo.dueDate) }}</p>
      </div>
    </div>

    <!-- Items Table -->
    <div style="margin-bottom:24px;">
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="background:#f3f4f6;">
            <th style="border:1px solid #e5e7eb; padding:8px 10px; text-align:left; font-size:13px;">Deskripsi</th>
            <th style="border:1px solid #e5e7eb; padding:8px 10px; text-align:right; font-size:13px;">Jumlah</th>
            <th style="border:1px solid #e5e7eb; padding:8px 10px; text-align:right; font-size:13px;">Harga Satuan</th>
            <th style="border:1px solid #e5e7eb; padding:8px 10px; text-align:right; font-size:13px;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoiceData.items" :key="item.id">
            <td style="border:1px solid #e5e7eb; padding:8px 10px; font-size:13px;">{{ item.description }}</td>
            <td style="border:1px solid #e5e7eb; padding:8px 10px; text-align:right; font-size:13px;">{{ item.quantity
              }}</td>
            <td style="border:1px solid #e5e7eb; padding:8px 10px; text-align:right; font-size:13px;">{{
              formatRupiah(item.unitPrice) }}</td>
            <td style="border:1px solid #e5e7eb; padding:8px 10px; text-align:right; font-size:13px;">{{
              formatRupiah(item.quantity * item.unitPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary -->
    <div style="margin-bottom:24px; display:flex; justify-content:flex-end;">
      <div style="width:300px;">
        <div style="display:flex; justify-content:space-between; padding:4px 0; font-size:13px;">
          <span>Subtotal:</span><span>{{ formatRupiah(invoiceData.subtotal) }}</span>
        </div>
        <div v-if="invoiceData.discountValue > 0"
          style="display:flex; justify-content:space-between; padding:4px 0; font-size:13px; color:#dc2626;">
          <span>Diskon ({{ discountDisplay }}):</span>
          <span>- {{ formatRupiah(invoiceData.discountAmount) }}</span>
        </div>
        <div v-if="invoiceData.taxRate > 0"
          style="display:flex; justify-content:space-between; padding:4px 0; font-size:13px;">
          <span>Pajak ({{ invoiceData.taxRate }}%):</span>
          <span>{{ formatRupiah(invoiceData.taxAmount) }}</span>
        </div>
        <div
          style="display:flex; justify-content:space-between; font-weight:700; font-size:16px; border-top:1px solid #e5e7eb; padding-top:8px; margin-top:6px;">
          <span>Total:</span><span>{{ formatRupiah(invoiceData.total) }}</span>
        </div>
      </div>
    </div>

    <!-- ── Payment Status ── -->
    <div v-if="invoiceData.payments && invoiceData.payments.length > 0"
      style="border-top:1px solid #e5e7eb; padding-top:16px; margin-bottom:20px;">

      <p style="font-weight:600; margin:0 0 10px; font-size:13px; color:#374151;">Data Pembayaran</p>

      <!-- Tabel riwayat -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:12px;">
        <thead>
          <tr style="border-bottom:1px solid #d1d5db;">
            <th style="padding:6px 8px; text-align:left; font-size:12px; font-weight:600; color:#6b7280; width:32px;">No
            </th>
            <th style="padding:6px 8px; text-align:left; font-size:12px; font-weight:600; color:#6b7280;">Tanggal</th>
            <th style="padding:6px 8px; text-align:left; font-size:12px; font-weight:600; color:#6b7280;">Keterangan
            </th>
            <th style="padding:6px 8px; text-align:right; font-size:12px; font-weight:600; color:#6b7280;">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in invoiceData.payments" :key="payment.id"
            style="border-bottom:1px solid #f3f4f6;">
            <td style="padding:6px 8px; font-size:13px; color:#6b7280;">{{ index + 1 }}</td>
            <td style="padding:6px 8px; font-size:13px; color:#6b7280;">{{ formatDateTime(payment.paymentDate) }}</td>
            <td style="padding:6px 8px; font-size:13px; color:#6b7280;">
              {{ payment.type === 'dp' ? 'Down Payment' : 'Pelunasan' }}
              <span v-if="payment.notes" style="color:#9ca3af;"> · {{ payment.notes }}</span>
            </td>
            <td style="padding:6px 8px; font-size:13px; text-align:right; color:#111827;">{{
              formatRupiah(payment.amount) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Summary kanan bawah -->
      <div style="display:flex; justify-content:flex-end;">
        <div style="width:300px;">
          <div
            style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #e5e7eb; font-size:13px;">
            <span style="color:#6b7280;">Jumlah Bayar</span>
            <span style="font-weight:700; color:#111827;">{{ formatRupiah(getTotalPaid()) }}</span>
          </div>
          <div
            style="display:flex; justify-content:space-between; padding:5px 0; border-bottom:1px solid #e5e7eb; font-size:13px;">
            <span style="color:#6b7280;">Discount</span>
            <span style="font-weight:700; color:#111827;">{{ formatRupiah(invoiceData.discountAmount || 0) }}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:13px;">
            <span style="color:#6b7280;">Kurang</span>
            <span style="font-weight:700;" :style="{ color: getRemainingBalance() > 0 ? '#dc2626' : '#16a34a' }">
              {{ getRemainingBalance() > 0 ? formatRupiah(getRemainingBalance()) : formatRupiah(0) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bank Info -->
    <div v-if="invoiceData.businessInfo.bankName && invoiceData.businessInfo.bankAccount"
      style="border-top:1px solid #e5e7eb; padding-top:14px; margin-bottom:14px;">
      <h3 style="font-weight:600; margin:0 0 8px; font-size:13px;">Informasi Pembayaran:</h3>
      <p style="margin:0 0 2px; font-size:13px;">Bank: {{ invoiceData.businessInfo.bankName }}</p>
      <p style="margin:0 0 2px; font-size:13px;">No. Rekening: {{ invoiceData.businessInfo.bankAccount }}</p>
      <p style="margin:0; font-size:13px;">Atas Nama: {{ invoiceData.businessInfo.bankAccountName ||
        invoiceData.businessInfo.name }}</p>
    </div>

    <!-- Notes -->
    <div v-if="invoiceData.notes" style="border-top:1px solid #e5e7eb; padding-top:14px;">
      <h3 style="font-weight:600; margin:0 0 6px; font-size:13px;">Catatan:</h3>
      <p style="color:#6b7280; font-size:13px; margin:0;">{{ invoiceData.notes }}</p>
    </div>

    <!-- Footer -->
    <div
      style="text-align:center; font-size:12px; color:#9ca3af; margin-top:32px; padding-top:14px; border-top:1px solid #e5e7eb;">
      Terima kasih atas kepercayaan Anda
    </div>
  </div>
</template>


<script setup lang="ts">
interface PaymentLite {
  id: string
  amount: number
  type: 'dp' | 'payment'
  paymentDate: string
  notes?: string
}

interface Props {
  invoiceData: {
    businessInfo: any
    clientInfo: any
    items: any[]
    subtotal: number
    discountAmount: number
    discountValue: number
    discountType: string
    taxRate: number
    taxAmount: number
    total: number
    notes: string
    payments?: PaymentLite[]
    totalPaid?: number
    remainingBalance?: number
    paymentStatus?: 'unpaid' | 'partial' | 'dp_paid' | 'paid'
  }
}

const props = defineProps<Props>()

const formatRupiah = (value: number) => {
  if (!value && value !== 0) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString: string) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const discountDisplay = computed(() => {
  if (props.invoiceData.discountType === 'percentage') {
    return `${props.invoiceData.discountValue}%`
  }
  return formatRupiah(props.invoiceData.discountValue)
})

const getTotalPaid = () => {
  if (typeof props.invoiceData.totalPaid === 'number') return props.invoiceData.totalPaid
  return (props.invoiceData.payments || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
}

const getRemainingBalance = () => {
  if (typeof props.invoiceData.remainingBalance === 'number') return Math.max(0, props.invoiceData.remainingBalance)
  return Math.max(0, (Number(props.invoiceData.total) || 0) - getTotalPaid())
}
</script>