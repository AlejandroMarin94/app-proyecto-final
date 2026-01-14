import React from 'react'
import '../styles/homePage.css'

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="section-libros">
        <h2>Libros</h2>
        <div className="libros-content">
        </div>
      </div>

      <div className="section-libros-favoritos">
        <h2>Libros Favoritos</h2>
        <div className="libros-favoritos-content">
        </div>
      </div>
    </div>
  )
}

export default HomePage
