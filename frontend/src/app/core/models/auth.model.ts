export interface LoginPayload {
  email:    string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user:  { name: string; email: string };
}