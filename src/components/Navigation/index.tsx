import React, { useMemo, useState } from "react";
import { Box, Drawer, Fab } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { API, CategoryType, DateRange } from "@/types";
import { API_MAP } from "@/constants";

import { AppBar } from "../AppBar";
import { Filters, OnApplyType } from "../Filters";

import {
  FilterFloatButton,
  MobileNavigation,
  StyledNavContainer,
  StyledNavItem,
} from "./styled";

const NAV_ITEMS = Object.entries(API_MAP).map(([key, item]) => (
  <StyledNavItem key={key} value={key} icon={item.icon} showLabel={false} />
));

type Props = {
  api: API;
  category: CategoryType | string;
  source: string[];
  range: DateRange | null;
  onSearchChange: (value: string) => void;
  onApiChange: (value: API) => void;
  onApply: OnApplyType;
};

export const Navigation: React.FC<Props> = ({
  api,
  category,
  source,
  range,
  onSearchChange,
  onApiChange,
  onApply,
}) => {
  const [drawer, setDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setDrawer(true);
  };

  const handleDrawerClose = () => {
    setDrawer(false);
  };

  const handleApiChange = (_event: React.SyntheticEvent, newValue: API) => {
    onApiChange(newValue);
  };

  const handleApply: OnApplyType = (values) => {
    onApply(values);
    handleDrawerClose();
  };

  const badgeContent = useMemo(
    () => [category, source.length, range].filter(Boolean).length,
    [category, source, range]
  );

  const apiData = API_MAP[api];

  return (
    <>
      <AppBar onChange={onSearchChange} />

      <MobileNavigation elevation={1}>
        <StyledNavContainer value={api} onChange={handleApiChange}>
          {NAV_ITEMS}
        </StyledNavContainer>

        <FilterFloatButton color="error" badgeContent={badgeContent}>
          <Fab color="primary" size="medium" onClick={handleDrawerOpen}>
            <FilterListIcon />
          </Fab>
        </FilterFloatButton>
      </MobileNavigation>

      <Drawer anchor="right" open={drawer} onClose={handleDrawerClose}>
        <Box width="280px" height="100%" padding="12px" paddingBottom="24px">
          <Filters
            api={api}
            categories={apiData?.categories}
            category={category}
            source={source}
            range={range}
            loadSources={apiData?.api.sources}
            onApply={handleApply}
          />
        </Box>
      </Drawer>
    </>
  );
};
