import React from "react";
import Footer from "../components/Footer";
import { Box, Container, Flex, Grid } from "@mantine/core";
import CustomCard from "../components/Card";
import { useSearchParams } from "react-router-dom";
import FooterArrow from "../components/FooterArrow";
import { mainSectionHeight } from "../utils/constants";
import { useMediaQuery } from "@mantine/hooks";

const cardsData = [
  {
    name: "About",
    color: "about",
    to: "about",
    image: "/assets/images/about.jpg",
  },
  {
    name: "Services",
    color: "services",
    to: "services",
    image: "/assets/images/services.jpg",
  },
  {
    name: "Reach Out",
    color: "reach",
    to: "reach",
    image: "/assets/images/reach.jpg",
  },
  {
    name: "Consultation & Quote",
    color: "quote",
    to: "consultation-quote",
    image: "/assets/images/quote.jpg",
  },
];

const Cards = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  return (
    <Grid
      // style={{ minHeight: `calc(${mainSectionHeight} + 100vh)`, }}
      // align="stretch"
      m={"0"}
      h={"100%"}
      gutter={"5px"}
      pos={"relative"}
    >
      {!page ? (
        cardsData.map((val, idx) => (
          <Grid.Col
            pb={"0px"}
            pt={  "5px"}
            key={idx}
            xs={12}
            md={6}
          >
            <CustomCard data={val} />
          </Grid.Col>
        ))
      ) : (
        <>
          <Grid.Col xs={12}>
            <CustomCard isPage data={cardsData.find((val) => val.to == page)} />
          </Grid.Col>
          <FooterArrow to={page} color="white" />
        </>
      )}
    </Grid>
  );
};

export default Cards;
