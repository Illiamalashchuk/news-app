import { ReactComponent as NewsAPIIcon } from "@/assets/icons/NewsAPI.svg";
import { ReactComponent as NYTimesIcon } from "@/assets/icons/NewYorkTimes.svg";
import { ReactComponent as NewsDataIcon } from "@/assets/icons/NewsDataIO.svg";

import {
  API,
  NYTimesCategory,
  NewsApiCategory,
  NewsDataCategory,
} from "@/types";
import { newsApi } from "@/api/newsApi";
import { NYTimesApi } from "@/api/NYTimesApi";
import { newsDataApi } from "@/api/newsData";
import {
  formatNYTimesArticle,
  formatNewsApiArticle,
  formatNewsDataArticle,
} from "@/utils/formatArticle";

export const DATE_FORMAT = "MMM D, YYYY";

export const API_MAP = {
  [API.NYTimes]: {
    api: NYTimesApi,
    categories: Object.values(NYTimesCategory),
    formatArticle: formatNYTimesArticle,
    label: "The New York Time",
    icon: <NYTimesIcon height={30} width={30} />,
  },
  [API.NewsApi]: {
    api: newsApi,
    categories: Object.values(NewsApiCategory),
    formatArticle: formatNewsApiArticle,
    label: "News API",
    icon: <NewsAPIIcon height={40} width={80} />,
  },
  [API.NewsData]: {
    api: newsDataApi,
    categories: Object.values(NewsDataCategory),
    formatArticle: formatNewsDataArticle,
    label: "NewsData.IO",
    icon: <NewsDataIcon height={30} width={30} />,
  },
};
