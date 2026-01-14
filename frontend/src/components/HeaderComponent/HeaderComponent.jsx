import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/header.css'

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header-container">
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

        <Link to="/perfil" className="header-profile-div">
          <i className="bi bi-person-circle"></i>
        </Link>
      </div>
    </header>
  )
}

export default HeaderComponent