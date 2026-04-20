<!-- components/InvoiceForm.vue -->
<template>
  <form @submit.prevent="handleSubmit" class="space-y-8">
    <!-- Business Information -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Informasi Bisnis</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nama Bisnis *</label>
          <input v-model="store.businessInfo.name" type="text" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email Bisnis *</label>
          <input v-model="store.businessInfo.email" type="email" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">No WhatsApp</label>
          <input v-model="store.businessInfo.whatsapp" type="tel"
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Nama Bank</label>
          <input v-model="store.businessInfo.bankName" type="text"
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">No Rekening</label>
          <input v-model="store.businessInfo.bankAccount" type="text"
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">Alamat Bisnis</label>
          <textarea v-model="store.businessInfo.address" rows="2"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </div>
    </div>

    <!-- Client Information -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Informasi Klien</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nama Klien *</label>
          <input v-model="store.clientInfo.name" type="text" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email Klien</label>
          <input v-model="store.clientInfo.email" type="email"
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">No WhatsApp Klien</label>
          <input v-model="store.clientInfo.whatsapp" type="tel"
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Nomor Invoice *</label>
          <input v-model="store.clientInfo.invoiceNumber" type="text" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Tanggal Terbit *</label>
          <input v-model="store.clientInfo.issueDate" type="date" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Tanggal Jatuh Tempo *</label>
          <input v-model="store.clientInfo.dueDate" type="date" required
                 class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">Alamat Klien</label>
          <textarea v-model="store.clientInfo.address" rows="2"
                    class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"></textarea>
        </div>
      </div>
    </div>

    <!-- Items -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Detail Item & Harga</h2>
        <button type="button" @click="store.addItem()"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          + Tambah Item
        </button>
      </div>
      
      <div class="space-y-4">
        <div v-for="(item, index) in store.items" :key="item.id"
             class="grid grid-cols-12 gap-3 items-start">
          <div class="col-span-5">
            <label class="block text-sm font-medium mb-1">Deskripsi</label>
            <input v-model="item.description" type="text" required
                   class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium mb-1">Jumlah</label>
            <input v-model.number="item.quantity" type="number" min="1" required
                   @input="store.updateItem(item.id, 'quantity', item.quantity)"
                   class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="col-span-3">
            <label class="block text-sm font-medium mb-1">Harga Satuan</label>
            <input v-model.number="item.unitPrice" type="number" min="0" required
                   @input="store.updateItem(item.id, 'unitPrice', item.unitPrice)"
                   class="w-full px-3 py-2 border rounded-lg">
          </div>
          <div class="col-span-1">
            <label class="block text-sm font-medium mb-1">Total</label>
            <div class="px-3 py-2 bg-gray-100 rounded-lg">
              {{ formatRupiah(item.quantity * item.unitPrice) }}
            </div>
          </div>
          <div class="col-span-1 pt-6">
            <button v-if="store.items.length > 1" type="button"
                    @click="store.removeItem(item.id)"
                    class="text-red-500 hover:text-red-700">
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Discount & Notes -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Diskon & Catatan</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Tipe Diskon</label>
          <select v-model="store.discountType"
                  class="w-full px-3 py-2 border rounded-lg">
            <option value="percentage">Persen (%)</option>
            <option value="amount">Rupiah (Rp)</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Nilai Diskon</label>
          <input v-model.number="store.discountValue" type="number" min="0"
                 class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Pajak (%)</label>
          <input v-model.number="store.taxRate" type="number" min="0" step="0.1"
                 class="w-full px-3 py-2 border rounded-lg">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">Catatan</label>
          <textarea v-model="store.notes" rows="3"
                    class="w-full px-3 py-2 border rounded-lg"
                    placeholder="Terima kasih atas kepercayaan Anda..."></textarea>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-4">
      <button type="button" @click="store.resetForm()"
              class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
        Reset
      </button>
      <button type="submit"
              :disabled="store.saving || !isFormValid"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50">
        {{ store.saving ? 'Menyimpan...' : 'Simpan Invoice' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore'

const props = withDefaults(defineProps<{
  mode?: 'create' | 'edit'
  invoiceId?: string
}>(), {
  mode: 'create',
  invoiceId: ''
})

const store = useInvoiceStore()
const emit = defineEmits(['saved', 'pdf-generated'])

// Test koneksi saat komponen dimuat
onMounted(async () => {
  const { testConnection } = useSupabase()
  await testConnection()
})

// Validasi form
const isFormValid = computed(() => {
  return store.businessInfo.name && 
         store.businessInfo.email &&
         store.clientInfo.name &&
         store.clientInfo.invoiceNumber &&
         store.items.every(item => item.description && item.quantity > 0 && item.unitPrice >= 0)
})

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    alert('Mohon lengkapi semua field yang wajib diisi!')
    return
  }

  let result: any
  const payload = store.formattedForDatabase

  if (props.mode === 'edit' && props.invoiceId) {
    result = await store.updateInvoice(props.invoiceId, payload)
  } else {
    result = await store.saveInvoice()
  }

  if (result.success) {
    const pdfData = {
      businessInfo: store.businessInfo,
      clientInfo: store.clientInfo,
      items: store.items,
      subtotal: store.subtotal,
      discountAmount: store.discountAmount,
      discountValue: store.discountValue,
      discountType: store.discountType,
      taxRate: store.taxRate,
      taxAmount: store.taxAmount,
      total: store.total,
      notes: store.notes
    }

    emit('saved', result.data)
    emit('pdf-generated', pdfData)

    if (props.mode === 'create') {
      store.resetForm()
    }
  } else {
    const errorMessage =
      typeof result.error === 'string'
        ? result.error
        : result.error?.message || 'Unknown error'
    alert(`Gagal menyimpan invoice: ${errorMessage}`)
  }
}
</script>