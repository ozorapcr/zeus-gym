import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import LoadingSpinner from './LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authAPI.getSession()
        setIsAuthenticated(!!session)
      } catch (error) {
        console.error('Auth check error:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner text="Memeriksa autentikasi..." />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}