import { Box, Container } from "@mantine/core";
import PageHeader from "../components/PageHeader";
import { mainSectionHeight } from "../utils/constants";

function Page({
  color = "brand",
  title = "",
  children,
  contentColor = "white",
}) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "0",
        padding: "0",
        // justifyContent: "space-between",
        // minHeight: `calc(${mainSectionHeight} + 100vh)`,
      }}
    >
      <PageHeader color={color} title={title} />
      <Box
        bg={contentColor}
        sx={(theme) => ({
          height: "auto",

          [theme.fn.smallerThan("sm")]: {
            height: "auto",
          },
          [theme.fn.largerThan("md")]: {
            height: `calc(${mainSectionHeight}   + 70vh)`,
          },
        })}

        // h={"30vh"}
      >
        <Container size={"xl"} my={"lg"}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default Page;
