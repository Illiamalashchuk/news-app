import { AppBar, Box, InputBase, alpha, styled } from "@mui/material";

export const StyledAppBar = styled(AppBar)`
  height: 56px;
  top: 0;
  left: 0;
  padding: 12px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  z-index: 10;
`;

export const SearchContainer = styled(Box)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 0;
  border-radius: ${theme.shape.borderRadius}px;
  background-color: ${alpha(theme.palette.common.white, 0.15)};

  &:hover: {
    background-color: ${alpha(theme.palette.common.white, 0.25)};
  };
  
  ${theme.breakpoints.up("md")} {
    width: 226px;
  }
`
);

export const StyledInputBase = styled(InputBase)`
  color: inherit;
  width: 100%;
  padding: 0 8px;

  & .MuiInputBase-input {
    padding-left: 8px;
  }
`;
