export async function getAllBooks() {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/books/', {
            headers: {
                'auth-token': token || ''
            }
        });
        
        if (response.status === 401) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: 401,
                message: errorData.message || 'Sesión expirada. Por favor inicia sesión nuevamente.',
                type: 'AUTH_ERROR'
            };
        }
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Error ${response.status}`);
        }
        
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error('Error al obtener libros:', error);
        throw error;
    }
}

// Obtener biblioteca del usuario
export async function getUserLibrary(userId) {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`/api/books/biblioteca/${userId}`, {
            headers: {
                'auth-token': token || ''
            }
        });
        
        if (response.status === 401) {
            throw {
                status: 401,
                type: 'AUTH_ERROR'
            };
        }
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener biblioteca:', error);
        throw error;
    }
}

// Agregar libro a la biblioteca
export async function addBookToLibrary(userId, book, status) {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`/api/books/biblioteca/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token || ''
            },
            body: JSON.stringify({ book, status })
        });
        
        if (response.status === 401) {
            throw {
                status: 401,
                type: 'AUTH_ERROR'
            };
        }
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al agregar libro:', error);
        throw error;
    }
}

// Actualizar estado o favorito de un libro
export async function updateBook(userId, book, newStatus, isFavorite) {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`/api/books/biblioteca/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token || ''
            },
            body: JSON.stringify({ book, newStatus, isFavorite })
        });
        
        if (response.status === 401) {
            throw {
                status: 401,
                type: 'AUTH_ERROR'
            };
        }
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar libro:', error);
        throw error;
    }
}

// Remover libro de la biblioteca
export async function removeBookFromLibrary(userId, book, section) {
    try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`/api/books/biblioteca/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token || ''
            },
            body: JSON.stringify({ book, section })
        });
        
        if (response.status === 401) {
            throw {
                status: 401,
                type: 'AUTH_ERROR'
            };
        }
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al remover libro:', error);
        throw error;
    }
}