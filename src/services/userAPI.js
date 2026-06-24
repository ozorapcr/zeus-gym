// src/services/userAPI.js
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('UserAPI - Supabase URL:', supabaseUrl)
console.log('UserAPI - Supabase Key:', supabaseAnonKey)

const userAPI = {
  async fetchUsers() {
    return [
      {
        id: '1',
        email: 'admin@gymzeus.local',
        user_metadata: {
          name: 'Admin GymZeus',
          role: 'admin'
        },
        created_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString()
      },
      {
        id: '2',
        email: 'member1@example.com',
        user_metadata: {
          name: 'Budi Santoso',
          role: 'user'
        },
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        last_sign_in_at: new Date(Date.now() - 86400000 * 2).toISOString()
      },
      {
        id: '3',
        email: 'member2@example.com',
        user_metadata: {
          name: 'Siti Rahayu',
          role: 'user'
        },
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        last_sign_in_at: new Date(Date.now() - 86400000 * 1).toISOString()
      }
    ]
  },

  async fetchUserById(id) {
    const users = await this.fetchUsers()
    return users.find(user => user.id === id) || null
  },

  async createUser(userData) {
    console.log('Creating user:', userData)
    return {
      id: `user_${Date.now()}`,
      ...userData,
      created_at: new Date().toISOString()
    }
  },

  async updateUser(id, updates) {
    console.log('Updating user:', id, updates)
    return {
      id,
      ...updates,
      updated_at: new Date().toISOString()
    }
  },

  async deleteUser(id) {
    console.log('Deleting user:', id)
    return true
  }
}

export default userAPI  // ← PERUBAHAN: export default