import { AuthResponse } from "../utils/authUtils";

export const API = "http://localhost:8080/auth";

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {

  // 🚨 FRONTEND VALIDATION
  if (!payload.name.trim()) {
    throw new Error("Name is required");
  }

  if (!payload.email.includes("@")) {
    throw new Error("Invalid email address");
  }

  if (payload.password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }


  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
        const msg = await res.text();
    throw new Error("Registration failed"+msg);
  }
  
  return res.json();
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  if (!res.ok) {
    throw new Error("Login failed");
  }
  
  return res.json();
}