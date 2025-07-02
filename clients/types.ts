export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface AuthToken {
  token: string;
  expiresAt: string;
} 