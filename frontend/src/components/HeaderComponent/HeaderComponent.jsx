import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteUserAccount } from '../../services/userService'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
import '../../styles/header.css'

const HeaderComponent = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      setSearchQuery('')
    }
  }

  const handleProfileClick = () => {
    navigate('/perfil')
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    navigate('/login')
    setIsMenuOpen(false)
  }

  const handleDeleteAccount = () => {
    setShowConfirmDelete(true)
    setIsMenuOpen(false)
  }

  const handleConfirmDelete = async () => {
    try {
      const userDataStr = localStorage.getItem('userData')
      if (!userDataStr) {
        navigate('/login')
        return
      }

      const userObj = JSON.parse(userDataStr)
      await deleteUserAccount(userObj._id)

      localStorage.removeItem('userData')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      navigate('/login')
    } catch (err) {
      if (err.type === 'AUTH_ERROR') {
        localStorage.removeItem('userData')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        navigate('/login')
      } else {
        alert('Error al eliminar cuenta: ' + (err.message || 'Intenta nuevamente'))
        setShowConfirmDelete(false)
      }
    }
  }

  const handleCancelDelete = () => {
    setShowConfirmDelete(false)
  }

  return (
    <header className="header">
      <div className="header-container" onClick={() => setIsMenuOpen(false)}>
        <Link to="/homepage" className="header-logo-div">
          <img src="/Libro_Abierto_Para_Colorear-removebg-preview.png" alt="Libropia" className="header-logo" />
        </Link>

       
        <div className="header-search-div">
          <input 
            type="text" 
            placeholder="Buscar libros..." 
            className="header-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                onSearch(searchQuery)
                setSearchQuery('')
              }
            }}
          />
        </div>

        <div className={`header-profile-div ${isMenuOpen ? 'active' : ''}`}>
          <button 
            className="header-profile-btn"
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
            aria-label="Menú de perfil"
          >
            <i className="bi bi-person-circle"></i>
          </button>

          <div className={`profile-dropdown-menu ${isMenuOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="dropdown-item" onClick={handleProfileClick}>
              <i className="bi bi-person"></i>
              Mi Perfil
            </button>
            <button className="dropdown-item" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Cerrar Sesión
            </button>
            <button className="dropdown-item dropdown-item-danger" onClick={handleDeleteAccount}>
              <i className="bi bi-trash"></i>
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirmDelete}
        title="Eliminar Cuenta"
        message="¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isDanger={true}
      />
    </header>
  )
}

export default HeaderComponent