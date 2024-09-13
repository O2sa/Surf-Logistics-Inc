import { Box, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

function PageHeader({ color, title }) {
  const { t } = useTranslation();
  return (
    <Box
      bg={color}
      sx={(theme) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
        [theme.fn.smallerThan("sm")]: {
          height: "40vh",
        },
        [theme.fn.largerThan("md")]: {
          height: "30vh",
        },
      })}
    >
      <Title
        ta={"center"}
        c={"white"}
        order={2}
        style={{ borderBottom: "4px solid white" }}
      >
        {t(title)}
      </Title>
    </Box>
  );
}

export default PageHeader;
