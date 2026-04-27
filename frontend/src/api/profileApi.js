const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getToken = () => localStorage.getItem("token");

const request = async (path, options = {}) => {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const getMyProfile = async () => {
  const data = await request("/api/profile/me");
  return data.data;
};

export const getPublicProfile = async (username) => {
  const data = await request(`/api/profile/${encodeURIComponent(username)}`);
  return data.data;
};

export const saveProfile = async (profile) => {
  const data = await request("/api/profile", {
    method: "POST",
    body: JSON.stringify(profile)
  });

  return data.data.profile;
};

export const updateProfile = async (profile) => {
  const data = await request("/api/profile", {
    method: "PUT",
    body: JSON.stringify(profile)
  });

  return data.data.profile;
};
