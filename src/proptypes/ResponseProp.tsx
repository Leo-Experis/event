interface MyResponse<T = string | object> {
  status_code: number;
  data: T;
}

interface MyErrorResponse extends MyResponse {
  error: boolean;
  data: string;
}

interface OnSaveResponse {
  status: number;
  base64Image: string;
}

export type { MyResponse, MyErrorResponse, OnSaveResponse };
