import axios from "axios";
import {
  NewsDataArticle,
  NewsDataCategory,
  NewsDataSource,
  SourceType,
} from "../types";
import { ArticleResponse, ArticleRequestParams } from "./types";
import { getDateRanges } from "../utils/getDateRanges";

const API_KEY = import.meta.env.VITE_NEWS_DATA_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_DATA_API_URL;

const ROUTES = {
  ARTICLES: "/news",
  SOURCES: "/sources",
};
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const newsDataApi = {
  async articles({
    query,
    category,
    source,
    range,
    page,
  }: ArticleRequestParams<NewsDataCategory>): ArticleResponse<
    NewsDataArticle,
    string
  > {
    const ranges = getDateRanges();
    const result = await axiosInstance.get<{
      totalResults: number;
      results: NewsDataArticle[];
      nextPage: string;
    }>(ROUTES.ARTICLES, {
      params: {
        apikey: API_KEY,
        language: "en",
        timeframe: range && ranges[range].timeframe,
        ...(query ? { q: query } : {}),
        ...(category ? { category } : {}),
        ...(source?.length ? { domain: source?.join(",") } : {}),
        ...(!page ? {} : { page }),
      },
    });

    return {
      articles: result.data.results,
      total: result.data.totalResults,
      nextPage: result.data.nextPage,
    };
  },
  async sources(): Promise<SourceType[]> {
    const result = await axiosInstance.get<{ results: NewsDataSource[] }>(
      ROUTES.SOURCES,
      {
        params: { apikey: API_KEY, language: "en" },
      }
    );

    return result.data.results.map((el) => ({ value: el.id, label: el.name }));
  },
};
