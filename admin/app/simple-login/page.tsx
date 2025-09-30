'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SimpleLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Simple mock authentication
    const users = [
      { email: 'admin@greenpass.com', password: 'admin123', role: 'admin', name: 'Carlos Admin' },
      { email: 'cliente@greenpass.com', password: 'cliente123', role: 'client', name: 'Juan Cliente' }
    ]

    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('greenpass_user', JSON.stringify(user))
        localStorage.setItem('auth-token', 'mock-token-' + Date.now())
        localStorage.setItem('user-role', user.role)
      }
      
      // Redirect based on role
      router.push('/')
    } else {
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #ecfdf5, #f0fdfa)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            color: '#065f46',
            marginBottom: '0.5rem'
          }}>
            GREEN PASS
          </h1>
          <p style={{ color: '#059669' }}>Golf Experience Platform</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && (
            <div style={{ 
              padding: '0.75rem', 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fca5a5',
              borderRadius: '6px',
              color: '#dc2626',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@greenpass.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontWeight: '500',
              color: '#374151'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem'
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isSubmitting ? '#9ca3af' : '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              fontSize: '1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#6b7280', 
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Cuentas de demostración:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => quickLogin('admin@greenpass.com', 'admin123')}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <div style={{ fontWeight: '500' }}>👨‍💼 Administrador</div>
              <div style={{ color: '#6b7280' }}>admin@greenpass.com / admin123</div>
            </button>
            
            <button
              type="button"
              onClick={() => quickLogin('cliente@greenpass.com', 'cliente123')}
              disabled={isSubmitting}
              style={{
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <div style={{ fontWeight: '500' }}>👤 Cliente</div>
              <div style={{ color: '#6b7280' }}>cliente@greenpass.com / cliente123</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
