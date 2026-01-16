const API_URL = "http://localhost:3000/api";

/**
 * Intenta renovar el token usando el refreshToken
 */
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${API_URL}/auth/updatePrincipalToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": refreshToken,
      },
    });

    const data = await response.json();

    if (data.status === "Success" && data.token) {
      // Guardar el nuevo token
      localStorage.setItem("token", data.token);
      return data.token;
    } else {
      // Si falla la renovación, lanzar error
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      const error = new Error("Token refresh failed");
      error.type = "AUTH_ERROR";
      throw error;
    }
  } catch (error) {
    // Si falla, limpiar y lanzar error
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    error.type = "AUTH_ERROR";
    throw error;
  }
};

/**
 * Wrapper de fetch que:
 * 1. Agrega el token a los headers
 * 2. Si recibe 401, intenta renovar el token y reintentar
 * 3. Si la renovación falla, lanza error con tipo AUTH_ERROR
 */
export const apiClient = async (url, options = {}) => {
  let token = localStorage.getItem("token");

  // Configurar headers por defecto
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Agregar el token si existe
  if (token) {
    headers["auth-token"] = token;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  // Si es 401 (token expirado), intentar renovar
  if (response.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      // Reintentar la request con el nuevo token
      const newHeaders = {
        ...headers,
        "auth-token": newToken,
      };

      response = await fetch(url, {
        ...options,
        headers: newHeaders,
      });
    } catch (error) {
      // Si falla la renovación, relanzar el error
      throw error;
    }
  }

  return response;
};

export default apiClient;
