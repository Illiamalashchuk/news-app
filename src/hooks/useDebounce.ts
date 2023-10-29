import { ChangeEvent, useCallback } from "react";
import debounce from "lodash.debounce";
import { DebounceSettings } from "lodash";

export const useDebounce = <
  T extends (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
>(
  callback: T,
  delay = 300,
  options?: DebounceSettings
): T => {
  return useCallback(debounce(callback, delay, options), []) as unknown as T;
};
