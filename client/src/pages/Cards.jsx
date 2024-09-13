import React from "react";
import Footer from "../components/Footer";
import { Box, Container, Flex, Grid } from "@mantine/core";
import CustomCard from "../components/Card";
import { useSearchParams } from "react-router-dom";
import FooterArrow from "../components/FooterArrow";
import { mainSectionHeight } from "../utils/constants";

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
  return (
    <Grid
      style={{ minHeight: `calc(${mainSectionHeight} + 100vh)`, }}
      align="stretch"
      m={"0"}
      gutter={"sm"}
    >
      {!page ? (
        cardsData.map((val, idx) => (
          <Grid.Col key={idx} xs={12} md={6}>
            <CustomCard data={val} />
          </Grid.Col>
        ))
      ) : (
        <>
          <Grid.Col xs={12}>
            <CustomCard isPage data={cardsData.find((val) => val.to == page)} />
          </Grid.Col>
          <FooterArrow to={page} color="brand"/>
        </>
      )}
    </Grid>
  );
};

export default Cards;
