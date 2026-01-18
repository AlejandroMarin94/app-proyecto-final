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