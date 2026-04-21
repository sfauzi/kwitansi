<!-- pages/dashboard/index.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Invoice Generator</h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">
              Hi, {{ authStore.user?.user_metadata?.full_name || authStore.user?.email }}
            </span>
            <button @click="handleLogout" class="text-red-600 hover:text-red-700">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Daftar Invoice</h2>
        <NuxtLink to="/dashboard/create" 
                  class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          + Buat Invoice Baru
        </NuxtLink>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-gray-600 text-sm">Total Invoice</div>
          <div class="text-3xl font-bold">{{ invoiceStore.invoices.length }}</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-gray-600 text-sm">Total Pendapatan</div>
          <div class="text-3xl font-bold">{{ formatRupiah(totalRevenue) }}</div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="text-gray-600 text-sm">Invoice Bulan Ini</div>
          <div class="text-3xl font-bold">{{ thisMonthInvoices }}</div>
        </div>
      </div>

      <!-- Filter & Search -->
      <div class="bg-white rounded-lg shadow mb-6 p-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari invoice..."
            class="px-3 py-2 border rounded-lg"
          >
          <select v-model="sortBy" class="px-3 py-2 border rounded-lg">
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
            <option value="highest">Nilai Tertinggi</option>
            <option value="lowest">Nilai Terendah</option>
          </select>
          <div class="flex space-x-2">
            <button @click="refreshData" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="invoiceStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <p class="mt-2 text-gray-600">Memuat data...</p>
      </div>

      <!-- Invoices Table -->
      <div v-else class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">No. Invoice</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Klien</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jatuh Tempo</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="invoice in filteredAndSortedInvoices" :key="invoice.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {{ invoice.client_info.invoiceNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  {{ invoice.client_info.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  {{ formatDate(invoice.client_info.issueDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  {{ formatDate(invoice.client_info.dueDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold">
                  {{ formatRupiah(invoice.total) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <span :class="getStatusClass(invoice)">
                    {{ getStatus(invoice) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm space-x-2">
                  <button 
                    @click="viewInvoice(invoice.id)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </button>
                  <button 
                    @click="editInvoice(invoice)"
                    class="text-green-600 hover:text-green-800"
                  >
                    Edit
                  </button>
                  <button 
                    @click="confirmDelete(invoice)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
              <tr v-if="filteredAndSortedInvoices.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  Belum ada invoice. Buat invoice pertama Anda!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="showDeleteModal = false"></div>
      <div class="relative min-h-screen flex items-center justify-center p-4">
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 class="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
          <p class="text-gray-600 mb-6">
            Apakah Anda yakin ingin menghapus invoice <strong>{{ invoiceToDelete?.client_info?.invoiceNumber }}</strong>?
          </p>
          <div class="flex justify-end space-x-3">
            <button @click="showDeleteModal = false" class="px-4 py-2 bg-gray-300 rounded-lg">
              Batal
            </button>
            <button @click="deleteInvoice" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const invoiceStore = useInvoiceStore()
const router = useRouter()

// State
const searchQuery = ref('')
const sortBy = ref('newest')
const showDeleteModal = ref(false)
const invoiceToDelete = ref<any>(null)

// Computed
const getTotalPaidFromInvoice = (invoice: any) => {
  if (Array.isArray(invoice.payments)) {
    return invoice.payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0)
  }
  if (typeof invoice.remaining_balance === 'number') {
    return Math.max(0, (invoice.total || 0) - invoice.remaining_balance)
  }
  return 0
}

const getRemainingFromInvoice = (invoice: any) => {
  if (typeof invoice.remaining_balance === 'number') return Math.max(0, invoice.remaining_balance)
  return Math.max(0, (invoice.total || 0) - getTotalPaidFromInvoice(invoice))
}

const totalRevenue = computed(() => {
  // Pendapatan aktual = total pembayaran masuk
  return invoiceStore.invoices.reduce((sum, inv) => sum + getTotalPaidFromInvoice(inv), 0)
})

const thisMonthInvoices = computed(() => {
  const now = new Date()
  return invoiceStore.invoices.filter(inv => {
    const date = new Date(inv.created_at)
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
  }).length
})

const filteredAndSortedInvoices = computed(() => {
  let filtered = [...invoiceStore.invoices]
  
  // Filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(inv => 
      inv.client_info.invoiceNumber.toLowerCase().includes(query) ||
      inv.client_info.name.toLowerCase().includes(query) ||
      inv.client_info.email.toLowerCase().includes(query)
    )
  }
  
  // Sort
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      break
    case 'highest':
      filtered.sort((a, b) => b.total - a.total)
      break
    case 'lowest':
      filtered.sort((a, b) => a.total - b.total)
      break
  }
  
  return filtered
})

// Methods
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
    month: 'short',
    day: 'numeric'
  })
}

const getStatus = (invoice: any) => {
  const remaining = getRemainingFromInvoice(invoice)
  const totalPaid = getTotalPaidFromInvoice(invoice)

  if (remaining <= 0) return 'Lunas'
  if (invoice.payment_status === 'dp_paid') return 'DP Dibayar'
  if (totalPaid > 0) return 'Sebagian Dibayar'

  const dueDate = new Date(invoice.client_info.dueDate)
  const today = new Date()

  if (dueDate < today) return 'Jatuh Tempo'
  if (dueDate.toDateString() === today.toDateString()) return 'Hari Ini'
  return 'Belum Dibayar'
}

const getStatusClass = (invoice: any) => {
  const status = getStatus(invoice)
  if (status === 'Lunas') return 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800'
  if (status === 'DP Dibayar') return 'px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800'
  if (status === 'Sebagian Dibayar') return 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800'
  if (status === 'Jatuh Tempo') return 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800'
  if (status === 'Hari Ini') return 'px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800'
  return 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700'
}

const refreshData = async () => {
  await invoiceStore.fetchInvoices()
}

const viewInvoice = (id: string) => {
  router.push(`/dashboard/invoice/${id}`)
}

const editInvoice = (invoice: any) => {
  invoiceStore.loadInvoiceToForm(invoice)
  router.push(`/dashboard/edit/${invoice.id}`)
}

const confirmDelete = (invoice: any) => {
  invoiceToDelete.value = invoice
  showDeleteModal.value = true
}

const deleteInvoice = async () => {
  if (invoiceToDelete.value) {
    const result = await invoiceStore.deleteInvoice(invoiceToDelete.value.id)
    if (result.success) {
      showDeleteModal.value = false
      invoiceToDelete.value = null
      await refreshData()
    } else {
      alert('Gagal menghapus invoice')
    }
  }
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}

// Lifecycle
onMounted(async () => {
  await invoiceStore.fetchInvoices()
})
</script>