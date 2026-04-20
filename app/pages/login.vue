<!-- pages/login.vue -->
<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold">Invoice Generator</h1>
        <p class="text-gray-600 mt-2">Login untuk mengelola invoice</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="email@example.com"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            required
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          >
        </div>

        <!-- <div class="flex justify-end">
          <NuxtLink to="/forgot-password" class="text-sm text-blue-600 hover:underline">
            Lupa password?
          </NuxtLink>
        </div> -->

        <button 
          type="submit" 
          :disabled="authStore.loading"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {{ authStore.loading ? 'Loading...' : 'Login' }}
        </button>
      </form>

      <!-- <div class="mt-4 text-center">
        <p class="text-sm text-gray-600">
          Belum punya akun? 
          <NuxtLink to="/register" class="text-blue-600 hover:underline">
            Daftar
          </NuxtLink>
        </p>
      </div> -->

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
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  const result = await authStore.login(form)
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.error
  }
}
</script>