import { Box, Stack, styled } from "@mui/material";

export const StyledContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 56px 0;
  overflow: hidden;
`;

export const StyledContent = styled(Stack)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 12px;
`;
