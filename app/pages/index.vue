<!-- pages/index.vue -->
<template>
  <div class="kwitansi-app">
    <!-- Header -->
    <header class="kwitansi-header">
      <div class="header-inner">
        <div class="brand">
          <svg class="brand-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path d="M8 10h16M8 16h10M8 22h12" stroke="white" stroke-width="2" stroke-linecap="round" />
            <circle cx="24" cy="22" r="4" fill="white" />
            <path d="M22.5 22l1 1 2-2" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span class="brand-name">Kwitansi</span>
        </div>
        <span class="brand-tagline">© 2026 Powered by <a href="https://sfauzi.dev" target="_blank" rel="noopener noreferrer" class="font-Mansalva hover:underline">sfauzi.dev</a> </span>
      </div>
    </header>

    <!-- Main Content -->
    <main class="kwitansi-main">
      <div class="kwitansi-grid">
        <!-- Form Section -->
        <div class="form-section">
          <InvoiceForm @saved="handleSaved" @pdf-generated="handlePDFGenerated" />
        </div>

        <!-- Preview Section -->
        <div class="preview-section">
          <div class="preview-header">
            <span class="preview-label">Pratinjau Invoice</span>
            <span class="preview-badge">Live</span>
          </div>
          <InvoicePreview />
        </div>
      </div>
    </main>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="showNotification" class="kwitansi-toast">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" />
          <path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
        Invoice berhasil disimpan!
      </div>
    </Transition>

    <ClientOnly>
      <PDFModal :visible="pdfModalVisible" :invoice-data="currentInvoiceData" :template="currentTemplate"
        :accent-color="currentAccentColor" @update:visible="pdfModalVisible = $event"
        @downloaded="handlePDFDownloaded" />
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

<style scoped>
.kwitansi-app {
  min-height: 100vh;
  background: #F8FAFF;
  font-family: 'Inter', system-ui, sans-serif;
}

.kwitansi-header {
  background: #fff;
  border-bottom: 1px solid #E5EDFF;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;
}

.brand-tagline {
  font-size: 0.75rem;
  color: #6B7280;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.kwitansi-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.kwitansi-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

@media (max-width: 1024px) {
  .kwitansi-grid {
    grid-template-columns: 1fr;
  }
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.preview-section {
  position: sticky;
  top: 80px;
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.preview-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  letter-spacing: -0.01em;
}

.preview-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
  color: #16A34A;
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  padding: 2px 8px;
  border-radius: 100px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.preview-badge::before {
  content: '';
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #16A34A;
}

.kwitansi-toast {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background: #111827;
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>