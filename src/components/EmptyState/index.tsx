import React from "react";

import { Stack, Typography } from "@mui/material";

export const EmptyState: React.FC = () => (
  <Stack
    display="flex"
    alignItems="center"
    justifyContent="center"
    overflow="hidden"
    flexGrow={1}
  >
    <Typography variant="h4">No articles</Typography>
    <Typography variant="body2">Try another filter params or search</Typography>
  </Stack>
);
