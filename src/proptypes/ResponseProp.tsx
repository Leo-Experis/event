interface MyResponse {
  status_code: number;
  data: string;
}

interface ErrorResponse {
  error: boolean;
  error_code: number;
  data: string;
}

interface OnSaveResponse {
  status: number;
  base64Image: string;
}

export type { MyResponse, ErrorResponse, OnSaveResponse };
