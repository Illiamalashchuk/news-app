import { Box, Typography } from "@mui/material";
import { AppBar } from "@/components/AppBar";
import { Layout } from "@/components/Layout";

export const NotFoundPage: React.FC = () => {
  return (
    <Layout navigation={<AppBar />}>
      <Box
        display="flex"
        marginTop="30%"
        flexGrow={1}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">There is no such page</Typography>
      </Box>
    </Layout>
  );
};
