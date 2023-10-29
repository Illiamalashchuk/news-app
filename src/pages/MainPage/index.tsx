import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { API_MAP } from "../../constants";
import {
  API,
  ArticleType,
  CategoryType,
  NYTimesArticle,
  NewsApiArticle,
  NewsDataArticle,
} from "../../types";
import { useBanner } from "../../contexts/bannerContext";
import { Layout } from "../../components/Layout";
import { Article } from "../../components/Article";
import { Navigation } from "../../components/Navigation";
import { Loader } from "../../components/Loader";
import { EmptyState } from "../../components/EmptyState";
import { Pagination } from "../../components/Pagination";

export const MainPage: React.FC = () => {
  const { setBanner } = useBanner();

  const [api, setApi] = useState(API.NYTimes);
  const [category, setCategory] = useState<CategoryType | string>("");
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<string[]>([]);
  const [articles, setArticles] = useState<
    Array<NewsApiArticle | NewsDataArticle | NYTimesArticle>
  >([]);
  const [nextPage, setNextPage] = useState<number | string | null>(null);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const apiData = API_MAP[api];

  const handleApply = (values: {
    category: CategoryType | "";
    source: string[];
  }) => {
    setCategory(values.category);
    setSource(values.source);
  };

  const handleReset = () => {
    setArticles([]);
    handleApply({ category: "", source: [] });
    setNextPage(null);
    setTotal(0);
  };

  const handleApiChange = (value: API) => {
    handleReset();
    setApi(value);
  };

  const fetchArticles = async () => {
    if (articles.length && articles.length === total) {
      return;
    }

    try {
      setLoading(true);
      const result = await apiData.api.articles({
        query: search,
        category,
        source,
        page: nextPage,
      });

      setArticles([...articles, ...result.articles]);
      setTotal(result.total);
      setNextPage(result.nextPage);
    } catch (error: unknown) {
      const message = (error as AxiosError).response?.data?.message;
      setBanner({ type: "error", message: message || error?.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchArticles();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return (
    <Layout
      navigation={
        <Navigation
          api={api}
          category={category}
          source={source}
          onSearchChange={setSearch}
          onApiChange={handleApiChange}
          onApply={handleApply}
        />
      }
      footer={
        <Pagination
          total={total}
          count={articles.length}
          loading={loading}
          loadMore={fetchArticles}
        />
      }
      loader={loading && !articles.length ? <Loader /> : null}
      empty={!loading && !articles.length ? <EmptyState /> : null}
    >
      {articles.length
        ? articles.map((el) => {
            const data = apiData?.formatArticle(el as ArticleType);
            return (
              <Article
                key={data.origin + data.title}
                title={data.title}
                description={data.description}
                content={data.content}
                origin={data.origin}
                image={data.image}
                publishedAt={data.publishedAt}
                author={data.author}
              />
            );
          })
        : null}
    </Layout>
  );
};
