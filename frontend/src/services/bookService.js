export async function getAllBooks() {
    try {
        console.log('Obteniendo todos los libros');
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/books/', {
            headers: {
                'auth-token': token || ''
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        // Manejo específico del token expirado
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
            console.error('Status:', response.status);
            console.error('Error del servidor:', errorData);
            throw new Error(errorData.error || `Error ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data completa:', data);
        
        return data || [];
    } catch (error) {
        console.error('Error en getAllBooks:', error.message || error);
        throw error;
    }
}

export async function searchNewBooks(query = '') {
    try {
        console.log('Buscando libros con query:', query);
        const token = localStorage.getItem('token');
        
        const response = await fetch(`/api/books/search?query=${encodeURIComponent(query)}`, {
            headers: {
                'auth-token': token || ''
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        // Manejo específico del token expirado
        if (response.status === 401) {
            const errorData = await response.json().catch(() => ({}));
            throw {
                status: 401,
                message: errorData.message || 'Sesión expirado. Por favor inicia sesión nuevamente.',
                type: 'AUTH_ERROR'
            };
        }
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Status:', response.status);
            console.error('Error del servidor:', errorData);
            throw new Error(errorData.error || `Error ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data completa:', data);
        
        return data || [];
    } catch (error) {
        console.error('Error en searchNewBooks:', error.message || error);
        throw error;
    }
} 