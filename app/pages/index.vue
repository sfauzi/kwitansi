<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-center mb-8">Invoice Generator</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Section -->
        <div class="overflow-y-auto max-h-screen pb-8">
          <InvoiceForm @saved="handleSaved" />
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
  </div>
</template>

<script setup lang="ts">
const showNotification = ref(false)
let notificationTimeout: NodeJS.Timeout

const handleSaved = () => {
  showNotification.value = true
  if (notificationTimeout) clearTimeout(notificationTimeout)
  notificationTimeout = setTimeout(() => {
    showNotification.value = false
  }, 3000)
}
</script>