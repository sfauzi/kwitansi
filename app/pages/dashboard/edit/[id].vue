<!-- pages/dashboard/edit/[id].vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <NuxtLink to="/dashboard" class="text-blue-600 hover:underline">
          ← Kembali ke Dashboard
        </NuxtLink>
        <h1 class="text-2xl font-bold mt-2">Edit Invoice</h1>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InvoiceForm
          mode="edit"
          :invoice-id="invoiceId"
          @saved="handleSaved"
          @pdf-generated="handlePDFGenerated"
        />
        <div>
          <h2 class="text-xl font-semibold mb-4">Preview Invoice</h2>
          <InvoicePreview />
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
const invoiceId = computed(() => route.params.id as string)

onMounted(async () => {
  await invoiceStore.fetchInvoiceById(invoiceId.value)
  if (invoiceStore.currentInvoice) {
    invoiceStore.loadInvoiceToForm(invoiceStore.currentInvoice)
  }
})

const handleSaved = () => {
  router.push('/dashboard')
}

const handlePDFGenerated = (invoiceData: any) => {
  // Handle PDF jika perlu
}
</script>