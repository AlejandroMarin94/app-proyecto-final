import { useNavigate } from 'react-router-dom'
import '../styles/notFoundPage.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img 
          src="/Gemini_Generated_Image_y2cxd0y2cxd0y2cx.png" 
          alt="404 Not Found" 
          className="not-found-image"
        />
        <h1>404 - Página no encontrada</h1>
        <p>Mar ha buscado en todos los rincones… y confirma que esta página no existe ni en pergamino.</p>
        <button 
          className="not-found-btn"
          onClick={() => navigate('/homepage')}
        >
          Volver a Home
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
