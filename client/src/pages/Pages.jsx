import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import LiveChat from "../components/LiveChat";
import { mainSectionHeight } from "../utils/constants";

const Pages = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { height } = useViewportSize();
  return (
    <Container
     

      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        [theme.fn.smallerThan("sm")]: {
          minHeight: `100vh`,
        },
        [theme.fn.largerThan("md")]: {
          height: `100vh`,
        },
      })}
      m={"0"}
      p={"0"}
      fluid
    >
      {" "}
      <Box
        pos={"relative"}
        sx={(theme) => ({
          [theme.fn.smallerThan("sm")]: {
            minHeight: `calc(${mainSectionHeight} + 100vh)`,
          },
          [theme.fn.largerThan("md")]: {
            height: `calc(${mainSectionHeight} + 100vh)`,
          },
        })}
      >
        <Box style={{ position: "relative", zIndex: 1 }} mt={"lg"} px={34}>
          <Header />
        </Box>
        <Box
          // w={"100%"}
          // py={"md"}
          pos={"relative"}
          top={-92}
          // h={"70vh"}
          px={"md"}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: {
              minHeight: `calc(${mainSectionHeight} + 100vh)`,
            },
            [theme.fn.largerThan("md")]: {
              height: `calc(${mainSectionHeight} + 100vh)`,
            },
          })}
        >
          <Outlet />
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          [theme.fn.smallerThan("sm")]: {
            height: "auto",
          },
          [theme.fn.largerThan("md")]: {
            height: `calc(${mainSectionHeight} + 100vh)`,
          },
          position: "relative",
          zIndex: 2,
        })}
      >
        <Footer />
      </Box>
      {/* <LiveChat/> */}
    </Container>
  );
};
export default Pages;
