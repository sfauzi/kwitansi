<!-- pages/register.vue -->
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold">Daftar Akun</h1>
        <p class="text-gray-600 mt-2">Buat akun untuk mulai membuat invoice</p>
      </div>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nama Lengkap</label>
          <input 
            v-model="form.fullName" 
            type="text" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Konfirmasi Password</label>
          <input 
            v-model="form.confirmPassword" 
            type="password" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <button 
          type="submit" 
          :disabled="authStore.loading || !isFormValid"
          class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
        >
          {{ authStore.loading ? 'Loading...' : 'Daftar' }}
        </button>
      </form>

      <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Sudah punya akun? 
          <NuxtLink to="/login" class="text-blue-600 hover:underline">
            Login
          </NuxtLink>
        </p>
      </div>

      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')

const isFormValid = computed(() => {
  return form.fullName && 
         form.email && 
         form.password && 
         form.password === form.confirmPassword &&
         form.password.length >= 6
})

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    error.value = 'Password tidak cocok'
    return
  }

  const result = await authStore.register(form)
  
  if (result.success) {
    alert('Pendaftaran berhasil! Silakan login.')
    router.push('/login')
  } else {
    error.value = result.error
  }
}
</script>