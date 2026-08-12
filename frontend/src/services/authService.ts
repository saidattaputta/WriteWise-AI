import api from "./api";


export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
}


export interface LoginRequest {
  email: string;
  password: string;
}


export interface TokenResponse {
  access_token: string;
  token_type: string;
}


export interface User {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
}


/*
 * Register a new user.
 */
export async function registerUser(
  data: RegisterRequest,
) {
  const response = await api.post(
    "/auth/register",
    data,
  );

  return response.data;
}


/*
 * Login and store JWT.
 */
export async function loginUser(
  data: LoginRequest,
): Promise<TokenResponse> {
  const response = await api.post<TokenResponse>(
    "/auth/login",
    data,
  );

  const token = response.data.access_token;

  localStorage.setItem(
    "access_token",
    token,
  );

  return response.data;
}


/*
 * Get currently authenticated user.
 */
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<User>(
    "/auth/me",
  );

  return response.data;
}


/*
 * Logout.
 */
export function logoutUser() {
  localStorage.removeItem(
    "access_token",
  );
}


/*
 * Check whether a JWT exists.
 */
export function isAuthenticated(): boolean {
  return Boolean(
    localStorage.getItem("access_token"),
  );
}