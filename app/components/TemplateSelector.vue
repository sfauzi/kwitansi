<!-- components/TemplateSelector.vue -->
<template>
  <div class="template-selector">
    <label class="block text-sm font-medium mb-2">Pilih Template Invoice</label>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div 
        v-for="template in templates" 
        :key="template.id"
        @click="selectTemplate(template.id)"
        :class="[
          'border-2 rounded-lg p-4 cursor-pointer transition-all',
          selectedTemplate === template.id 
            ? 'border-blue-500 bg-blue-50 shadow-md' 
            : 'border-gray-200 hover:border-gray-300 hover:shadow'
        ]"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="text-3xl">{{ template.icon }}</div>
          <div v-if="selectedTemplate === template.id" class="text-blue-500">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        <h3 class="font-semibold text-lg mb-1">{{ template.name }}</h3>
        <p class="text-sm text-gray-600">{{ template.description }}</p>
        
        <!-- Preview mini -->
        <div class="mt-3 h-16 bg-gray-100 rounded overflow-hidden">
          <div class="w-full h-full flex items-center justify-center text-2xl">
            {{ getTemplatePreview(template.id) }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Color Picker untuk template modern -->
    <div v-if="selectedTemplate === 'modern'" class="mt-4">
      <label class="block text-sm font-medium mb-2">Warna Aksen</label>
      <div class="flex space-x-2">
        <button 
          v-for="color in accentColors" 
          :key="color.value"
          @click="selectedColor = color.value"
          :class="[
            'w-8 h-8 rounded-full border-2',
            selectedColor === color.value ? 'border-gray-800 scale-110' : 'border-gray-300'
          ]"
          :style="{ backgroundColor: color.value }"
          :title="color.name"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { templates, type TemplateType } from '~/types/template'

const props = defineProps<{
  modelValue: TemplateType
  accentColor?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: TemplateType]
  'update:accentColor': [value: string]
}>()

const selectedTemplate = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectedColor = computed({
  get: () => props.accentColor || '#3b82f6',
  set: (value) => emit('update:accentColor', value)
})

const accentColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Orange', value: '#f59e0b' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Teal', value: '#14b8a6' }
]

const selectTemplate = (templateId: TemplateType) => {
  selectedTemplate.value = templateId
}

const getTemplatePreview = (templateId: string) => {
  const previews = {
    classic: '📄',
    modern: '✨',
    minimal: '🎨'
  }
  return previews[templateId as keyof typeof previews] || '📄'
}
</script>