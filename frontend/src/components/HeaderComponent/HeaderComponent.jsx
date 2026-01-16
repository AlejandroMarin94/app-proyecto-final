import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/header.css'

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate('/perfil')
    setIsMenuOpen(false)
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
            <button className="dropdown-item">
              <i className="bi bi-box-arrow-right"></i>
              Cerrar Sesión
            </button>
            <button className="dropdown-item dropdown-item-danger">
              <i className="bi bi-trash"></i>
              Eliminar Cuenta
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent