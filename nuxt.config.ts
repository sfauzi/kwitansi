// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    // preset: "static"
    preset: 'node-server'
  },
  css: ['~/assets/css/kwitansi.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  supabase: {
    redirect: false // 🔑 MATIkan auto-redirect ke /login
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo-kwitansi.svg' },
        { rel: 'apple-touch-icon', href: '/logo-kwitansi.svg' },
      ],
      titleTemplate: '%s Kwitansi',
      meta: [
        {
          name: 'description',
          content: 'Kwitansi - Invoice generator dan pembuat kwitansi online yang mudah digunakan untuk bisnis dan individu.',
        },
        {
          name: 'keywords',
          content: 'kwitansi, invoice generator, pembuat kwitansi online, template kwitansi, kwitansi digital, kwitansi PDF, kwitansi bisnis, kwitansi pribadi',
        },

        // Open Graph
        {
          property: 'og:title',
          content: 'Kwitansi - Invoice generator dan pembuat kwitansi online yang mudah digunakan untuk bisnis dan individu. | ',
        },
        {
          property: 'og:description',
          content: 'Kwitansi - Invoice generator dan pembuat kwitansi online yang mudah digunakan untuk bisnis dan individu.',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: 'https://kwitansi-one.vercel.app',
        },
        {
          property: 'og:image',
          content: 'https://kwitansi-one.vercel.app/og-image.png',
        },

        // Twitter
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Kwitansi - Invoice generator dan pembuat kwitansi online',
        },
        {
          name: 'twitter:description',
          content: 'Invoice generator dan pembuat kwitansi online yang mudah digunakan untuk bisnis dan individu.',
        },
        {
          name: 'twitter:image',
          content: 'https://kwitansi-one.vercel.app/og-image.png',
        },
      ],
    },
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  googleFonts: {
    families: {
      Mansalva: true,
    },
  },
})