import { Box, CircularProgress } from "@mui/material";

export const Loader = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexGrow={1}
    marginBottom="100px"
  >
    <CircularProgress size="48px" />
  </Box>
);
