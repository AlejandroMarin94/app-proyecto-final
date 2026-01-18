import React, { useState, useEffect, useCallback } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { getAllBooks, getUserLibrary, addBookToLibrary, updateBook } from '../services/bookService'
import '../styles/homePage.css'
import '../styles/bookGrid.css'

const HomePage = () => {
  const { searchQuery } = useOutletContext() || {}
  const navigate = useNavigate()
  const [allBooks, setAllBooks] = useState([])
  const [googleBooks, setGoogleBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState({})
  const [currentSection, setCurrentSection] = useState(null)
  const [userBooks, setUserBooks] = useState({
    pendiente: [],
    leyendo: [],
    leido: []
  })
  const [favoriteBooks, setFavoriteBooks] = useState({})

  const userId = JSON.parse(localStorage.getItem('userData'))?._id

  // Cargar biblioteca del usuario
  const loadUserLibrary = useCallback(async () => {
    try {
      if (!userId) return
      const data = await getUserLibrary(userId)
      if (data.status === 'Success') {
        setUserBooks(data.userBooks || {
          pendiente: [],
          leyendo: [],
          leido: []
        })
        setFavoriteBooks(data.favoriteBooks || {})
      }
    } catch (err) {
      console.error('Error al cargar biblioteca del usuario:', err)
    }
  }, [userId])

  // Cargar todos los libros
  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true)
      try {
        const data = await getAllBooks()
        setAllBooks(data)
        setError(null)
      } catch (err) {
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

  // Cargar biblioteca del usuario
  useEffect(() => {
    loadUserLibrary()
  }, [userId, loadUserLibrary])

  // Filtrar libros por búsqueda
  useEffect(() => {
    if (!searchQuery) {
      setGoogleBooks([])
      return
    }

    const filtered = allBooks.filter(book =>
      book.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (book.categoria && book.categoria.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setGoogleBooks(filtered)
  }, [searchQuery, allBooks])

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

  const handleBookStatus = async (status, index, section, book) => {
    const key = `${section}-${index}`
    const selectedState = selectedStatus[key]
    
    if (selectedState && userId) {
      try {
        const response = await addBookToLibrary(userId, book, selectedState)
        if (response.status === 'Success') {
          setUserBooks(response.userBooks)
          setOpenDropdown(null)
          setSelectedStatus({})
        }
      } catch (err) {
        console.error('Error al agregar libro:', err)
        setError('Error al agregar libro')
      }
    }
  }

  const toggleFavorite = async (book) => {
    try {
      if (!userId) return
      
      // Usar el TÍTULO como identificador para favoritos (consistente con BD)
      const bookId = book.titulo
      const isFavorite = !favoriteBooks[bookId]
      
      console.log('🔷 toggleFavorite:', {
        titulo: book.titulo,
        bookId,
        currentFavoriteBooks: favoriteBooks,
        isFavorite
      })
      
      const response = await updateBook(userId, book, null, isFavorite)
      
      console.log('🔶 Response del servidor:', {
        status: response.status,
        favoriteBooks: response.favoriteBooks
      })
      
      if (response.status === 'Success') {
        setFavoriteBooks(response.favoriteBooks || {})
      }
    } catch (err) {
      console.error('Error al actualizar favorito:', err)
      setError('Error al actualizar favorito')
    }
  }

  return (
    <div className="home-page-container">
      {currentSection === null && (
        <>
          <div className="section-libros-google">
            <h2 style={{position: 'relative', textAlign: 'center'}}><i className="bi bi-lightbulb-fill" style={{color: '#FFD700', marginRight: '8px', fontSize: '24px'}}></i>{searchQuery ? 'Resultados de Búsqueda' : 'Recomendaciones'}</h2>
            <div className="libros-google">
          {searchQuery ? (
            <>
              {loading && <p>Cargando libros...</p>}
              {error && <p className="error">{error}</p>}
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
                            <div className="rating">
                              <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                              <i 
                                className={`bi ${favoriteBooks[book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                                onClick={() => toggleFavorite(book)}
                              ></i>
                            </div>
                          </>
                        )}
                        {openDropdown === `search-${index}` ? (
                          <div className="book-options">
                            <div className="options-header">
                              <button className="close-btn" onClick={() => setOpenDropdown(null)}>
                                <i className="bi bi-x"></i>
                              </button>
                              <span>Añadir</span>
                              <button className="ok-btn" onClick={() => handleBookStatus('confirmed', index, 'search', book)}>
                                <i className="bi bi-check"></i>
                              </button>
                            </div>
                            <label>
                              <input type="radio" name={`status-search-${index}`} checked={selectedStatus[`search-${index}`] === 'Pendiente'} onChange={() => handleSelectStatus('Pendiente', index, 'search')} />
                              Pendiente
                            </label>
                            <label>
                              <input type="radio" name={`status-search-${index}`} checked={selectedStatus[`search-${index}`] === 'Leyendo'} onChange={() => handleSelectStatus('Leyendo', index, 'search')} />
                              Leyendo
                            </label>
                            <label>
                              <input type="radio" name={`status-search-${index}`} checked={selectedStatus[`search-${index}`] === 'Leído'} onChange={() => handleSelectStatus('Leído', index, 'search')} />
                              Leído
                            </label>
                          </div>
                        ) : (
                          <button className="want-to-read-btn" onClick={() => toggleDropdown(index, 'search')}>
                            <span>Añadir libro</span>
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
                            <div className="rating">
                              <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                              <i 
                                className={`bi ${favoriteBooks[book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                                onClick={() => toggleFavorite(book)}
                              ></i>
                            </div>
                          </>
                        )}
                        {openDropdown === `all-${index}` ? (
                          <div className="book-options">
                            <div className="options-header">
                              <button className="close-btn" onClick={() => setOpenDropdown(null)}>
                                <i className="bi bi-x"></i>
                              </button>
                              <span>Añadir</span>
                              <button className="ok-btn" onClick={() => handleBookStatus('confirmed', index, 'all', book)}>
                                <i className="bi bi-check"></i>
                              </button>
                            </div>
                            <label>
                              <input type="radio" name={`status-all-${index}`} checked={selectedStatus[`all-${index}`] === 'Pendiente'} onChange={() => handleSelectStatus('Pendiente', index, 'all')} />
                              Pendiente
                            </label>
                            <label>
                              <input type="radio" name={`status-all-${index}`} checked={selectedStatus[`all-${index}`] === 'Leyendo'} onChange={() => handleSelectStatus('Leyendo', index, 'all')} />
                              Leyendo
                            </label>
                            <label>
                              <input type="radio" name={`status-all-${index}`} checked={selectedStatus[`all-${index}`] === 'Leído'} onChange={() => handleSelectStatus('Leído', index, 'all')} />
                              Leído
                            </label>
                          </div>
                        ) : (
                          <button className="want-to-read-btn" onClick={() => toggleDropdown(index, 'all')}>
                            <span>Añadir libro</span>
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
        <h2 onClick={() => navigate(`/biblioteca/${userId}`)} className="clickable-title" style={{position: 'relative', textAlign: 'center'}}><i className="bi bi-book-half" style={{color: '#000000', marginRight: '8px', fontSize: '24px'}}></i>Mi biblioteca<i className="bi bi-arrow-right" style={{color: '#333', fontSize: '32px', position: 'absolute', right: '0'}}></i></h2>
        <div className="libros">
          {userBooks.leyendo && userBooks.leyendo.length > 0 ? (
            userBooks.leyendo.map((book, idx) => (
              <div key={idx} className="book-card">
                <img src={book.cover} alt={book.titulo} className="book-image" />
                <div className="book-info">
                  <h3>{book.titulo}</h3>
                  <p className="author">{book.autor}</p>
                  <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                  <div className="rating">
                    <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                    <i 
                      className={`bi ${favoriteBooks[book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                      onClick={() => toggleFavorite(book)}
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{textAlign: 'center', width: '100%'}}>No hay libros siendo leídos actualmente</p>
          )}
        </div>
      </div>

      <div className="section-libros-favoritos">
        <h2 className="clickable-title" style={{textAlign: 'center', cursor: 'default'}}><i className="bi bi-heart-fill" style={{color: '#e74c3c', marginRight: '8px', fontSize: '24px'}}></i>Libros Favoritos</h2>
        <div className="libros-favoritos-content">
          {Object.values(favoriteBooks).length > 0 ? (
            Object.values(favoriteBooks).map((book, idx) => (
              <div key={idx} className="book-card">
                <img src={book.cover} alt={book.titulo} className="book-image" />
                <div className="book-info">
                  <h3>{book.titulo}</h3>
                  <p className="author">{book.autor}</p>
                  <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                  <div className="rating">
                    <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                    <i 
                      className="bi bi-heart-fill heart-icon"
                      onClick={() => toggleFavorite(book)}
                    ></i>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{textAlign: 'center', width: '100%'}}>No hay libros favoritos</p>
          )}
        </div>
      </div>
        </>
      )}

      {currentSection === 'libros' && (
        <div className="section-libros">
          <div className="libros-header">
            <i className="bi bi-arrow-left" onClick={() => setCurrentSection(null)} style={{cursor: 'pointer', fontSize: '32px'}}></i>
          </div>
          
          <div className="subcategory-section">
            <h3 className="subcategory-title">Pendiente</h3>
            <div className="libros">
              {userBooks.pendiente && userBooks.pendiente.length > 0 ? (
                userBooks.pendiente.map((book, idx) => (
                  <div key={idx} className="book-card">
                    <img src={book.cover} alt={book.titulo} className="book-image" />
                    <div className="book-info">
                      <h3>{book.titulo}</h3>
                      <p className="author">{book.autor}</p>
                      <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                      <div className="rating">
                        <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                        <i 
                          className={`bi ${favoriteBooks[book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(book)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay libros pendientes</p>
              )}
            </div>
          </div>

          <div className="subcategory-section">
            <h3 className="subcategory-title">Leyendo</h3>
            <div className="libros">
              {userBooks.leyendo && userBooks.leyendo.length > 0 ? (
                userBooks.leyendo.map((book, idx) => (
                  <div key={idx} className="book-card">
                    <img src={book.cover} alt={book.titulo} className="book-image" />
                    <div className="book-info">
                      <h3>{book.titulo}</h3>
                      <p className="author">{book.autor}</p>
                      <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                      <div className="rating">
                        <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                        <i 
                          className={`bi ${favoriteBooks[book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(book)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay libros siendo leídos</p>
              )}
            </div>
          </div>

          <div className="subcategory-section">
            <h3 className="subcategory-title">Leído</h3>
            <div className="libros">
              {userBooks.leido && userBooks.leido.length > 0 ? (
                userBooks.leido.map((book, idx) => (
                  <div key={idx} className="book-card">
                    <img src={book.cover} alt={book.titulo} className="book-image" />
                    <div className="book-info">
                      <h3>{book.titulo}</h3>
                      <p className="author">{book.autor}</p>
                      <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                      <div className="rating">
                        <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                        <i 
                          className={`bi ${favoriteBooks[book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(book)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay libros leídos</p>
              )}
            </div>
          </div>
        </div>
      )}

      {currentSection === 'favoritos' && (
        <div className="section-libros-favoritos">
          <h2 onClick={() => setCurrentSection(null)} className="clickable-title"><i className="bi bi-arrow-left"></i> Libros Favoritos</h2>
          <div className="libros-favoritos-content">
            {Object.values(favoriteBooks).length > 0 ? (
              Object.values(favoriteBooks).map((book, idx) => (
                <div key={idx} className="book-card">
                  <img src={book.cover} alt={book.titulo} className="book-image" />
                  <div className="book-info">
                    <h3>{book.titulo}</h3>
                    <p className="author">{book.autor}</p>
                    <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                    <div className="rating">
                      <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                      <i 
                        className="bi bi-heart-fill heart-icon"
                        onClick={() => toggleFavorite(book)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay libros favoritos</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage
