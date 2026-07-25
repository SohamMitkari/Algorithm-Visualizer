const API_BASE = "https://algorithm-visualizer-backend-uhx4.onrender.com/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...options.headers };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Request failed");
  }
  return data;
}

export const api = {
  register: (email, password) =>
    request("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) }),

  login: (email, password) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  getSavedArrays: () => request("/saved-arrays"),

  saveArray: (name, values) =>
    request("/saved-arrays", { method: "POST", body: JSON.stringify({ name, values }) }),

  deleteArray: (id) => request(`/saved-arrays/${id}`, { method: "DELETE" }),
};