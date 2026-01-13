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

    if (!response.ok) {
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

    if (!response.ok) {
      throw new Error(data.message || "Error en el login");
    }

    // Guardar userData en localStorage
    if (data.userData) {
      localStorage.setItem("userData", JSON.stringify(data.userData));
    }

    return data;
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};


