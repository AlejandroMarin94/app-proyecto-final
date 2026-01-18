import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserData, updateUserData } from '../services/userService'
import '../styles/perfilPage.css'

const PerfilPage = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    age: '',
    email: '',
    role: '',
    isActive: '',
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Cargar datos del usuario desde el backend
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const userDataStr = localStorage.getItem('userData')
        
        if (!userDataStr) {
          navigate('/login')
          return
        }

        const userObj = JSON.parse(userDataStr)
        
        const response = await getUserData(userObj._id)
        console.log("respuesta del backend:", response)
        if (response && response.data) {
          console.log("Datos recibidos:"
          localStorage.setItem('userData', JSON.stringify(response.data))
        } else if (response && response.status === "Success") {
          // Fallback en caso de que los datos estén en otro campo
          console.log("Respuesta con status Success:", response)
        } else {
          console.log("Respuesta inesperada:", response)
          setError('Formato de respuesta inesperado')
        }
      } catch (err) {
        console.error("Error completo:", err)
        if (err.type === 'AUTH_ERROR') {
          console.log("Token expirado, redirigiendo a login")
          navigate('/login')
        } else {
          setError(err.message || 'Error al cargar datos del usuario')
          console.error("Error al cargar datos:", err)
        }
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = async () => {
    try {
      const userDataStr = localStorage.getItem('userData')
      if (!userDataStr) {
        navigate('/login')
        return
      }

      const userObj = JSON.parse(userDataStr)
      const dataToUpdate = {
        name: userData.name,
        lastName: userData.lastName,
        age: userData.age
      }

      const response = await updateUserData(userObj._id, dataToUpdate)
      
      if (response.data) {
        setUserData(response.data)
        localStorage.setItem('userData', JSON.stringify(response.data))
      }
      
      setIsEditing(false)
      setError(null)
    } catch (err) {
      if (err.type === 'AUTH_ERROR') {
        navigate('/login')
      } else {
        setError(err.message || 'Error al guardar los cambios')
        console.error("Error al guardar:", err)
      }
    }
  }

  return (
    <div className="perfil-page-container">
      <div className="section-perfil">
        <div className="perfil-header">
          <h2>Mi Perfil</h2>
          <button 
            className="btn-edit"
            onClick={() => setIsEditing(!isEditing)}
            disabled={loading}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

        {loading && <div className="loading">Cargando...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && (
        <div className="perfil-content">
          {isEditing ? (
            <form className="perfil-form">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Edad</label>
                <input
                  type="number"
                  name="age"
                  value={userData.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  disabled
                />
              </div>

              <div className="form-group">
                <label>Rol</label>
                <input
                  type="text"
                  name="role"
                  value={userData.role}
                  disabled
                />
              </div>

              <div className="form-buttons">
                <button 
                  type="button"
                  className="btn-save"
                  onClick={handleSave}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          ) : (
            <div className="perfil-display">
              <div className="perfil-item">
                <span className="label">Nombre:</span>
                <span className="value">{userData.name}</span>
              </div>

              <div className="perfil-item">
                <span className="label">Apellido:</span>
                <span className="value">{userData.lastName}</span>
              </div>

              <div className="perfil-item">
                <span className="label">Edad:</span>
                <span className="value">{userData.age}</span>
              </div>

              <div className="perfil-item">
                <span className="label">Email:</span>
                <span className="value">{userData.email}</span>
              </div>

              <div className="perfil-item">
                <span className="label">Rol:</span>
                <span className="value">{userData.role}</span>
              </div>

              <div className="perfil-item">
                <span className="label">Activo:</span>
                <span className="value">{userData.isActive ? 'Sí' : 'No'}</span>
              </div>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  )
}

export default PerfilPage
