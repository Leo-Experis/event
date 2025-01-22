interface MyResponse {
  status_code: number;
  data: string;
}

interface ErrorResponse {
  error: boolean;
  error_code: number;
  data: string;
}

export type { MyResponse, ErrorResponse };
