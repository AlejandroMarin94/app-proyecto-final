export async function getAllBooks() {
    try {
        console.log('Obteniendo todos los libros');
        const response = await fetch('/api/books/');
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
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
        console.error('Error en getAllBooks:', error.message);
        throw error;
    }
}

export async function searchNewBooks(query = '') {
    try {
        console.log('Buscando libros con query:', query);
        const response = await fetch(`/api/books/search?query=${encodeURIComponent(query)}`);
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
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
        console.error('Error en searchNewBooks:', error.message);
        throw error;
    }
} 