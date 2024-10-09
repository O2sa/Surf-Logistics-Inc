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
        height: "300px",

        // [theme.fn.smallerThan("md")]: {
        //   height: "400px",
        // },
        // [theme.fn.largerThan("sm")]: {
        //   height: "500px",
        // },

  
      })}
    >
      <Title
        ta={"center"}
        c={"white"}
        sx={(theme) => ({
   
          [theme.fn.smallerThan("md")]: {
            fontSize: "28px",
            margin:'0 16px'
          },
          [theme.fn.largerThan("md")]: {
            fontSize: "40px",
          },
        })}        style={{ borderBottom: "4px solid white" }}
      >
        {t(title)}
      </Title>
    </Box>
  );
}

export default PageHeader;
