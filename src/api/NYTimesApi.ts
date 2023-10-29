import axios from "axios";
import { NYTimesArticle, NYTimesCategory, SourceType } from "../types";
import { ArticleResponse, ArticleRequestParams } from "./types";
import { getDateRanges } from "../utils/getDateRanges";

const API_KEY = import.meta.env.VITE_NY_TIMES_API_KEY;
const API_URL = import.meta.env.VITE_NY_TIMES_API_URL;

const ROUTES = {
  ARTICLES: "/articlesearch.json",
};
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const NYTimesApi = {
  async articles({
    query,
    category,
    source,
    range,
    page,
  }: ArticleRequestParams<NYTimesCategory>): ArticleResponse<
    NYTimesArticle,
    number
  > {
    const ranges = getDateRanges();
    const result = await axiosInstance.get<{
      response: { docs: NYTimesArticle[]; meta: { hits: number } };
    }>(ROUTES.ARTICLES, {
      params: {
        "api-key": API_KEY,
        ...(query ? { q: query } : {}),
        ...(category ? { "news_desk.contains": category } : {}),
        ...(source?.length ? { source: source?.join(",") } : {}),
        ...(range && ranges[range]
          ? {
              begin_date: ranges[range].from.format("YYYY-MM-DD HH:mm:ss"),
              end_date: ranges[range].to.format("YYYY-MM-DD HH:mm:ss"),
            }
          : {}),
        ...(!page ? {} : { page }),
      },
    });
    return {
      articles: result.data.response.docs,
      total: result.data.response.meta.hits,
      nextPage: (page as number) + 1,
    };
  },
  async sources(): Promise<SourceType[]> {
    return [{ value: "The New York Times", label: "The New York Times" }];
  },
};
