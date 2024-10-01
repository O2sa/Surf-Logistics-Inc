import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  MediaQuery,
  rem,
  Text,
  Title,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "./Logo";
import Paragraph from "./paragraph";

const AboutContent = () => {
  const { t } = useTranslation();

  return (
    <Grid>
      <Grid.Col span={12} md={3} display={"flex"}>
        <Box w={"179px"} style={{ alignContent: "center" }}>
          <Logo type="about" />
        </Box>
        <Divider
          orientation="vertical"
          sx={(theme) => ({
         
            [theme.fn.smallerThan("md")]: {
              display: "none",
            },

            borderColor: "#294A63" 
          })}
          size={"1px"}
          color={"#294A63"}
          mx="auto"
        />
        {/* </MediaQuery> */}
      </Grid.Col>

      <Grid.Col span={12} md={9}>
        <Box maw={"882px"}>
          <Paragraph
            title="Surf Logistics Inc."
            titleColor="about"
            desColor="services"
            description="Where Freight Meets Finesse"
          />
          <Text mb={"md"} style={{ fontSize: "18px" }}>
            {t(
              "We’re your go-to for B2B transport across North America, offering everything from cargo vans to tractor trailers."
            )}
          </Text>
          <Text style={{ fontSize: "18px" }}>
            {t(
              "At Surf, we are all about speed, flexibility, and reliability. With our diverse fleet and swift equipment sourcing, we are ready for any challenge—without tying you down with contracts. Get your logistics done right, every time."
            )}
          </Text>
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default AboutContent;
