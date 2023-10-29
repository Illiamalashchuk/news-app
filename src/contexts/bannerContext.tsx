import { Alert, AlertColor, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

type BannerType = {
  type: AlertColor;
  message: string;
} | null;

type SetBannerType = (banner: BannerType) => void;
export const BannerContext = createContext<{
  banner: BannerType;
  setBanner: SetBannerType;
}>({ banner: null, setBanner: () => {} });

type Props = {
  children: React.ReactNode;
};
export const BannerProvider: React.FC<Props> = ({ children }) => {
  const [banner, setBanner] = useState<BannerType>(null);

  const handleClose = () => {
    setBanner(null);
  };

  return (
    <BannerContext.Provider value={{ banner, setBanner }}>
      {banner?.type ? (
        <Snackbar
          open={Boolean(banner?.type)}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleClose} variant="filled" severity={banner?.type}>
            {banner?.message}
          </Alert>
        </Snackbar>
      ) : null}
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => useContext(BannerContext);
