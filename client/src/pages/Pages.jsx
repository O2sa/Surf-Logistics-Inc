import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mantine/core";

const Pages = () => {
  return (
    <Container m={"0"} p={"0"} w={"100%"} fluid>
      <Container
        pos={"relative"}
        m={"0"}
        mx={"auto"}
        p={"0"}
        px={"md"}
        h={"80vh"}
        w={"100%"}
      >
        <Header />
        <Box
          w={"100%"}
          // py={"md"}
          pos={"relative"}
          top={-64}
          style={{ zIndex: -1 }}
        >
          <Outlet />
        </Box>
      </Container>

      <Box pos={'relative'} bottom={0}>
        <Footer />
      </Box>
    </Container>
  );
};
export default Pages;
