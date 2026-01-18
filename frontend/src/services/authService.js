const API_URL = "http://localhost:3000/api/auth";

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${API_URL}/updatePrincipalToken`, {
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

export const signup = async (userData) => {
  try {
    const response = await makeRequest(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
    });

    const data = await response.json();

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
    const response = await makeRequest(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.status === "Failed" || !response.ok) {
      throw new Error(data.message || "Error en el login");
    }

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


