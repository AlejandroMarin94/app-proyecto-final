import React, { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { getAllBooks } from '../services/bookService'
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
  const [currentSection, setCurrentSection] = useState(null)
  const [userBooks, setUserBooks] = useState({})
  const [favoriteBooks, setFavoriteBooks] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)

  // Cargar favoritos y userBooks del localStorage al montar
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteBooks')
      const savedUserBooks = localStorage.getItem('userBooks')
      if (savedFavorites) {
        setFavoriteBooks(JSON.parse(savedFavorites))
      }
      if (savedUserBooks) {
        setUserBooks(JSON.parse(savedUserBooks))
      }
      setDataLoaded(true)
    } catch (err) {
      console.error('Error al cargar datos del localStorage:', err)
      setDataLoaded(true)
    }
  }, [])

  // Guardar favoritos en localStorage
  useEffect(() => {
    if (!dataLoaded) return
    try {
      localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks))
    } catch (err) {
      console.error('Error al guardar favoritos:', err)
    }
  }, [favoriteBooks, dataLoaded])

  // Guardar userBooks en localStorage
  useEffect(() => {
    if (!dataLoaded) return
    try {
      localStorage.setItem('userBooks', JSON.stringify(userBooks))
    } catch (err) {
      console.error('Error al guardar userBooks:', err)
    }
  }, [userBooks, dataLoaded])

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

  // Cargar libros según búsqueda (filtro local)
  useEffect(() => {
    if (!searchQuery) {
      setGoogleBooks([])
      return
    }

    // Filtrar allBooks localmente por título, autor o categoría
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

  const handleBookStatus = (status, index, section, book) => {
    const key = `${section}-${index}`
    const selectedState = selectedStatus[key]
    if (selectedState) {
      // Guardar solo los datos serializables del libro
      const bookData = {
        id: book.id,
        titulo: book.titulo,
        autor: book.autor,
        fechaPublicacion: book.fechaPublicacion,
        cover: book.cover,
        rating: book.rating
      }
      setUserBooks({
        ...userBooks,
        [book.id || book.titulo]: { book: bookData, status: selectedState }
      })
    }
    setOpenDropdown(null)
  }

  const toggleFavorite = (book) => {
    const bookId = book.id || book.titulo
    if (favoriteBooks[bookId]) {
      const newFavorites = { ...favoriteBooks }
      delete newFavorites[bookId]
      setFavoriteBooks(newFavorites)
    } else {
      // Guardar solo los datos serializables del libro
      const bookData = {
        id: book.id,
        titulo: book.titulo,
        autor: book.autor,
        fechaPublicacion: book.fechaPublicacion,
        cover: book.cover,
        rating: book.rating
      }
      setFavoriteBooks({
        ...favoriteBooks,
        [bookId]: bookData
      })
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
                            <div className="rating">
                              <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                              <i 
                                className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
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
                                className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
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
        <h2 onClick={() => navigate('/biblioteca')} className="clickable-title" style={{position: 'relative', textAlign: 'center'}}><i className="bi bi-book-half" style={{color: '#000000', marginRight: '8px', fontSize: '24px'}}></i>Mi biblioteca<i className="bi bi-arrow-right" style={{color: '#333', fontSize: '32px', position: 'absolute', right: '0'}}></i></h2>
        <div className="libros">
          {Object.values(userBooks)
            .filter(item => item.status === 'Leyendo')
            .length > 0 ? (
            Object.values(userBooks)
              .filter(item => item.status === 'Leyendo')
              .map((item, idx) => (
                <div key={idx} className="book-card">
                  <img src={item.book.cover} alt={item.book.titulo} className="book-image" />
                  <div className="book-info">
                    <h3>{item.book.titulo}</h3>
                    <p className="author">{item.book.autor}</p>
                    <p className="year"><i className="bi bi-calendar"></i> {item.book.fechaPublicacion}</p>
                    <div className="rating">
                      <span><i className="bi bi-star-fill"></i> {item.book.rating}</span>
                      <i 
                        className={`bi ${favoriteBooks[item.book.id || item.book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                        onClick={() => toggleFavorite(item.book)}
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
              {Object.values(userBooks)
                .filter(item => item.status === 'Pendiente')
                .map((item, idx) => (
                  <div key={idx} className="book-card">
                    <img src={item.book.cover} alt={item.book.titulo} className="book-image" />
                    <div className="book-info">
                      <h3>{item.book.titulo}</h3>
                      <p className="author">{item.book.autor}</p>
                      <p className="year"><i className="bi bi-calendar"></i> {item.book.fechaPublicacion}</p>
                      <div className="rating">
                        <span><i className="bi bi-star-fill"></i> {item.book.rating}</span>
                        <i 
                          className={`bi ${favoriteBooks[item.book.id || item.book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(item.book)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="subcategory-section">
            <h3 className="subcategory-title">Leyendo</h3>
            <div className="libros">
              {Object.values(userBooks)
                .filter(item => item.status === 'Leyendo')
                .map((item, idx) => (
                  <div key={idx} className="book-card">
                    <img src={item.book.cover} alt={item.book.titulo} className="book-image" />
                    <div className="book-info">
                      <h3>{item.book.titulo}</h3>
                      <p className="author">{item.book.autor}</p>
                      <p className="year"><i className="bi bi-calendar"></i> {item.book.fechaPublicacion}</p>
                      <div className="rating">
                        <span><i className="bi bi-star-fill"></i> {item.book.rating}</span>
                        <i 
                          className={`bi ${favoriteBooks[item.book.id || item.book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(item.book)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="subcategory-section">
            <h3 className="subcategory-title">Leído</h3>
            <div className="libros">
              {Object.values(userBooks)
                .filter(item => item.status === 'Leído')
                .map((item, idx) => (
                  <div key={idx} className="book-card">
                    <img src={item.book.cover} alt={item.book.titulo} className="book-image" />
                    <div className="book-info">
                      <h3>{item.book.titulo}</h3>
                      <p className="author">{item.book.autor}</p>
                      <p className="year"><i className="bi bi-calendar"></i> {item.book.fechaPublicacion}</p>
                      <div className="rating">
                        <span><i className="bi bi-star-fill"></i> {item.book.rating}</span>
                        <i 
                          className={`bi ${favoriteBooks[item.book.id || item.book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(item.book)}
                        ></i>
                      </div>
                    </div>
                  </div>
                ))}
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
