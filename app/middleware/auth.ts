// middleware/auth.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  const publicPages = ['/', '/login']
  const requiresAuth = !publicPages.includes(to.path)

  if (!authStore.isAuthenticated) {
    await authStore.getCurrentUser()
  }

  if (requiresAuth && !authStore.isAuthenticated) {
    return navigateTo('/login')
  }

  if (authStore.isAuthenticated && (to.path === '/login')) {
    return navigateTo('/dashboard')
  }
})