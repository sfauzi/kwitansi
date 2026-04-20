<!-- components/InvoicePreview.vue -->
<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="border-b pb-4 mb-4">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-bold mb-2">INVOICE</h2>
          <p class="text-gray-600">No: {{ store.clientInfo.invoiceNumber }}</p>
        </div>
        <div class="text-right">
          <p class="font-semibold">{{ store.businessInfo.name }}</p>
          <p class="text-sm text-gray-600">{{ store.businessInfo.email }}</p>
          <p class="text-sm text-gray-600">{{ store.businessInfo.whatsapp }}</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-6">
      <div>
        <h3 class="font-semibold mb-2">Kepada Yth:</h3>
        <p>{{ store.clientInfo.name }}</p>
        <p class="text-sm text-gray-600">{{ store.clientInfo.email }}</p>
        <p class="text-sm text-gray-600">{{ store.clientInfo.whatsapp }}</p>
        <p class="text-sm text-gray-600">{{ store.clientInfo.address }}</p>
      </div>
      <div class="text-right">
        <p><span class="font-semibold">Tanggal Terbit:</span> {{ formatDate(store.clientInfo.issueDate) }}</p>
        <p><span class="font-semibold">Jatuh Tempo:</span> {{ formatDate(store.clientInfo.dueDate) }}</p>
      </div>
    </div>

    <div class="overflow-x-auto mb-6">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100">
            <th class="border p-2 text-left">Deskripsi</th>
            <th class="border p-2 text-right">Jumlah</th>
            <th class="border p-2 text-right">Harga Satuan</th>
            <th class="border p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.items" :key="item.id">
            <td class="border p-2">{{ item.description }}</td>
            <td class="border p-2 text-right">{{ item.quantity }}</td>
            <td class="border p-2 text-right">{{ formatRupiah(item.unitPrice) }}</td>
            <td class="border p-2 text-right">{{ formatRupiah(item.quantity * item.unitPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="space-y-2 mb-6">
      <div class="flex justify-end">
        <div class="w-64 space-y-1">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>{{ formatRupiah(store.subtotal) }}</span>
          </div>
          <div v-if="store.discountValue > 0" class="flex justify-between text-red-600">
            <span>Diskon ({{ store.discountType === 'percentage' ? store.discountValue + '%' : formatRupiah(store.discountValue) }}):</span>
            <span>- {{ formatRupiah(store.discountAmount) }}</span>
          </div>
          <div v-if="store.taxRate > 0" class="flex justify-between">
            <span>Pajak ({{ store.taxRate }}%):</span>
            <span>{{ formatRupiah(store.taxAmount) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>{{ formatRupiah(store.total) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="store.businessInfo.bankName && store.businessInfo.bankAccount" class="border-t pt-4 mb-4">
      <h3 class="font-semibold mb-2">Informasi Pembayaran:</h3>
      <p>Bank: {{ store.businessInfo.bankName }}</p>
      <p>No. Rekening: {{ store.businessInfo.bankAccount }}</p>
      <p>Atas Nama: {{ store.businessInfo.name }}</p>
    </div>

    <div v-if="store.notes" class="border-t pt-4">
      <h3 class="font-semibold mb-2">Catatan:</h3>
      <p class="text-sm text-gray-600">{{ store.notes }}</p>
    </div>

    <div class="text-center text-sm text-gray-500 mt-6">
      Terima kasih atas kepercayaan Anda
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore'

const store = useInvoiceStore()

const formatRupiah = (value: number) => {
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
</script>