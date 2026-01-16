import React, { useState, useEffect } from 'react'
import '../styles/perfilPage.css'

const PerfilPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    age: '',
    email: '',
    role: '',
    isActive: '',
  })

  const [isEditing, setIsEditing] = useState(false)

  // Cargar datos del usuario desde localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('userData')
    if (savedData) {
      setUserData(JSON.parse(savedData))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(userData))
    setIsEditing(false)
    // Aqui es donde voy a hacer la llamada a la API para guardar los cambios en el backend
  }

  return (
    <div className="perfil-page-container">
      <div className="section-perfil">
        <div className="perfil-header">
          <h2>Mi Perfil</h2>
          <button 
            className="btn-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
        </div>

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
      </div>
    </div>
  )
}

export default PerfilPage
