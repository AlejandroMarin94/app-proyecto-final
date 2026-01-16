import React from 'react'
import { Navigate } from 'react-router-dom'

/**
 * Componente que protege rutas verificando si el usuario está autenticado
 * Si no hay token, redirige al login
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const userData = localStorage.getItem('userData')

  // Si no hay token o userData, redirigir al login
  if (!token || !userData) {
    return <Navigate to="/login" replace />
  }

  // Si está autenticado, renderizar el componente
  return children
}

export default ProtectedRoute
