<!-- components/templates/TemplateClassic.vue -->
<template>
  <div class="template-classic" :style="styleVariables">

    <!-- Header -->
    <div class="border-b-4 border-double border-gray-800 pb-4 mb-6">
      <div class="flex justify-between items-start">
        <div>
          <h1 class="text-3xl font-bold text-gray-800 tracking-wide">INVOICE</h1>
          <p class="text-gray-600 mt-1">No: {{ invoiceData.clientInfo.invoiceNumber }}</p>
        </div>
        <div class="text-right">
          <div class="text-xl font-bold text-gray-800">{{ invoiceData.businessInfo.name }}</div>
          <div class="text-sm text-gray-600 mt-1">{{ invoiceData.businessInfo.email }}</div>
          <div v-if="invoiceData.businessInfo.whatsapp" class="text-sm text-gray-600">
            Telp: {{ invoiceData.businessInfo.whatsapp }}
          </div>
          <div class="text-sm text-gray-600">{{ invoiceData.businessInfo.address }}</div>
        </div>
      </div>
    </div>

    <!-- Client Info -->
    <div class="grid grid-cols-2 gap-6 mb-8">
      <div class="border border-gray-300 p-4">
        <h3 class="font-bold text-gray-700 uppercase text-sm mb-2">Kepada Yth:</h3>
        <div class="font-semibold">{{ invoiceData.clientInfo.name }}</div>
        <div class="text-sm text-gray-600">{{ invoiceData.clientInfo.email }}</div>
        <div v-if="invoiceData.clientInfo.whatsapp" class="text-sm text-gray-600">
          Telp: {{ invoiceData.clientInfo.whatsapp }}
        </div>
        <div class="text-sm text-gray-600">{{ invoiceData.clientInfo.address }}</div>
      </div>
      <div class="border border-gray-300 p-4">
        <div class="flex justify-between mb-2">
          <span class="font-semibold">Tanggal Terbit:</span>
          <span>{{ formatDate(invoiceData.clientInfo.issueDate) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-semibold">Jatuh Tempo:</span>
          <span>{{ formatDate(invoiceData.clientInfo.dueDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Items Table -->
    <div class="mb-8">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-800 text-white">
            <th class="border border-gray-800 p-3 text-left">Deskripsi</th>
            <th class="border border-gray-800 p-3 text-right">Jumlah</th>
            <th class="border border-gray-800 p-3 text-right">Harga Satuan</th>
            <th class="border border-gray-800 p-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoiceData.items" :key="item.id" class="hover:bg-gray-50">
            <td class="border border-gray-300 p-3">{{ item.description }}</td>
            <td class="border border-gray-300 p-3 text-right">{{ item.quantity }}</td>
            <td class="border border-gray-300 p-3 text-right">{{ formatRupiah(item.unitPrice) }}</td>
            <td class="border border-gray-300 p-3 text-right">{{ formatRupiah(item.quantity * item.unitPrice) }}</td>
          </tr>
        </tbody>
        <tfoot class="bg-gray-100">
          <tr>
            <td colspan="3" class="border border-gray-300 p-3 text-right font-semibold">Subtotal</td>
            <td class="border border-gray-300 p-3 text-right">{{ formatRupiah(invoiceData.subtotal) }}</td>
          </tr>
          <tr v-if="invoiceData.discountValue > 0">
            <td colspan="3" class="border border-gray-300 p-3 text-right font-semibold text-red-600">
              Diskon ({{ discountDisplay }})
            </td>
            <td class="border border-gray-300 p-3 text-right text-red-600">- {{ formatRupiah(invoiceData.discountAmount) }}</td>
          </tr>
          <tr v-if="invoiceData.taxRate > 0">
            <td colspan="3" class="border border-gray-300 p-3 text-right font-semibold">Pajak ({{ invoiceData.taxRate }}%)</td>
            <td class="border border-gray-300 p-3 text-right">{{ formatRupiah(invoiceData.taxAmount) }}</td>
          </tr>
          <tr class="bg-gray-800 text-white">
            <td colspan="3" class="border border-gray-800 p-3 text-right font-bold text-lg">Total</td>
            <td class="border border-gray-800 p-3 text-right font-bold text-lg">{{ formatRupiah(invoiceData.total) }}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- ── Payment Status ── -->
    <div v-if="invoiceData.payments && invoiceData.payments.length > 0"
         class="border-t-2 border-gray-300 pt-5 mb-6">
      <h3 class="font-bold text-gray-700 mb-3">Data Pembayaran</h3>

      <!-- Tabel riwayat -->
      <table class="w-full border-collapse mb-4">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 p-2 text-left text-sm font-semibold text-gray-700 w-10">No</th>
            <th class="border border-gray-300 p-2 text-left text-sm font-semibold text-gray-700">Tanggal</th>
            <th class="border border-gray-300 p-2 text-left text-sm font-semibold text-gray-700">Keterangan</th>
            <th class="border border-gray-300 p-2 text-right text-sm font-semibold text-gray-700">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in invoiceData.payments" :key="payment.id">
            <td class="border border-gray-200 p-2 text-sm text-gray-600">{{ Number(index) + 1 }}</td>
            <td class="border border-gray-200 p-2 text-sm text-gray-600">{{ formatDateTime(payment.paymentDate) }}</td>
            <td class="border border-gray-200 p-2 text-sm text-gray-600">
              {{ payment.type === 'dp' ? 'Down Payment' : 'Pelunasan' }}
              <span v-if="payment.notes" class="text-gray-400"> · {{ payment.notes }}</span>
            </td>
            <td class="border border-gray-200 p-2 text-sm text-right text-gray-800">{{ formatRupiah(payment.amount) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Summary kanan bawah -->
      <div class="flex justify-end">
        <div class="w-72">
          <div class="flex justify-between text-sm py-1 border-b border-gray-200">
            <span class="text-gray-600">Jumlah Bayar</span>
            <span class="font-bold text-gray-800">{{ formatRupiah(getTotalPaid()) }}</span>
          </div>
          <div class="flex justify-between text-sm py-1 border-b border-gray-200">
            <span class="text-gray-600">Discount</span>
            <span class="font-bold text-gray-800">{{ formatRupiah(invoiceData.discountAmount || 0) }}</span>
          </div>
          <div class="flex justify-between text-sm py-2">
            <span class="text-gray-600">Kurang</span>
            <span class="font-bold" :class="getRemainingBalance() > 0 ? 'text-red-600' : 'text-green-600'">
              {{ getRemainingBalance() > 0 ? formatRupiah(getRemainingBalance()) : formatRupiah(0) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bank Info -->
    <div v-if="invoiceData.businessInfo.bankName && invoiceData.businessInfo.bankAccount"
         class="border-t-2 border-gray-300 pt-4 mb-4">
      <h3 class="font-bold text-gray-700 mb-2">Informasi Pembayaran:</h3>
      <div class="grid grid-cols-2 gap-2 text-sm">
        <div>Bank:</div>
        <div>{{ invoiceData.businessInfo.bankName }}</div>
        <div>No. Rekening:</div>
        <div>{{ invoiceData.businessInfo.bankAccount }}</div>
        <div>Atas Nama:</div>
        <div>{{ invoiceData.businessInfo.bankAccountName || invoiceData.businessInfo.name }}</div>
      </div>
    </div>

    <!-- Notes -->
    <div v-if="invoiceData.notes" class="border-t-2 border-gray-300 pt-4">
      <h3 class="font-bold text-gray-700 mb-2">Catatan:</h3>
      <p class="text-sm text-gray-600 italic">{{ invoiceData.notes }}</p>
    </div>

    <!-- Footer -->
    <div class="text-center text-sm text-gray-500 mt-8 pt-4 border-t-2 border-gray-300">
      Terima kasih atas kepercayaan Anda
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  invoiceData: any
  primaryColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  primaryColor: '#1f2937'
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
  return (props.invoiceData?.payments || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
}

const getRemainingBalance = () => {
  return Math.max(0, (props.invoiceData?.total || 0) - getTotalPaid())
}
</script>

<style scoped>
.template-classic {
  font-family: 'Times New Roman', Times, serif;
  background: white;
  padding: 20px;
}
</style>