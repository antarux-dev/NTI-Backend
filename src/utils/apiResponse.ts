export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  timestamp: string;
  data?: T;
}

export const createApiResponse = <T>(
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
): ApiResponse<T> => ({
  statusCode,
  success,
  message,
  timestamp: new Date().toISOString(),
  data: data ?? undefined,
});
