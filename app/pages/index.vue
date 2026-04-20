<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Invoice Generator</h1>

      <!-- <div class="space-x-4">
        <NuxtLink to="/login" class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Login
        </NuxtLink>
        <NuxtLink to="/register" class="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          Daftar
        </NuxtLink>
      </div> -->

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="overflow-y-auto max-h-screen pb-8">
          <InvoiceForm @saved="handleSaved" @pdf-generated="handlePDFGenerated" />
        </div>

        <!-- Preview Section -->
        <div class="sticky top-8 h-fit">
          <h2 class="text-xl font-semibold mb-4">Preview Invoice</h2>
          <InvoicePreview />
        </div>
      </div>
    </div>

    <div v-if="showNotification" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
      Invoice berhasil disimpan!
    </div>

    <ClientOnly>
      <PDFModal
        :visible="pdfModalVisible"
        :invoice-data="currentInvoiceData"
        :template="currentTemplate"
        :accent-color="currentAccentColor"
        @update:visible="pdfModalVisible = $event"
        @downloaded="handlePDFDownloaded"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const showNotification = ref(false)
const pdfModalVisible = ref(false)
const currentInvoiceData = ref(null)
let notificationTimeout: NodeJS.Timeout

const handleSaved = () => {
  showNotification.value = true
  if (notificationTimeout) clearTimeout(notificationTimeout)
  notificationTimeout = setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

const handlePDFGenerated = (invoiceData: any) => {
  currentInvoiceData.value = invoiceData
  currentTemplate.value = invoiceStore.selectedTemplate
  currentAccentColor.value = invoiceStore.templateAccentColor
  pdfModalVisible.value = true
}

const handlePDFDownloaded = (filename: string) => {
  console.log(`PDF downloaded successfully: ${filename}`)
  // Optional: Tampilkan notifikasi sukses download
}

const invoiceStore = useInvoiceStore()
const currentTemplate = ref<'classic' | 'modern' | 'minimal'>('classic')
const currentAccentColor = ref('#3b82f6')

// const authStore = useAuthStore()

// // Redirect ke dashboard jika sudah login
// onMounted(async () => {
//   await authStore.getCurrentUser()
//   if (authStore.isAuthenticated) {
//     navigateTo('/dashboard')
//   }
// })
</script>