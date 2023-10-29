import { useEffect, useState } from "react";

import { API_MAP } from "@/constants";
import { getApiError } from "@/utils/getApiError";
import {
  API,
  ArticleType,
  CategoryType,
  DateRange,
  NYTimesArticle,
  NewsApiArticle,
  NewsDataArticle,
} from "@/types";
import { useBanner } from "@/contexts/bannerContext";
import { Layout } from "@/components/Layout";
import { Article } from "@/components/Article";
import { Navigation } from "@/components/Navigation";
import { Loader } from "@/components/Loader";
import { EmptyState } from "@/components/EmptyState";
import { Pagination } from "@/components/Pagination";

export const MainPage: React.FC = () => {
  const { setBanner } = useBanner();

  const [api, setApi] = useState(API.NYTimes);

  // filter properties
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryType | string>("");
  const [source, setSource] = useState<string[]>([]);
  const [range, setRange] = useState<DateRange | null>(null);

  const [articles, setArticles] = useState<
    Array<NewsApiArticle | NewsDataArticle | NYTimesArticle>
  >([]);

  // pagination properties
  const [nextPage, setNextPage] = useState<number | string>(0);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);

  const apiData = API_MAP[api];

  const handleApply = (values: {
    category: CategoryType | "";
    source: string[];
    range: DateRange | null;
  }) => {
    setCategory(values.category);
    setSource(values.source);
    setRange(values.range);
  };

  const handleReset = () => {
    setArticles([]);
    handleApply({ category: "", source: [], range: null });
    setNextPage(0);
    setTotal(0);
  };

  const handleApiChange = (value: API) => {
    handleReset();
    setApi(value);
  };

  const fetchArticles = async (filtering: boolean) => {
    if (articles.length && articles.length === total && !filtering) {
      return;
    }

    try {
      setLoading(true);
      const result = await apiData.api.articles({
        query: search,
        category,
        source,
        range,
        page: (filtering ? 0 : nextPage) as string | number,
      });

      setArticles(
        filtering ? result.articles : [...articles, ...result.articles]
      );
      setTotal(result.total);

      setNextPage(result.nextPage);
    } catch (error: unknown) {
      const message = getApiError(error);
      setBanner({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      // only filtering
      await fetchArticles(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, search, category, source, range]);

  return (
    <Layout
      navigation={
        <Navigation
          api={api}
          category={category}
          source={source}
          range={range}
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
          // only go next (with filters)
          loadMore={() => fetchArticles(false)}
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
