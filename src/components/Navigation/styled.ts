import {
  Paper,
  Badge,
  styled,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";

export const MobileNavigation = styled(Paper)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px 0;
  z-index: 1;
`;

export const FilterFloatButton = styled(Badge)`
  position: absolute;
  bottom: 70px;
  right: 15px;
`;

export const StyledNavContainer = styled(BottomNavigation)`
  padding: 0 10px;
`;

export const StyledNavItem = styled(BottomNavigationAction)(
  ({ theme }) => `
    &.Mui-selected {
      width: 100px;
      border-radius: 8px;
      box-shadow: 0 0 0 3px ${theme.palette.divider};
    }
  `
);
