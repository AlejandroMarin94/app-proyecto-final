import React from 'react'
import '../../styles/header.css'

const HeaderComponent = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-div">
          <img src="/Libro_Abierto_Para_Colorear-removebg-preview.png" alt="Libropia" className="header-logo" />
        </div>

       
        <div className="header-search-div">
          <input 
            type="text" 
            placeholder="Buscar libros..." 
            className="header-search-input"
          />
        </div>

        <div className="header-profile-div">
          <i className="bi bi-person-circle"></i>
        </div>
      </div>
    </header>
  )
}

export default HeaderComponent