import axios from "axios";
import {
  NewsApiArticle,
  NewsApiCategory,
  NewsApiSource,
  SourceType,
} from "../types";
import { ArticleResponse, ArticleRequestParams } from "./types";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = import.meta.env.VITE_NEWS_API_URL;

const ROUTES = {
  ARTICLES: "/top-headlines",
  SOURCES: "/top-headlines/sources",
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const newsApi = {
  async articles({
    query,
    category,
    source,
    page,
  }: ArticleRequestParams<NewsApiCategory, number>): ArticleResponse<
    NewsApiArticle,
    number
  > {
    const result = await axiosInstance.get<{
      totalResults: number;
      articles: NewsApiArticle[];
    }>(ROUTES.ARTICLES, {
      params: {
        apiKey: API_KEY,
        ...(query ? { q: query } : {}),
        ...(category ? { category } : {}),
        ...(source?.length ? { source: source?.join(",") } : {}),
        ...(!page ? {} : { page }),
      },
    });

    return {
      articles: result.data.articles,
      total: result.data.totalResults,
      nextPage: page + 1,
    };
  },
  async sources(): Promise<SourceType[]> {
    const result = await axiosInstance.get<{ sources: NewsApiSource[] }>(
      ROUTES.SOURCES,
      { params: { apiKey: API_KEY } }
    );

    return result.data.sources.map((el) => ({ value: el.id, label: el.name }));
  },
};
