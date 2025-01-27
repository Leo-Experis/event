interface MyResponse {
  status_code: number;
  data: string;
}

interface MyErrorResponse {
  error: boolean;
  status_code: number;
  message: string;
}

interface OnSaveResponse {
  status: number;
  base64Image: string;
}

export type { MyResponse, MyErrorResponse, OnSaveResponse };
