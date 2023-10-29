import {
  Article,
  NYTimesArticle,
  NewsApiArticle,
  NewsDataArticle,
} from "../types";

export function formatNewsApiArticle(data: NewsApiArticle): Article {
  return {
    title: data.title,
    description: data.description,
    content: data.content,
    author: data.author,
    origin: data.url,
    image: data.urlToImage || "",
    publishedAt: data.publishedAt,
  };
}

export function formatNewsDataArticle(data: NewsDataArticle): Article {
  return {
    title: data.title,
    description: data.description,
    content: data.content,
    author: data.creator?.[0] || "",
    origin: data.link,
    image: data.image_url || "",
    publishedAt: data.pubDate,
  };
}

export function formatNYTimesArticle(data: NYTimesArticle): Article {
  return {
    title: data.abstract,
    description: data.snippet,
    content: data.lead_paragraph,
    author: "",
    origin: data.web_url,
    image: data.multimedia?.[0]?.url
      ? "https://www.nytimes.com/" + data.multimedia?.[0]?.url
      : "",
    publishedAt: data.pub_date,
  };
}
