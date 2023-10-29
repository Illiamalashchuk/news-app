export type ArticleRequestParams<C, P> = {
  query?: string;
  category?: C | string;
  source?: string[];
  page: P;
};

export type ArticleResponse<A, P> = Promise<{
  articles: A[];
  total: number;
  nextPage: P;
}>;
