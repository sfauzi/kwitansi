<!-- components/InvoicePDFPreview.vue -->
<template>
  <div class="invoice-pdf" style="padding: 20px; background: white; font-family: Arial, Helvetica, sans-serif;">
    <!-- Header -->
    <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 16px; margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">INVOICE</h2>
          <p style="color: #6b7280;">No: {{ invoiceData.clientInfo.invoiceNumber }}</p>
        </div>
        <div style="text-align: right;">
          <p style="font-weight: 600; font-size: 18px;">{{ invoiceData.businessInfo.name }}</p>
          <p style="color: #6b7280; font-size: 14px;">{{ invoiceData.businessInfo.email }}</p>
          <p v-if="invoiceData.businessInfo.whatsapp" style="color: #6b7280; font-size: 14px;">
            Telp: {{ invoiceData.businessInfo.whatsapp }}
          </p>
        </div>
      </div>
    </div>

    <!-- Client & Date Info -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
      <div>
        <h3 style="font-weight: 600; margin-bottom: 8px;">Kepada Yth:</h3>
        <p style="font-weight: 500;">{{ invoiceData.clientInfo.name }}</p>
        <p style="color: #6b7280; font-size: 14px;">{{ invoiceData.clientInfo.email }}</p>
        <p v-if="invoiceData.clientInfo.whatsapp" style="color: #6b7280; font-size: 14px;">
          Telp: {{ invoiceData.clientInfo.whatsapp }}
        </p>
        <p style="color: #6b7280; font-size: 14px;">{{ invoiceData.clientInfo.address }}</p>
      </div>
      <div style="text-align: right;">
        <p><span style="font-weight: 600;">Tanggal Terbit:</span> {{ formatDate(invoiceData.clientInfo.issueDate) }}</p>
        <p><span style="font-weight: 600;">Jatuh Tempo:</span> {{ formatDate(invoiceData.clientInfo.dueDate) }}</p>
      </div>
    </div>

    <!-- Items Table -->
    <div style="overflow-x: auto; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f3f4f6;">
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Deskripsi</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">Jumlah</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">Harga Satuan</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoiceData.items" :key="item.id">
            <td style="border: 1px solid #e5e7eb; padding: 8px;">{{ item.description }}</td>
            <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">{{ item.quantity }}</td>
            <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">{{ formatRupiah(item.unitPrice) }}</td>
            <td style="border: 1px solid #e5e7eb; padding: 8px; text-align: right;">{{ formatRupiah(item.quantity * item.unitPrice) }}</td>
          </tr>
          <tr v-if="invoiceData.items.length === 0">
            <td colspan="4" style="border: 1px solid #e5e7eb; padding: 8px; text-align: center; color: #9ca3af;">Tidak ada item</td>
          </tr>
        </tbody>
       </table>
    </div>

    <!-- Summary -->
    <div style="margin-bottom: 24px;">
      <div style="display: flex; justify-content: flex-end;">
        <div style="width: 320px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Subtotal:</span>
            <span>{{ formatRupiah(invoiceData.subtotal) }}</span>
          </div>
          <div v-if="invoiceData.discountValue > 0" style="display: flex; justify-content: space-between; margin-bottom: 4px; color: #dc2626;">
            <span>Diskon ({{ discountDisplay }}):</span>
            <span>- {{ formatRupiah(invoiceData.discountAmount) }}</span>
          </div>
          <div v-if="invoiceData.taxRate > 0" style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Pajak ({{ invoiceData.taxRate }}%):</span>
            <span>{{ formatRupiah(invoiceData.taxAmount) }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; border-top: 1px solid #e5e7eb; padding-top: 8px; margin-top: 8px;">
            <span>Total:</span>
            <span>{{ formatRupiah(invoiceData.total) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bank Info -->
    <div v-if="invoiceData.businessInfo.bankName && invoiceData.businessInfo.bankAccount" 
         style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-bottom: 16px;">
      <h3 style="font-weight: 600; margin-bottom: 8px;">Informasi Pembayaran:</h3>
      <p>Bank: {{ invoiceData.businessInfo.bankName }}</p>
      <p>No. Rekening: {{ invoiceData.businessInfo.bankAccount }}</p>
      <p>Atas Nama: {{ invoiceData.businessInfo.name }}</p>
    </div>

    <!-- Notes -->
    <div v-if="invoiceData.notes" style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
      <h3 style="font-weight: 600; margin-bottom: 8px;">Catatan:</h3>
      <p style="color: #6b7280; font-size: 14px;">{{ invoiceData.notes }}</p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
      Terima kasih atas kepercayaan Anda
    </div>
  </div>
</template>

<script setup lang="ts">
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

const discountDisplay = computed(() => {
  if (props.invoiceData.discountType === 'percentage') {
    return `${props.invoiceData.discountValue}%`
  }
  return formatRupiah(props.invoiceData.discountValue)
})
</script>