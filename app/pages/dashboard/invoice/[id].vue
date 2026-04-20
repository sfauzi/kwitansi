<!-- pages/dashboard/invoice/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <NuxtLink to="/dashboard" class="text-blue-600 hover:underline">
            ← Kembali ke Dashboard
          </NuxtLink>
          <h1 class="text-2xl font-bold mt-2">Detail Invoice</h1>
        </div>
        <div class="space-x-2">
          <button 
            @click="downloadPDF" 
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Download PDF
          </button>
          <button 
            @click="editInvoice" 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Edit Invoice
          </button>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <InvoicePDFPreview v-if="invoice" :invoice-data="invoiceDataForPreview" />
        <div v-else class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p class="mt-2">Memuat data...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const invoiceStore = useInvoiceStore()
const invoice = ref<any>(null)

const invoiceDataForPreview = computed(() => {
  if (!invoice.value) return null
  return {
    businessInfo: invoice.value.business_info,
    clientInfo: invoice.value.client_info,
    items: invoice.value.items,
    subtotal: invoice.value.subtotal,
    discountAmount: invoice.value.discount_amount,
    discountValue: invoice.value.discount_value,
    discountType: invoice.value.discount_type,
    taxRate: invoice.value.tax_rate,
    taxAmount: invoice.value.tax_amount,
    total: invoice.value.total,
    notes: invoice.value.notes
  }
})

const downloadPDF = async () => {
  // Implementasi download PDF dari detail
  const element = document.querySelector('.invoice-pdf') as HTMLElement
  if (element) {
    const html2pdf = (await import('html2pdf.js')).default
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${invoice.value.client_info.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }
    await html2pdf().set(opt).from(element).save()
  }
}

const editInvoice = () => {
  invoiceStore.loadInvoiceToForm(invoice.value)
  router.push(`/dashboard/edit/${route.params.id}`)
}

onMounted(async () => {
  const id = route.params.id as string
  const result = await invoiceStore.fetchInvoiceById(id)
  if (result.success) {
    invoice.value = result.data
  } else {
    alert('Invoice tidak ditemukan')
    router.push('/dashboard')
  }
})
</script>