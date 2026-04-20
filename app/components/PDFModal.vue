<!-- components/PDFModal.vue -->
<template>
  <div v-if="visible" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="close"></div>
    
    <!-- Modal -->
    <div class="relative min-h-screen flex items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 border-b">
          <h3 class="text-lg font-semibold">Preview Invoice</h3>
          <button @click="close" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Content - PDF Preview Area -->
        <div class="p-4 overflow-y-auto max-h-[calc(90vh-120px)] bg-gray-50">
          <div ref="pdfContentRef" class="bg-white shadow-lg">
            <InvoicePDFPreview :invoice-data="invoiceData" />
          </div>
        </div>
        
        <!-- Footer -->
        <div class="flex justify-end space-x-3 p-4 border-t bg-gray-50">
          <button @click="close"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
            Tutup
          </button>
          <button @click="downloadPDF"
                  :disabled="isGenerating"
                  class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition">
            <span v-if="isGenerating" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
            <span v-else>Download PDF</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import html2pdf from 'html2pdf.js'
import InvoicePDFPreview from './InvoicePDFPreview.vue'

const props = defineProps<{
  visible: boolean
  invoiceData: any
}>()

const emit = defineEmits(['update:visible', 'downloaded'])

const pdfContentRef = ref<HTMLElement | null>(null)
const isGenerating = ref(false)

const filename = computed(() => {
  const invoiceNumber = props.invoiceData?.clientInfo?.invoiceNumber || 'invoice'
  return `${invoiceNumber}.pdf`
})

const close = () => {
  emit('update:visible', false)
}

const downloadPDF = async () => {
  if (!pdfContentRef.value) {
    console.error('PDF content element not found')
    alert('Gagal menghasilkan PDF: Konten tidak ditemukan')
    return
  }

  isGenerating.value = true

  try {
    // Konfigurasi html2pdf
    const element = pdfContentRef.value
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5], // margin in inches
      filename: filename.value,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    }

    // Generate dan download PDF
    await html2pdf().set(opt).from(element).save()
    
    emit('downloaded', filename.value)
    
    // Tutup modal setelah download sukses (opsional)
    setTimeout(() => {
      close()
    }, 1500)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Gagal menghasilkan PDF. Silakan coba lagi. Error: ' + (error as Error).message)
  } finally {
    isGenerating.value = false
  }
}

// Watch untuk debug
watch(() => props.visible, (newVal) => {
  if (newVal) {
    console.log('Modal opened with data:', props.invoiceData)
    // Pastikan konten sudah ready
    nextTick(() => {
      if (pdfContentRef.value) {
        console.log('PDF content element ready')
      } else {
        console.warn('PDF content element not found after modal open')
      }
    })
  }
})
</script>