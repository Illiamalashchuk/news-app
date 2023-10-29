import { DateRange } from "../types";

export type ArticleRequestParams<C> = {
  query?: string;
  category?: C | string;
  source?: string[];
  range: DateRange | null;
  page: string | number;
};

export type ArticleResponse<A, P> = Promise<{
  articles: A[];
  total: number;
  nextPage: P;
}>;
