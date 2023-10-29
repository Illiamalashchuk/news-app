import React, { ChangeEvent } from "react";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { PAGES } from "../../navigation/constants";
import { useDebounce } from "../../hooks/useDebounce";
import {
  SearchContainer,
  StyledAppBar,
  StyledInputBase,
  StyledLink,
} from "./styled";

type Props = {
  onChange?: (value: string) => void;
};

export const AppBar: React.FC<Props> = ({ onChange }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange?.(e.target.value);
  };

  const debouncedChange = useDebounce(handleChange);

  return (
    <StyledAppBar position="fixed">
      <StyledLink to={PAGES.ROOT}>
        <Typography variant="h5">News</Typography>
      </StyledLink>
      {onChange && (
        <SearchContainer>
          <StyledInputBase
            startAdornment={<SearchIcon />}
            placeholder="Search…"
            onChange={debouncedChange}
          />
        </SearchContainer>
      )}
    </StyledAppBar>
  );
};
