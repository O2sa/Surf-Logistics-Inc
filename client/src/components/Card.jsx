import React from "react";
import {
  Box,
  Card,
  Text,
  Title,
  createStyles,
  getStylesRef,
} from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CustomCard = ({ data, isPage = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onChange = (val) => setSearchParams({ page: val });

  const useStyles = createStyles((theme) => ({
    card: {
      position: "relative",
      // width: 300,
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors[data?.color][5],

      [theme.fn.smallerThan("md")]: {
        height: isPage ? "" : "20rem",
      },
      overflow: "hidden",
      // Position the overlay image
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "opacity 0.5s ease-in-out",
        opacity: isPage ? 1 : 0,
        backgroundImage: isPage ? `url(${data?.image})` : "none",
      },

      "&:hover::before": {
        backgroundImage: `url(${data?.image})`,
        opacity: 1,
        // zIndex: -1,
        cursor: !isPage && "pointer",
      },

      [`&:hover .${getStylesRef("text")}`]: {
        // color: theme.colors[data?.color][5],
        borderBottomColor: theme.colors[data?.color][5],
      },
    },
    text: {
      ref: getStylesRef("text"),
      // fontSize: theme.fontSizes.lg,
      textAlign: "center",
      color: "white",
      borderBottom: `4px solid white`,
      borderBottomColor: isPage && theme.colors[data?.color][5],

      transition: "color 0.5s ease, border-bottom-color 0.5s ease",
      zIndex: "3",
      [theme.fn.smallerThan("md")]: {
        fontSize: "28px",
      },
      [theme.fn.largerThan("md")]: {
        fontSize: "40px",
      },
    },
  }));

  const { t } = useTranslation();
  const { classes } = useStyles();
  return (
    <Box style={{}} onClick={() => onChange(data?.to)} className={classes.card}>
      <Title order={3} className={classes.text}>
        {t(data?.name)}
      </Title>
    </Box>
  );
};

export default CustomCard;
