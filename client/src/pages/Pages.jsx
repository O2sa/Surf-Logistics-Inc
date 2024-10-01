import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Box, Container } from "@mantine/core";
import { useMediaQuery, useViewportSize } from "@mantine/hooks";
import LiveChat from "../components/LiveChat";
import { layoutStyle, mainSectionHeight } from "../utils/constants";

const Pages = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const { height } = useViewportSize();
  const location = useLocation();
  console.log(location);
  return (
    <Container
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        [theme.fn.smallerThan("md")]: {
          minHeight: `100vh`,
          justifyContent: "space-between",
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
          // position: "relative",
          ...layoutStyle(theme),
        })}
        px={"md"}
        pt={"md"}
      >
        <Box
          // w={"100%"}
          // py={"md"}
          // pos={"relative"}
          // top={-134}
          // h={"70vh"}
          sx={(theme) => ({
            ...layoutStyle(theme),
          })}
        >
          <Outlet />
        </Box>
        <Box
          px={"1.8rem"}
          pt={"lg"}
          style={{
            position: "absolute",
            zIndex: 2,
            top: "12px",
            right: "0",
            left: "0",
            width: "100%",
          }}
        >
          <Header />
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "auto",

          [theme.fn.largerThan("md")]: {
            height: `250px`,
          },

          // position: "relative",
          zIndex: 2,
        })}
      >
        <Footer />
      </Box>
      {!(location.pathname == "/pages" && location.search == "") && (
        <LiveChat />
      )}
    </Container>
  );
};
export default Pages;
