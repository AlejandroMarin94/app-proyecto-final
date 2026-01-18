const API_URL = "http://localhost:3000/api/user";

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch("http://localhost:3000/api/auth/updatePrincipalToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": refreshToken,
      },
    });

    const data = await response.json();

    if (data.status === "Success" && data.token) {
      localStorage.setItem("token", data.token);
      return data.token;
    } else {
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      const error = new Error("Token refresh failed");
      error.type = "AUTH_ERROR";
      throw error;
    }
  } catch (error) {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    error.type = "AUTH_ERROR";
    throw error;
  }
};

const makeRequest = async (url, options = {}) => {
  let token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["auth-token"] = token;
  }

  let response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    const newHeaders = {
      ...headers,
      "auth-token": newToken,
    };

    response = await fetch(url, {
      ...options,
      headers: newHeaders,
    });
  }

  return response;
};

export const getUserData = async (userId) => {
  try {
    const response = await makeRequest(`${API_URL}/${userId}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getUserData:", error);
    throw error;
  }
};

export const updateUserData = async (userId, userData) => {
  try {
    const response = await makeRequest(`${API_URL}/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar datos del usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en updateUserData:", error);
    throw error;
  }
};

export const deleteUserAccount = async (userId) => {
  try {
    const response = await makeRequest(`${API_URL}/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar cuenta");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en deleteUserAccount:", error);
    throw error;
  }
};
