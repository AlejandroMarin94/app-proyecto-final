import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/bibliotecaPage.css'

const BibliotecaPage = () => {
  const navigate = useNavigate()
  const [userBooks, setUserBooks] = useState({
    pendiente: [],
    leyendo: [],
    leido: []
  })
  const [favoriteBooks, setFavoriteBooks] = useState({})
  const [dataLoaded, setDataLoaded] = useState(false)

  const loadBooks = () => {
    try {
      const savedUserBooks = localStorage.getItem('userBooks')
      const savedFavorites = localStorage.getItem('favoriteBooks')
      
      if (savedUserBooks) {
        const parsedBooks = JSON.parse(savedUserBooks)
        
        const organized = {
          pendiente: [],
          leyendo: [],
          leido: []
        }

        Object.values(parsedBooks).forEach(item => {
          if (item.status === 'Pendiente') {
            organized.pendiente.push(item.book)
          } else if (item.status === 'Leyendo') {
            organized.leyendo.push(item.book)
          } else if (item.status === 'Leído') {
            organized.leido.push(item.book)
          }
        })

        setUserBooks(organized)
      }

      if (savedFavorites) {
        setFavoriteBooks(JSON.parse(savedFavorites))
      }

      setDataLoaded(true)
    } catch (err) {
      console.error('Error al cargar datos del localStorage:', err)
      setDataLoaded(true)
    }
  }

  useEffect(() => {
    loadBooks()
  }, [])

  const toggleFavorite = (book) => {
    const bookId = book.id || book.titulo
    if (favoriteBooks[bookId]) {
      const newFavorites = { ...favoriteBooks }
      delete newFavorites[bookId]
      setFavoriteBooks(newFavorites)
      localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites))
    } else {
      const bookData = {
        id: book.id,
        titulo: book.titulo,
        autor: book.autor,
        fechaPublicacion: book.fechaPublicacion,
        cover: book.cover,
        rating: book.rating
      }
      const newFavorites = {
        ...favoriteBooks,
        [bookId]: bookData
      }
      setFavoriteBooks(newFavorites)
      localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites))
    }
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
        {/* Pendiente */}
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
                      <i 
                        className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                        onClick={() => toggleFavorite(book)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="biblioteca-no-books">No hay libros pendientes</p>
            )}
          </div>
        </section>

        {/* Leyendo */}
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
                      <i 
                        className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                        onClick={() => toggleFavorite(book)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="biblioteca-no-books">No hay libros siendo leídos actualmente</p>
            )}
          </div>
        </section>

        {/* Leído */}
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
                      <i 
                        className={`bi ${favoriteBooks[book.id || book.titulo] ? 'bi-heart-fill' : 'bi-heart'} heart-icon`}
                        onClick={() => toggleFavorite(book)}
                      ></i>
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
