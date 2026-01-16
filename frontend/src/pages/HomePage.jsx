import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { searchNewBooks } from '../services/bookService'
import '../styles/homePage.css'
import '../styles/bookGrid.css'

const HomePage = () => {
  const { searchQuery } = useOutletContext() || {}
  const [googleBooks, setGoogleBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) {
        setGoogleBooks([])
        return
      }

      setLoading(true)
      try {
        const data = await searchNewBooks(searchQuery)
        setGoogleBooks(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar libros')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [searchQuery])

  return (
    <div className="home-page-container">
      <div className="section-libros-google">
        <h2>Libros de Google</h2>
        <div className="libros-google-content">
          {loading && <p>Cargando libros...</p>}
          {error && <p className="error">{error}</p>}
          {googleBooks.length > 0 ? (
            <div className="books-grid">
              {googleBooks.map((book, index) => (
                book.cover && (
                  <div key={index} className="book-card">
                    <img 
                      src={book.cover} 
                      alt={book.title || 'Book'}
                      className="book-image"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )
              ))}
            </div>
          ) : (
            !loading && <p>No hay libros disponibles</p>
          )}
        </div>
      </div>

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
