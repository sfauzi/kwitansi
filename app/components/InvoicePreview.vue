<!-- components/InvoicePreview.vue -->
<template>
  <div class="invoice-preview-container">
    <!-- Template Selector Card -->
    <div class="selector-card">
      <TemplateSelector
        v-model="store.selectedTemplate"
        :accent-color="store.templateAccentColor"
        @update:accentColor="store.setTemplateAccentColor"
      />
    </div>

    <!-- Dynamic Template Renderer -->
    <div class="preview-canvas">
      <component :is="currentTemplateComponent" :invoice-data="invoiceDataForTemplate"
        :primary-color="store.templateAccentColor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/stores/invoiceStore'
import TemplateClassic from './templates/TemplateClassic.vue'
import TemplateModern from './templates/TemplateModern.vue'
import TemplateMinimal from './templates/TemplateMinimal.vue'
import TemplateSelector from './TemplateSelector.vue'
import type { TemplateType } from '~/types/template'

const store = useInvoiceStore()

// Load template settings on mount
onMounted(() => {
  store.loadTemplateSettings()
})

// Dynamic component mapping
const templateComponents = {
  classic: TemplateClassic,
  modern: TemplateModern,
  minimal: TemplateMinimal
}

const currentTemplateComponent = computed(() => {
  return templateComponents[store.selectedTemplate as TemplateType] || TemplateClassic
})

// Prepare data for template
const invoiceDataForTemplate = computed(() => ({
  businessInfo: store.businessInfo,
  clientInfo: store.clientInfo,
  items: store.items,
  subtotal: store.subtotal,
  discountAmount: store.discountAmount,
  discountValue: store.discountValue,
  discountType: store.discountType,
  taxRate: store.taxRate,
  taxAmount: store.taxAmount,
  total: store.total,
  notes: store.notes
}))
</script>

<style scoped>
.invoice-preview-container {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.selector-card {
  background: #fff;
  border: 1px solid #E5EDFF;
  border-radius: 14px;
  padding: 1.25rem;
}

.preview-canvas {
  background: #fff;
  border: 1px solid #E5EDFF;
  border-radius: 14px;
  overflow: hidden;
  min-height: 400px;
}
</style>