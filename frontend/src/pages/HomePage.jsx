import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { searchNewBooks, getAllBooks } from '../services/bookService'
import '../styles/homePage.css'
import '../styles/bookGrid.css'

const HomePage = () => {
  const { searchQuery } = useOutletContext() || {}
  const [allBooks, setAllBooks] = useState([])
  const [googleBooks, setGoogleBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [error, setError] = useState(null)
  const [errorSearch, setErrorSearch] = useState(null)

  // Cargar todos los libros de la BD al montar
  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true)
      try {
        const data = await getAllBooks()
        setAllBooks(data)
        setError(null)
      } catch (err) {
        setError('Error al cargar libros')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllBooks()
  }, [])

  // Cargar libros según búsqueda
  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery) {
        setGoogleBooks([])
        return
      }

      setLoadingSearch(true)
      try {
        const data = await searchNewBooks(searchQuery)
        setGoogleBooks(data)
        setErrorSearch(null)
      } catch (err) {
        setErrorSearch('Error al cargar libros')
        console.error(err)
      } finally {
        setLoadingSearch(false)
      }
    }

    fetchBooks()
  }, [searchQuery])

  return (
    <div className="home-page-container">
      <div className="section-libros-google">
        <h2>Recomendaciones</h2>
        <div className="libros-google">
          {loading && <p>Cargando libros...</p>}
          {error && <p className="error">{error}</p>}
          {allBooks.length > 0 ? (
            <div className="books-grid">
              {allBooks.map((book, index) => (
                <div key={index} className="book-card">
                  <img 
                    src={book.cover} 
                    alt={book.titulo || 'Libro'}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3>{book.titulo}</h3>
                    <p className="author">{book.autor}</p>
                    <p className="year">📅 {book.fechaPublicacion}</p>
                    <div className="rating">⭐ {book.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No hay libros disponibles</p>
          )}
        </div>
      </div>

      <div className="section-libros">
        <h2>Libros</h2>
        <div className="libros">
          {loadingSearch && <p>Cargando libros...</p>}
          {errorSearch && <p className="error">{errorSearch}</p>}
          {googleBooks.length > 0 ? (
            <div className="books-grid">
              {googleBooks.map((book, index) => (
                <div key={index} className="book-card">
                  <img 
                    src={book.cover} 
                    alt={book.titulo || 'Libro'}
                    className="book-image"
                  />
                  <div className="book-info">
                    <h3>{book.titulo}</h3>
                    <p className="author">{book.autor}</p>
                    <p className="year">📅 {book.fechaPublicacion}</p>
                    <div className="rating">⭐ {book.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loadingSearch && searchQuery && <p>No hay libros disponibles</p>
          )}
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
