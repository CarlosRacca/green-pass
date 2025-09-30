"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import AdminDashboard from '@/components/admin-dashboard'
import ClientDashboard from '@/components/client-dashboard'
import MainLayout from '@/components/layout/main-layout'

export default function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    )
  }

  if (!isAuthenticated || !user) return null

  return (
    <MainLayout>
      {user.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />}
    </MainLayout>
  )
}
