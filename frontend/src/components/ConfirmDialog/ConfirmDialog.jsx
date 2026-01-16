import React from 'react'
import '../../styles/confirmDialog.css'

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirmar', cancelText = 'Cancelar', isDanger = false }) => {
  if (!isOpen) return null

  return (
    <div className="confirm-dialog-overlay">
      <div className={`confirm-dialog ${isDanger ? 'danger' : ''}`}>
        <div className="confirm-dialog-header">
          <h3>{title}</h3>
        </div>
        
        <div className="confirm-dialog-body">
          <p>{message}</p>
        </div>
        
        <div className="confirm-dialog-footer">
          <button 
            className="confirm-dialog-btn cancel-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`confirm-dialog-btn confirm-btn ${isDanger ? 'danger-btn' : ''}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
