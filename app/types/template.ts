// types/template.ts
export type TemplateType = 'classic' | 'modern' | 'minimal'

export interface Template {
  id: TemplateType
  name: string
  description: string
  previewImage: string
  icon: string
}

export const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Template klasik dengan tampilan formal dan profesional',
    previewImage: '/templates/classic-preview.png',
    icon: '📄'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Template modern dengan desain bold dan warna aksen',
    previewImage: '/templates/modern-preview.png',
    icon: '✨'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Template minimalis dengan fokus pada konten',
    previewImage: '/templates/minimal-preview.png',
    icon: '🎨'
  }
]