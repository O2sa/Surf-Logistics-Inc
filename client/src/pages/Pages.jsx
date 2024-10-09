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
  return (
    <Container
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        [theme.fn.smallerThan("lg")]: {
          minHeight: `100vh`,
          justifyContent: "space-between",
        },
        [theme.fn.largerThan("lg")]: {
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
          position: "relative",
          width:'100%'

        })}
      >
        <Box
          // w={"100%"}
          // py={"md"}
          className="body_content"
          // pos={"relative"}
          // top={-134}
          // h={"70vh"}
          sx={(theme) => ({
            height:'100%',
            padding: "20px 20px 0",

    
            [theme.fn.largerThan("md")]: {
              padding: "40px 40px 0",
            },
          })}
        >
          <Outlet />
        </Box>
        <Box
          // px={"1.8rem"}
          // pt={"lg"}
          sx={(theme) => ({
            padding: "30px 30px 0",

            [theme.fn.largerThan("md")]: {
              padding: "80px 80px 0",
            }
      
         
          })}
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
          // zIndex: 2,
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
