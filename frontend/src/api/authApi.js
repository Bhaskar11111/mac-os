const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authRequest = async (path, body) => {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Authentication failed");
  }

  return data.data;
};

export const registerUser = (payload) => authRequest("/api/auth/register", payload);
export const loginUser = (payload) => authRequest("/api/auth/login", payload);

export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Unable to fetch user");
  }

  return data.data.user;
};

export const logoutUser = async () => {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
};
