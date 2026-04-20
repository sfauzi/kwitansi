// types/auth.ts
export interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  fullName: string
}