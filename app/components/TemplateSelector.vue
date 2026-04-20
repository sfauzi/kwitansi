<!-- components/TemplateSelector.vue -->
<template>
  <div class="template-selector">
    <p class="selector-label">Pilih Template</p>

    <div class="template-grid">
      <button v-for="template in templates" :key="template.id" type="button" @click="selectTemplate(template.id)"
        :class="['template-card', { 'template-card--active': modelValue === template.id }]">
        <!-- Thumbnail -->
        <div class="template-thumb" :style="{ '--thumb-color': getTemplateColor(template.id) }">
          <div class="thumb-header"></div>
          <div class="thumb-line thumb-line--wide"></div>
          <div class="thumb-line thumb-line--medium"></div>
          <div class="thumb-line thumb-line--narrow"></div>
          <div class="thumb-table">
            <div class="thumb-row" v-for="i in 3" :key="i"></div>
          </div>
        </div>

        <!-- Info -->
        <div class="template-info">
          <span class="template-name">{{ template.name }}</span>
          <span class="template-desc">{{ template.description }}</span>
        </div>

        <!-- Active check -->
        <div v-if="modelValue === template.id" class="template-check">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" stroke-width="1.75" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </button>
    </div>

    <!-- Color Picker (untuk template modern) -->
    <div v-if="modelValue === 'modern'" class="color-picker">
      <p class="color-picker-label">Warna Aksen</p>
      <div class="color-options">
        <button v-for="color in accentColors" :key="color.value" type="button" @click="selectColor(color.value)"
          :class="['color-swatch', { 'color-swatch--active': selectedColor === color.value }]"
          :style="{ '--swatch-color': color.value }" :title="color.name">
          <span class="color-swatch-inner"></span>
          <svg v-if="selectedColor === color.value" class="color-check" width="10" height="10" viewBox="0 0 10 10"
            fill="none">
            <path d="M1.5 5l2.5 2.5L8.5 2" stroke="white" stroke-width="1.75" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
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

const selectColor = (color: string) => {
  selectedColor.value = color
}

const getTemplateColor = (templateId: TemplateType) => {
  const colors: Record<TemplateType, string> = {
    classic: '#2563eb',
    modern: '#3b82f6',
    minimal: '#6b7280'
  }

  return colors[templateId]
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

<style scoped>
.template-selector {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.selector-label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
  letter-spacing: -0.005em;
}

/* Grid */
.template-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
}

/* Template Card */
.template-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0.75rem;
  background: #FAFAFA;
  border: 1.5px solid #E5E7EB;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  font-family: inherit;
}

.template-card:hover {
  border-color: #93C5FD;
  background: #F0F7FF;
}

.template-card--active {
  border-color: #2563EB;
  background: #EFF6FF;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Thumbnail */
.template-thumb {
  height: 56px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
}

.thumb-header {
  height: 8px;
  background: var(--thumb-color, #2563EB);
  border-radius: 3px;
  opacity: 0.9;
}

.thumb-line {
  height: 4px;
  background: #E5E7EB;
  border-radius: 2px;
}

.thumb-line--wide {
  width: 80%;
}

.thumb-line--medium {
  width: 60%;
}

.thumb-line--narrow {
  width: 40%;
}

.thumb-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
}

.thumb-row {
  height: 3px;
  background: #F3F4F6;
  border-radius: 1px;
}

/* Info */
.template-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.template-name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.01em;
}

.template-desc {
  font-size: 0.6875rem;
  color: #9CA3AF;
}

/* Check badge */
.template-check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 18px;
  height: 18px;
  background: #2563EB;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Color Picker */
.color-picker {
  padding-top: 0.875rem;
  border-top: 1px solid #F3F4F6;
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.color-picker-label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6B7280;
  margin: 0;
  flex-shrink: 0;
}

.color-options {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.color-swatch {
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  background: transparent;
}

.color-swatch--active {
  border-color: var(--swatch-color);
}

.color-swatch-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--swatch-color);
  display: block;
}

.color-check {
  position: absolute;
}
</style>