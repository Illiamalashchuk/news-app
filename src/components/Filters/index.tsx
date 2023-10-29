import React, { useEffect, useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

import { useBanner } from "../../contexts/bannerContext";
import { getApiError } from "../../utils/getApiError";
import { API, CategoryType, DateRange, SourceType } from "../../types";

import { Select } from "../Select";
import { MultiSelect } from "../MultiSelect";
import { Loader } from "../Loader";

export type OnApplyType = ({
  category,
  source,
  range,
}: {
  category: CategoryType | "";
  source: string[];
  range: DateRange | null;
}) => void;

type Props = {
  api: API;
  categories: CategoryType[];
  category: CategoryType | string;
  source: string[];
  range: DateRange | null;
  loadSources: () => Promise<SourceType[]>;
  onApply: OnApplyType;
};

export const Filters: React.FC<Props> = ({
  api,
  categories,
  category: defaultCategory,
  source: defaultSource,
  range: defaultRange,
  loadSources,
  onApply,
}) => {
  const { setBanner } = useBanner();

  const [category, setCategory] = useState(defaultCategory);
  const [source, setSource] = useState<string[]>(defaultSource);
  const [dateRange, setDateRange] = useState<DateRange | null>(defaultRange);
  const [sources, setSources] = useState<SourceType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCategoryChange = (value: string) => {
    setCategory(value as CategoryType);
  };

  const handleSourceChange = (value: string[]) => {
    setSource(value);
  };

  const handleRangeChange = (value: string) => {
    setDateRange(value as DateRange);
  };

  const handleApply = () => {
    onApply({ category: category as CategoryType, source, range: dateRange });
  };

  const handleReset = () => {
    setCategory("");
    setSource([]);
    setSources([]);
    onApply({ category: "", source: [], range: null });
  };

  const fetchSources = async () => {
    try {
      setLoading(true);
      const result = await loadSources();

      setSources(result);
    } catch (error) {
      const message = getApiError(error);
      setBanner({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSources();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  return (
    <Stack height="100%" display="flex" justifyContent="space-between">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Stack gap="24px">
            <Typography variant="h5">Filters</Typography>

            <Select
              label="Category"
              value={category}
              options={categories}
              onChange={handleCategoryChange}
            />
            <MultiSelect
              label="Source"
              options={sources}
              value={source}
              onChange={handleSourceChange}
            />
            <Select
              label="Date range"
              value={dateRange || ""}
              options={Object.values(DateRange)}
              onChange={handleRangeChange}
            />
          </Stack>

          <Stack display="flex" flexDirection="row" gap="12px">
            <Button variant="contained" onClick={handleApply}>
              Apply
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
};
