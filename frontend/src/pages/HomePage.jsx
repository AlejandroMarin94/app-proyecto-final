import React, { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { searchNewBooks, getAllBooks } from '../services/bookService'
import '../styles/homePage.css'
import '../styles/bookGrid.css'

const HomePage = () => {
  const { searchQuery } = useOutletContext() || {}
  const navigate = useNavigate()
  const [allBooks, setAllBooks] = useState([])
  const [googleBooks, setGoogleBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [error, setError] = useState(null)
  const [errorSearch, setErrorSearch] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState({})

  // Cargar todos los libros de la BD al montar
  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true)
      try {
        const data = await getAllBooks()
        setAllBooks(data)
        setError(null)
      } catch (err) {
        // Manejo del error de autenticación
        if (err.type === 'AUTH_ERROR') {
          localStorage.removeItem('userData')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          navigate('/login')
        } else {
          setError('Error al cargar libros')
        }
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAllBooks()
  }, [navigate])

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
        // Manejo del error de autenticación
        if (err.type === 'AUTH_ERROR') {
          localStorage.removeItem('userData')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          navigate('/login')
        } else {
          setErrorSearch('Error al cargar libros')
        }
        console.error(err)
      } finally {
        setLoadingSearch(false)
      }
    }

    fetchBooks()
  }, [searchQuery, navigate])

  const toggleDropdown = (index, section) => {
    const key = `${section}-${index}`
    setOpenDropdown(openDropdown === key ? null : key)
  }

  const handleSelectStatus = (status, index, section) => {
    const key = `${section}-${index}`
    setSelectedStatus({
      ...selectedStatus,
      [key]: status
    })
  }

  const handleBookStatus = (status) => {
    console.log(`Libro marcado como: ${status}`)
    setOpenDropdown(null)
  }

  return (
    <div className="home-page-container">
      <div className="section-libros-google">
        <h2>{searchQuery ? 'Resultados de Búsqueda' : 'Recomendaciones'}</h2>
        <div className="libros-google">
          {searchQuery ? (
            <>
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
                        {openDropdown !== `search-${index}` && (
                          <>
                            <h3>{book.titulo}</h3>
                            <p className="author">{book.autor}</p>
                            <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                            <div className="rating"><i className="bi bi-star-fill"></i> {book.rating}</div>
                          </>
                        )}
                        {openDropdown === `search-${index}` ? (
                          <div className="book-options">
                            <div className="options-header">
                              <button className="close-btn" onClick={() => setOpenDropdown(null)}>
                                <i className="bi bi-x"></i>
                              </button>
                              <span>Add to my books</span>
                              <button className="ok-btn" onClick={() => handleBookStatus('confirmed')}>
                                <i className="bi bi-check"></i>
                              </button>
                            </div>
                            <label>
                              <input type="radio" name={`status-search-${index}`} checked={selectedStatus[`search-${index}`] === 'Want to read'} onChange={() => handleSelectStatus('Want to read', index, 'search')} />
                              Want to read
                            </label>
                            <label>
                              <input type="radio" name={`status-search-${index}`} checked={selectedStatus[`search-${index}`] === 'Currently reading'} onChange={() => handleSelectStatus('Currently reading', index, 'search')} />
                              Currently reading
                            </label>
                            <label>
                              <input type="radio" name={`status-search-${index}`} checked={selectedStatus[`search-${index}`] === 'Read'} onChange={() => handleSelectStatus('Read', index, 'search')} />
                              Read
                            </label>
                          </div>
                        ) : (
                          <button className="want-to-read-btn" onClick={() => toggleDropdown(index, 'search')}>
                            <span>Want to read</span>
                            <i className="bi bi-triangle-fill"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay libros disponibles</p>
              )}
            </>
          ) : (
            <>
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
                        {openDropdown !== `all-${index}` && (
                          <>
                            <h3>{book.titulo}</h3>
                            <p className="author">{book.autor}</p>
                            <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                            <div className="rating"><i className="bi bi-star-fill"></i> {book.rating}</div>
                          </>
                        )}
                        {openDropdown === `all-${index}` ? (
                          <div className="book-options">
                            <div className="options-header">
                              <button className="close-btn" onClick={() => setOpenDropdown(null)}>
                                <i className="bi bi-x"></i>
                              </button>
                              <span>Add to my books</span>
                              <button className="ok-btn" onClick={() => handleBookStatus('confirmed')}>
                                <i className="bi bi-check"></i>
                              </button>
                            </div>
                            <label>
                              <input type="radio" name={`status-all-${index}`} checked={selectedStatus[`all-${index}`] === 'Want to read'} onChange={() => handleSelectStatus('Want to read', index, 'all')} />
                              Want to read
                            </label>
                            <label>
                              <input type="radio" name={`status-all-${index}`} checked={selectedStatus[`all-${index}`] === 'Currently reading'} onChange={() => handleSelectStatus('Currently reading', index, 'all')} />
                              Currently reading
                            </label>
                            <label>
                              <input type="radio" name={`status-all-${index}`} checked={selectedStatus[`all-${index}`] === 'Read'} onChange={() => handleSelectStatus('Read', index, 'all')} />
                              Read
                            </label>
                          </div>
                        ) : (
                          <button className="want-to-read-btn" onClick={() => toggleDropdown(index, 'all')}>
                            <span>Want to read</span>
                            <i className="bi bi-triangle-fill"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p>No hay libros disponibles</p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="section-libros">
        <h2>Libros</h2>
        <div className="libros">
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
