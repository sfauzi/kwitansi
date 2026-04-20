<!-- pages/create.vue (update) -->
<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-xl font-bold hover:text-blue-600">
            Invoice Generator
          </NuxtLink>
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">
            ← Kembali ke Dashboard
          </NuxtLink>
        </div>
      </div>
    </nav>
    
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-6">Buat Invoice Baru</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <InvoiceForm @saved="handleSaved" @pdf-generated="handlePDFGenerated" />
        </div>
        <div>
          <InvoicePreview />
        </div>
      </div>
    </div>
    
    <PDFModal
      :visible="pdfModalVisible"
      :invoice-data="currentInvoiceData"
      :template="currentTemplate"
      :accent-color="currentAccentColor"
      @update:visible="pdfModalVisible = $event"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const pdfModalVisible = ref(false)
const currentInvoiceData = ref(null)
const currentTemplate = ref('classic')
const currentAccentColor = ref('#3b82f6')
const invoiceStore = useInvoiceStore()

const handleSaved = () => {
  router.push('/')
}

const handlePDFGenerated = (invoiceData: any) => {
  currentInvoiceData.value = invoiceData
  currentTemplate.value = invoiceStore.selectedTemplate
  currentAccentColor.value = invoiceStore.templateAccentColor
  pdfModalVisible.value = true
}
</script>