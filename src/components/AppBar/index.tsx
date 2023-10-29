import React, { ChangeEvent } from "react";
import { Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useDebounce } from "../../hooks/useDebounce";
import { SearchContainer, StyledAppBar, StyledInputBase } from "./styled";

type Props = {
  onChange: (value: string) => void;
};

export const AppBar: React.FC<Props> = ({ onChange }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  const debouncedChange = useDebounce(handleChange);

  return (
    <StyledAppBar position="fixed">
      <Typography variant="h5">News</Typography>
      <SearchContainer>
        <StyledInputBase
          startAdornment={<SearchIcon />}
          placeholder="Search…"
          onChange={debouncedChange}
        />
      </SearchContainer>
    </StyledAppBar>
  );
};
