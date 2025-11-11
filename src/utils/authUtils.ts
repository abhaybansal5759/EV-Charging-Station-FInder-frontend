// Utility functions for handling authentication

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  access_token?: string;
  user?: User;
  error?: string;     // ✅ added
  message?: string;   // ✅ added
}

// Logout
export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("access_token");
  window.location.href = "/login";
}

// Save auth data
export function saveAuth(authData: AuthResponse): void {
  if (authData.access_token) {
    localStorage.setItem("access_token", authData.access_token);
  }
  if (authData.user) {
    localStorage.setItem("user", JSON.stringify(authData.user));
  }
}

// Get access token
export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

// Get user
export function getUser(): User | null {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// Clear auth (logout)
export function clearAuth(): void {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user");
}

// Check auth status
export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
