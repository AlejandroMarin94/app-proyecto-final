import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getUserLibrary, updateBook, removeBookFromLibrary } from '../services/bookService'
import '../styles/bibliotecaPage.css'

const BibliotecaPage = () => {
  const navigate = useNavigate()
  const { id: userId } = useParams()
  const [userBooks, setUserBooks] = useState({
    pendiente: [],
    leyendo: [],
    leido: []
  })
  const [favoriteBooks, setFavoriteBooks] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadBooks = async () => {
    try {
      setLoading(true)
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
      console.error('Error al cargar biblioteca:', err)
      setError('Error al cargar biblioteca')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [userId])

  const toggleFavorite = async (book) => {
    try {
      if (!userId) return
      
      const bookId = book.id || book.titulo
      const isFavorite = !favoriteBooks[bookId]
      
      const response = await updateBook(userId, book, null, isFavorite)
      
      if (response.status === 'Success') {
        setFavoriteBooks(response.favoriteBooks || {})
      }
    } catch (err) {
      console.error('Error al actualizar favorito:', err)
      setError('Error al actualizar favorito')
    }
  }

  const changeStatus = async (book, fromSection, toStatus) => {
    try {
      if (!userId) return
      
      const response = await updateBook(userId, book, toStatus, null)
      
      if (response.status === 'Success') {
        setUserBooks(response.userBooks)
      }
    } catch (err) {
      console.error('Error al cambiar estado:', err)
      setError('Error al cambiar estado')
    }
  }

  const removeBook = async (book, section) => {
    try {
      if (!userId) return
      
      const response = await removeBookFromLibrary(userId, book, section)
      
      if (response.status === 'Success') {
        setUserBooks(response.userBooks)
        setFavoriteBooks(response.favoriteBooks || {})
      }
    } catch (err) {
      console.error('Error al remover libro:', err)
      setError('Error al remover libro')
    }
  }

  if (loading) {
    return <div className="biblioteca-page-container"><p>Cargando...</p></div>
  }

  return (
    <div className="biblioteca-page-container">
      <div className="biblioteca-header">
        <button className="back-button" onClick={() => navigate('/homepage')}>
          <i className="bi bi-arrow-left"></i>
        </button>
        <h1><i className="bi bi-book-half" style={{color: '#000', marginRight: '8px', fontSize: '24px'}}></i>Mi biblioteca</h1>
      </div>

      <div className="biblioteca-sections">
        <section className="biblioteca-subcategory">
          <h2>Pendiente</h2>
          <div className="biblioteca-books-grid">
            {userBooks.pendiente.length > 0 ? (
              userBooks.pendiente.map((book) => (
                <div key={book.id || book.titulo} className="book-card">
                  <img src={book.cover} alt={book.titulo} className="book-image" />
                  <div className="book-info">
                    <h3>{book.titulo}</h3>
                    <p className="author">{book.autor}</p>
                    <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                    <div className="rating">
                      <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                      <div className="book-actions">
                        <i 
                          className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(book)}
                        ></i>
                        <i 
                          className="bi bi-trash delete-icon"
                          onClick={() => removeBook(book, 'pendiente')}
                          title="Eliminar libro"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="biblioteca-no-books">No hay libros pendientes</p>
            )}
          </div>
        </section>

        <section className="biblioteca-subcategory">
          <h2>Leyendo</h2>
          <div className="biblioteca-books-grid">
            {userBooks.leyendo.length > 0 ? (
              userBooks.leyendo.map((book) => (
                <div key={book.id || book.titulo} className="book-card">
                  <img src={book.cover} alt={book.titulo} className="book-image" />
                  <div className="book-info">
                    <h3>{book.titulo}</h3>
                    <p className="author">{book.autor}</p>
                    <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                    <div className="rating">
                      <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                      <div className="book-actions">
                        <i 
                          className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(book)}
                        ></i>
                        <i 
                          className="bi bi-trash delete-icon"
                          onClick={() => removeBook(book, 'leyendo')}
                          title="Eliminar libro"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="biblioteca-no-books">No hay libros siendo leídos actualmente</p>
            )}
          </div>
        </section>

        <section className="biblioteca-subcategory">
          <h2>Leído</h2>
          <div className="biblioteca-books-grid">
            {userBooks.leido.length > 0 ? (
              userBooks.leido.map((book) => (
                <div key={book.id || book.titulo} className="book-card">
                  <img src={book.cover} alt={book.titulo} className="book-image" />
                  <div className="book-info">
                    <h3>{book.titulo}</h3>
                    <p className="author">{book.autor}</p>
                    <p className="year"><i className="bi bi-calendar"></i> {book.fechaPublicacion}</p>
                    <div className="rating">
                      <span><i className="bi bi-star-fill"></i> {book.rating}</span>
                      <div className="book-actions">
                        <i 
                          className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                          onClick={() => toggleFavorite(book)}
                        ></i>
                        <i 
                          className="bi bi-trash delete-icon"
                          onClick={() => removeBook(book, 'leido')}
                          title="Eliminar libro"
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="biblioteca-no-books">No hay libros leídos</p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default BibliotecaPage
