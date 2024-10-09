import { Box, Container } from "@mantine/core";
import PageHeader from "../components/PageHeader";
import { layoutStyle, mainSectionHeight } from "../utils/constants";
import LiveChat from "../components/LiveChat";

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
      bg={contentColor}
      sx={(theme) => ({
        // position: "relative",
        ...layoutStyle(theme),
      })}
    >
      <PageHeader color={color} title={title} />
      <Box
        bg={contentColor}
        sx={(theme) => ({
          display: "flex",
          alignItems: "center",
          height: `calc(-34px + 100%)`
        })}
        // h={"30vh"}
        my={"xl"}
      >
        <Container
          style={
            {
              // display:'flex',
              // alignContent:"center",
              // justifyContent: "space-around",
              // alignItems: "center",
              overflow:'scroll'
            }
          }
          w={"70rem"}
          fluid
          // mb={"lg"}
        >
          {children}
        </Container>
      </Box>


    </Box>
  );
}

export default Page;
