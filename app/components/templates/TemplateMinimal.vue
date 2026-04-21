<!-- components/templates/TemplateMinimal.vue -->
<template>
  <div class="template-minimal" :style="styleVariables">

    <!-- Header minimal -->
    <div class="border-b border-gray-200 pb-6 mb-6">
      <div class="flex justify-between items-start">
        <div>
          <div class="text-sm text-gray-500 mb-1">INVOICE</div>
          <div class="text-2xl font-light">{{ invoiceData.clientInfo.invoiceNumber }}</div>
        </div>
        <div class="text-right">
          <div class="text-xl font-light">{{ invoiceData.businessInfo.name }}</div>
          <div class="text-xs text-gray-500 mt-1">{{ invoiceData.businessInfo.email }}</div>
          <div v-if="invoiceData.businessInfo.whatsapp" class="text-xs text-gray-500">
            {{ invoiceData.businessInfo.whatsapp }}
          </div>
        </div>
      </div>
    </div>

    <!-- Client Info minimal -->
    <div class="grid grid-cols-2 gap-6 mb-8">
      <div>
        <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Kepada</div>
        <div class="font-medium">{{ invoiceData.clientInfo.name }}</div>
        <div class="text-sm text-gray-600">{{ invoiceData.clientInfo.email }}</div>
        <div v-if="invoiceData.clientInfo.whatsapp" class="text-sm text-gray-600">{{ invoiceData.clientInfo.whatsapp }}</div>
        <div class="text-sm text-gray-600">{{ invoiceData.clientInfo.address }}</div>
      </div>
      <div>
        <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Detail</div>
        <div class="flex justify-between text-sm py-1">
          <span class="text-gray-600">Tanggal Terbit:</span>
          <span>{{ formatDate(invoiceData.clientInfo.issueDate) }}</span>
        </div>
        <div class="flex justify-between text-sm py-1">
          <span class="text-gray-600">Jatuh Tempo:</span>
          <span>{{ formatDate(invoiceData.clientInfo.dueDate) }}</span>
        </div>
      </div>
    </div>

    <!-- Items Table minimal -->
    <div class="mb-8">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Deskripsi</th>
            <th class="py-3 text-right text-xs font-normal text-gray-500 uppercase tracking-wider">Jumlah</th>
            <th class="py-3 text-right text-xs font-normal text-gray-500 uppercase tracking-wider">Harga</th>
            <th class="py-3 text-right text-xs font-normal text-gray-500 uppercase tracking-wider">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in invoiceData.items" :key="item.id" class="border-b border-gray-100">
            <td class="py-3 text-sm">{{ item.description }}</td>
            <td class="py-3 text-sm text-right">{{ item.quantity }}</td>
            <td class="py-3 text-sm text-right">{{ formatRupiah(item.unitPrice) }}</td>
            <td class="py-3 text-sm text-right">{{ formatRupiah(item.quantity * item.unitPrice) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Summary minimal -->
    <div class="flex justify-end mb-8">
      <div class="w-72">
        <div class="flex justify-between text-sm py-2">
          <span class="text-gray-600">Subtotal</span>
          <span>{{ formatRupiah(invoiceData.subtotal) }}</span>
        </div>
        <div v-if="invoiceData.discountValue > 0" class="flex justify-between text-sm py-2 text-gray-500">
          <span>Diskon ({{ discountDisplay }})</span>
          <span>- {{ formatRupiah(invoiceData.discountAmount) }}</span>
        </div>
        <div v-if="invoiceData.taxRate > 0" class="flex justify-between text-sm py-2">
          <span class="text-gray-600">Pajak ({{ invoiceData.taxRate }}%)</span>
          <span>{{ formatRupiah(invoiceData.taxAmount) }}</span>
        </div>
        <div class="flex justify-between pt-3 mt-2 border-t border-gray-300 font-medium">
          <span>Total</span>
          <span>{{ formatRupiah(invoiceData.total) }}</span>
        </div>
      </div>
    </div>

    <!-- ── Payment Status ── -->
    <div v-if="invoiceData.payments && invoiceData.payments.length > 0"
         class="border-t border-gray-200 pt-5 mb-6">
      <div class="text-xs text-gray-500 uppercase tracking-wider mb-3">Data Pembayaran</div>

      <!-- Tabel riwayat -->
      <table class="w-full mb-4">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="py-2 text-left text-sm font-semibold text-gray-700 w-8">No</th>
            <th class="py-2 text-left text-sm font-semibold text-gray-700">Tanggal</th>
            <th class="py-2 text-left text-sm font-semibold text-gray-700">Keterangan</th>
            <th class="py-2 text-right text-sm font-semibold text-gray-700">Jumlah</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in invoiceData.payments" :key="payment.id"
              class="border-b border-gray-100">
            <td class="py-2 text-sm text-gray-600">{{ Number(index) + 1 }}</td>
            <td class="py-2 text-sm text-gray-600">{{ formatDateTime(payment.paymentDate) }}</td>
            <td class="py-2 text-sm text-gray-600">
              {{ payment.type === 'dp' ? 'Down Payment' : 'Pelunasan' }}
              <span v-if="payment.notes" class="text-gray-400"> · {{ payment.notes }}</span>
            </td>
            <td class="py-2 text-sm text-right text-gray-800">{{ formatRupiah(payment.amount) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Summary kanan bawah -->
      <div class="flex justify-end">
        <div class="w-72">
          <div class="flex justify-between text-sm py-1 border-b border-gray-100">
            <span class="text-gray-500">Jumlah Bayar</span>
            <span class="font-semibold text-gray-800">{{ formatRupiah(getTotalPaid()) }}</span>
          </div>
          <div class="flex justify-between text-sm py-1 border-b border-gray-100">
            <span class="text-gray-500">Discount</span>
            <span class="font-semibold text-gray-800">{{ formatRupiah(invoiceData.discountAmount || 0) }}</span>
          </div>
          <div class="flex justify-between text-sm py-2">
            <span class="text-gray-500">Kurang</span>
            <span class="font-bold" :class="getRemainingBalance() > 0 ? 'text-red-600' : 'text-green-600'">
              {{ getRemainingBalance() > 0 ? formatRupiah(getRemainingBalance()) : formatRupiah(0) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bank Info minimal -->
    <div v-if="invoiceData.businessInfo.bankName && invoiceData.businessInfo.bankAccount"
         class="text-sm border-t border-gray-200 pt-4 mb-4">
      <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Informasi Pembayaran</div>
      <div class="grid grid-cols-2 gap-1">
        <div class="text-gray-600">Bank:</div>
        <div>{{ invoiceData.businessInfo.bankName }}</div>
        <div class="text-gray-600">No. Rekening:</div>
        <div>{{ invoiceData.businessInfo.bankAccount }}</div>
        <div class="text-gray-600">Atas Nama:</div>
        <div>{{ invoiceData.businessInfo.bankAccountName || invoiceData.businessInfo.name }}</div>
      </div>
    </div>

    <!-- Notes minimal -->
    <div v-if="invoiceData.notes" class="text-sm border-t border-gray-200 pt-4">
      <div class="text-xs text-gray-500 uppercase tracking-wider mb-2">Catatan</div>
      <p class="text-gray-600">{{ invoiceData.notes }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  invoiceData: any
  primaryColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  primaryColor: '#000000'
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
  if (typeof props.invoiceData?.totalPaid === 'number') {
    return props.invoiceData.totalPaid
  }

  return (props.invoiceData?.payments || []).reduce(
    (sum: number, payment: any) => sum + (Number(payment.amount) || 0),
    0
  )
}

const getRemainingBalance = () => {
  if (typeof props.invoiceData?.remainingBalance === 'number') {
    return Math.max(0, props.invoiceData.remainingBalance)
  }

  return Math.max(0, (Number(props.invoiceData?.total) || 0) - getTotalPaid())
}
</script>

<style scoped>
.template-minimal {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  background: white;
  padding: 20px;
}
</style>