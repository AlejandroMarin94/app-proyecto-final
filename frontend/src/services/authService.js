const API_URL = "http://localhost:3000/api/auth";


export const signup = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    // Verificar si el backend devolvió un error (status: "Failed")
    if (data.status === "Failed" || !response.ok) {
      throw new Error(data.message || "Error en el registro");
    }

    return data;
  } catch (error) {
    console.error("Error en signup:", error);
    throw error;
  }
};


export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    // Verificar si el backend devolvió un error (status: "Failed")
    if (data.status === "Failed" || !response.ok) {
      throw new Error(data.message || "Error en el login");
    }

    // Guardar userData, token y refreshToken en localStorage
    if (data.userData) {
      localStorage.setItem("userData", JSON.stringify(data.userData));
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    if (data.refreshToken) {
      localStorage.setItem("refreshToken", data.refreshToken);
    }

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};


