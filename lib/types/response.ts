import { ResponseError } from "./error";

export interface Response<T> {
  data: T;
  error: ResponseError | null;
}