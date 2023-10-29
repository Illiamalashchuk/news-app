import { AxiosError } from "axios";

export function getApiError(error: unknown) {
  const errorResponse = (error as AxiosError).response;
  const message = (errorResponse?.data as { message: string })?.message;

  return message || (error as { message: string })?.message;
}
