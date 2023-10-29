import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Router } from "./navigation/routes";
import "./App.css";
import { BannerProvider } from "./contexts/bannerContext";

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BannerProvider>
        <Router />
      </BannerProvider>
    </ThemeProvider>
  );
}

export default App;
