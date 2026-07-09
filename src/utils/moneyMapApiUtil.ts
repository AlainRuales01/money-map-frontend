import type { ApiError } from "@/types/api/ApiError";

export const getApiResponseMessageError = (error: unknown): string => {
  return (
    error && typeof error === 'object' && 'message' in error
      ? (error as ApiError).message
      : 'An unexpected error occurred.'
  );
};