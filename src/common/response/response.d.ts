export interface ResponseAPI {
  data?: object | Array<object> | null,
  statusCode: number,
  message: string,
  meta?: string
}