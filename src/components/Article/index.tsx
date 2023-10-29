import React from "react";
import { Link as RouterLink } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Link,
  Stack,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material";

import { Article as ArticleType } from "../../types";
import { DATE_FORMAT } from "../../constants";

export const Article: React.FC<ArticleType> = ({
  title,
  description,
  author,
  origin,
  image,
  publishedAt,
}) => {
  return (
    <Card
      sx={{
        width: {
          xs: "100%",
          sm: "calc(50% - 6px)",
          md: "calc(33% - 8px)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        subheader={author}
      />

      <Box
        height="200px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {image ? (
          <CardMedia
            component="img"
            height="200px"
            image={image}
            alt="Article image"
            sx={{ padding: "0 12px" }}
          />
        ) : (
          <Typography variant="caption">No image</Typography>
        )}
      </Box>

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Box height="8px" />

        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Link
            component={RouterLink}
            to={origin}
            variant="overline"
            target="_blank"
          >
            Read more
          </Link>
          <Typography variant="body2" color="text.secondary">
            {dayjs(publishedAt).format(DATE_FORMAT)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
