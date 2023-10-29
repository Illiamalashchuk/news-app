import axios from "axios";
import {
  NewsDataArticle,
  NewsDataCategory,
  NewsDataSource,
  SourceType,
} from "../types";
import { ArticleResponse, ArticleRequestParams } from "./types";

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
    page,
  }: ArticleRequestParams<NewsDataCategory, string>): ArticleResponse<
    NewsDataArticle,
    string
  > {
    const result = await axiosInstance.get<{
      totalResults: number;
      results: NewsDataArticle[];
      nextPage: string;
    }>(ROUTES.ARTICLES, {
      params: {
        apikey: API_KEY,
        language: "en",
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
