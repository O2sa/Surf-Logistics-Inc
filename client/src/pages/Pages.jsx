import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import LiveChat from "../components/LiveChat";
import { layoutStyle, mainSectionHeight } from "../utils/constants";

const Pages = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { height } = useViewportSize();
  return (
    <Container
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        [theme.fn.smallerThan("md")]: {
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
        sx={(theme) => ({
          position: "relative",
          ...layoutStyle(theme),
        })}
      >
        <Box style={{ position: "relative", zIndex: 2 }} mt={"lg"} px={34}>
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
            ...layoutStyle(theme),
          })}
        >
          <Outlet />
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "auto",

          [theme.fn.largerThan("md")]: {
            height: `10rem`,
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
