// src/services/authAPI.js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('Auth - Supabase URL:', supabaseUrl)
console.log('Auth - Supabase Key:', supabaseAnonKey)

const authAPI = {
  async login(email, password) {
    console.log('Login attempt:', email)
    
    if (email && password) {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      if (email === 'admin@gymzeus.local' && password === 'admin123') {
        return {
          user: {
            id: '1',
            email: email,
            user_metadata: {
              name: 'Admin GymZeus',
              role: 'admin'
            }
          },
          session: {
            access_token: 'fake-token-12345',
            refresh_token: 'fake-refresh-token'
          }
        }
      }
      
      if (password && password.length >= 6) {
        return {
          user: {
            id: `user_${Date.now()}`,
            email: email,
            user_metadata: {
              name: email.split('@')[0] || 'User',
              role: 'user'
            }
          },
          session: {
            access_token: 'fake-token-' + Date.now(),
            refresh_token: 'fake-refresh-token'
          }
        }
      }
    }
    
    throw new Error('Email atau password salah!')
  },

  async register(email, password, userData) {
    console.log('Register attempt:', email, userData)
    
    if (password && password.length >= 6) {
      return {
        user: {
          id: `user_${Date.now()}`,
          email: email,
          user_metadata: {
            name: userData.name || email.split('@')[0],
            role: userData.role || 'user'
          }
        },
        session: {
          access_token: 'fake-token-' + Date.now()
        }
      }
    }
    
    throw new Error('Password minimal 6 karakter!')
  },

  async logout() {
    console.log('Logout')
    return new Promise(resolve => setTimeout(resolve, 300))
  },

  async getSession() {
    const savedSession = localStorage.getItem('sb-session')
    if (savedSession) {
      try {
        return JSON.parse(savedSession)
      } catch {
        return null
      }
    }
    return null
  },

  async getUser() {
    const session = await this.getSession()
    if (session && session.user) {
      return session.user
    }
    return null
  }
}

export default authAPI  // ← PERUBAHAN: export default