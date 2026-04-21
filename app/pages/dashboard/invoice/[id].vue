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
        <div ref="pdfContentRef" class="bg-white shadow-lg">
          <component
            v-if="invoice"
            :is="currentTemplateComponent"
            :invoice-data="invoiceDataForPreview"
            :primary-color="selectedAccentColor"
          />
          <div v-else class="text-center py-12">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p class="mt-2">Memuat data...</p>
          </div>
        </div>
      </div>

      <!-- hidden export canvas: struktur disamakan dengan PDFModal agar hasil spacing identik -->
      <div class="fixed -left-[99999px] top-0 w-[1024px] pointer-events-none" aria-hidden="true">
        <div class="p-4 bg-gray-50">
          <div ref="pdfExportRef" class="bg-white shadow-lg">
            <component
              v-if="invoice"
              :is="currentTemplateComponent"
              :invoice-data="invoiceDataForPreview"
              :primary-color="selectedAccentColor"
            />
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

import TemplateClassic from '~/components/templates/TemplateClassic.vue'
import TemplateModern from '~/components/templates/TemplateModern.vue'
import TemplateMinimal from '~/components/templates/TemplateMinimal.vue'
import type { TemplateType } from '~/types/template'

const route = useRoute()
const router = useRouter()
const invoiceStore = useInvoiceStore()
const invoice = ref<any>(null)
const pdfContentRef = ref<HTMLElement | null>(null)
const pdfExportRef = ref<HTMLElement | null>(null)

const templateComponents = {
  classic: TemplateClassic,
  modern: TemplateModern,
  minimal: TemplateMinimal
}

const selectedTemplate = computed<TemplateType>(() => {
  return (invoice.value?.selected_template || 'classic') as TemplateType
})

const selectedAccentColor = computed(() => {
  return invoice.value?.template_accent_color || '#3b82f6'
})

const currentTemplateComponent = computed(() => {
  return templateComponents[selectedTemplate.value] || TemplateClassic
})

const toNumber = (value: unknown, fallback = 0) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

const invoiceDataForPreview = computed(() => {
  if (!invoice.value) return null

  const rawPayments = Array.isArray(invoice.value.payments) ? invoice.value.payments : []
  const payments = rawPayments.map((p: any, idx: number) => ({
    id: String(p?.id ?? `${idx}`),
    amount: toNumber(p?.amount),
    type: p?.type === 'dp' ? 'dp' : 'payment',
    paymentDate: p?.paymentDate || p?.payment_date || p?.createdAt || p?.created_at || '',
    notes: p?.notes || ''
  }))

  const subtotal = toNumber(invoice.value.subtotal)
  const discountAmount = toNumber(invoice.value.discount_amount)
  const discountValue = toNumber(invoice.value.discount_value)
  const taxRate = toNumber(invoice.value.tax_rate)
  const taxAmount = toNumber(invoice.value.tax_amount)
  const total = toNumber(invoice.value.total)

  const totalPaid = payments.reduce((sum: number, p: any) => sum + toNumber(p.amount), 0)
  const remainingBalance =
    typeof invoice.value.remaining_balance === 'number'
      ? Math.max(0, toNumber(invoice.value.remaining_balance))
      : Math.max(0, total - totalPaid)

  const paymentStatus =
    invoice.value.payment_status ||
    (totalPaid <= 0 ? 'unpaid' : totalPaid >= total ? 'paid' : 'partial')

  return {
    businessInfo: invoice.value.business_info,
    clientInfo: invoice.value.client_info,
    items: (invoice.value.items || []).map((item: any) => ({
      ...item,
      quantity: toNumber(item?.quantity),
      unitPrice: toNumber(item?.unitPrice),
      total: toNumber(item?.total)
    })),
    subtotal,
    discountAmount,
    discountValue,
    discountType: invoice.value.discount_type,
    taxRate,
    taxAmount,
    total,
    notes: invoice.value.notes,

    // penting agar semua template menampilkan histori + status yang sama
    payments,
    totalPaid,
    remainingBalance,
    paymentStatus
  }
})

const downloadPDF = async () => {
  const element = pdfExportRef.value || pdfContentRef.value
  if (element) {
    const html2pdf = (await import('html2pdf.js')).default
    const filename =
      invoiceDataForPreview.value?.clientInfo?.invoiceNumber ||
      invoice.value?.client_info?.invoiceNumber ||
      'invoice'

    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
      filename: `${filename}.pdf`,
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { unit: 'in' as const, format: 'a4' as const, orientation: 'portrait' as const }
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