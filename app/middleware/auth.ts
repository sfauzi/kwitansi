// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  const publicPages = ['/', '/login', '/register', '/forgot-password']
  const requiresAuth = !publicPages.includes(to.path)

  if (!authStore.isAuthenticated) {
    await authStore.getCurrentUser()
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  if (authStore.isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/dashboard')
  }
})