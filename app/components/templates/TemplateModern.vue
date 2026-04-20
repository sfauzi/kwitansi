<!-- components/templates/TemplateModern.vue -->
<template>
  <div class="template-modern" :style="styleVariables">
    <!-- Header dengan gradient -->
    <div class="header-gradient text-white p-6 -mx-6 -mt-6 mb-6 rounded-b-lg">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-4xl font-bold tracking-tighter">INVOICE</h1>
          <p class="text-white text-opacity-90 mt-1">#{{ invoiceData.clientInfo.invoiceNumber }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold">{{ invoiceData.businessInfo.name }}</div>
          <div class="text-sm text-white text-opacity-90 mt-1">{{ invoiceData.businessInfo.email }}</div>
          <div v-if="invoiceData.businessInfo.whatsapp" class="text-sm text-white text-opacity-90">
            {{ invoiceData.businessInfo.whatsapp }}
          </div>
        </div>
      </div>
    </div>

    <!-- Client Info dengan card style -->
    <div class="grid grid-cols-2 gap-6 mb-8">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="font-bold text-primary mb-3 uppercase text-sm tracking-wide">Bill To:</h3>
        <div class="font-semibold text-lg">{{ invoiceData.clientInfo.name }}</div>
        <div class="text-gray-600">{{ invoiceData.clientInfo.email }}</div>
        <div v-if="invoiceData.clientInfo.whatsapp" class="text-gray-600">{{ invoiceData.clientInfo.whatsapp }}</div>
        <div class="text-gray-600">{{ invoiceData.clientInfo.address }}</div>
      </div>
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="flex justify-between py-2 border-b border-gray-200">
          <span class="font-semibold">Tanggal Terbit:</span>
          <span>{{ formatDate(invoiceData.clientInfo.issueDate) }}</span>
        </div>
        <div class="flex justify-between py-2">
          <span class="font-semibold">Jatuh Tempo:</span>
          <span>{{ formatDate(invoiceData.clientInfo.dueDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Items Table dengan style modern -->
    <div class="mb-8 overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-primary text-white">
            <th class="p-3 text-left rounded-l-lg">Deskripsi</th>
            <th class="p-3 text-right">Jumlah</th>
            <th class="p-3 text-right">Harga Satuan</th>
            <th class="p-3 text-right rounded-r-lg">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoiceData.items" :key="item.id" 
              :class="['border-b border-gray-200', index % 2 === 0 ? 'bg-white' : 'bg-gray-50']">
            <td class="p-3">{{ item.description }}</td>
            <td class="p-3 text-right">{{ item.quantity }}</td>
            <td class="p-3 text-right">{{ formatRupiah(item.unitPrice) }}</td>
            <td class="p-3 text-right font-semibold">{{ formatRupiah(item.quantity * item.unitPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary dengan card -->
    <div class="flex justify-end mb-8">
      <div class="w-80 bg-gray-50 rounded-lg p-4">
        <div class="flex justify-between py-2">
          <span>Subtotal</span>
          <span>{{ formatRupiah(invoiceData.subtotal) }}</span>
        </div>
        <div v-if="invoiceData.discountValue > 0" class="flex justify-between py-2 text-red-600">
          <span>Diskon ({{ discountDisplay }})</span>
          <span>- {{ formatRupiah(invoiceData.discountAmount) }}</span>
        </div>
        <div v-if="invoiceData.taxRate > 0" class="flex justify-between py-2">
          <span>Pajak ({{ invoiceData.taxRate }}%)</span>
          <span>{{ formatRupiah(invoiceData.taxAmount) }}</span>
        </div>
        <div class="flex justify-between py-3 mt-2 border-t-2 border-primary font-bold text-lg">
          <span>Total</span>
          <span class="text-primary">{{ formatRupiah(invoiceData.total) }}</span>
        </div>
      </div>
    </div>

    <!-- Bank Info dengan card -->
    <div v-if="invoiceData.businessInfo.bankName && invoiceData.businessInfo.bankAccount" 
         class="bg-blue-50 border-l-4 border-primary p-4 mb-4 rounded">
      <h3 class="font-bold text-primary mb-2">💳 Informasi Pembayaran</h3>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div>Bank:</div>
        <div class="font-semibold">{{ invoiceData.businessInfo.bankName }}</div>
        <div>No. Rekening:</div>
        <div class="font-semibold">{{ invoiceData.businessInfo.bankAccount }}</div>
        <div>Atas Nama:</div>
        <div class="font-semibold">{{ invoiceData.businessInfo.bankAccountName || invoiceData.businessInfo.name }}</div>
      </div>
    </div>

    <!-- Notes -->
    <div v-if="invoiceData.notes" class="bg-yellow-50 p-4 rounded-lg mb-4">
      <h3 class="font-bold text-yellow-800 mb-2">📝 Catatan:</h3>
      <p class="text-sm text-yellow-700">{{ invoiceData.notes }}</p>
    </div>

    <!-- Footer -->
    <div class="text-center text-sm text-gray-500 mt-8 pt-4 border-t border-gray-200">
      Thank you for your business!
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  invoiceData: any
  primaryColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  primaryColor: '#3b82f6'
})

const styleVariables = computed(() => ({
  '--primary-color': props.primaryColor
}))

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value || 0)
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

<style scoped>
.template-modern {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: white;
  padding: 24px;
}

.header-gradient {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%);
}

.text-primary {
  color: var(--primary-color);
}

.bg-primary {
  background-color: var(--primary-color);
}

.border-primary {
  border-color: var(--primary-color);
}
</style>