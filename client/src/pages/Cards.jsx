import React from "react";
import Footer from "../components/Footer";
import { Box, Container, Flex, Grid } from "@mantine/core";
import CustomCard from "../components/Card";
import aboutImg from "../assets/images/01 About 734277226.jpg";
const Cards = () => {
  return (
    <Box h={'100%'} style={{overflowY: "scroll"}}> 
      <Grid h={'100%'}>
        {Array(4).fill(0).map((val,idx) => (
          <Grid.Col key={idx} xs={12} md={6} h={'50%'}>
            <CustomCard image={aboutImg} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;
