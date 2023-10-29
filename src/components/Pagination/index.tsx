import React from "react";

import { Button, CircularProgress } from "@mui/material";
import { StyledBox } from "./styled";

type Props = {
  total: number;
  count: number;
  loading: boolean;
  loadMore: () => void;
};

export const Pagination: React.FC<Props> = ({
  total,
  count,
  loading,
  loadMore,
}) => {
  if (total === count && !loading && count === 0) {
    return null;
  }

  if (loading && count > 0) {
    return (
      <StyledBox>
        <CircularProgress size="24px" />
      </StyledBox>
    );
  }

  return (
    <StyledBox>
      <Button
        variant="text"
        disabled={count > 0 && count === total}
        onClick={loadMore}
      >
        More
      </Button>
    </StyledBox>
  );
};
