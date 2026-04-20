<!-- pages/dashboard/create.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar />
    
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <NuxtLink to="/dashboard" class="text-blue-600 hover:underline">
          ← Kembali ke Dashboard
        </NuxtLink>
        <h1 class="text-2xl font-bold mt-2">Buat Invoice Baru</h1>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InvoiceForm @saved="handleSaved" @pdf-generated="handlePDFGenerated" />
        <div>
          <h2 class="text-xl font-semibold mb-4">Preview Invoice</h2>
          <InvoicePreview />
        </div>
      </div>
    </div>
    
    <PDFModal
      :visible="pdfModalVisible"
      :invoice-data="currentInvoiceData"
      @update:visible="pdfModalVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const pdfModalVisible = ref(false)
const currentInvoiceData = ref(null)

const handleSaved = () => {
  router.push('/dashboard')
}

const handlePDFGenerated = (invoiceData: any) => {
  currentInvoiceData.value = invoiceData
  pdfModalVisible.value = true
}
</script>