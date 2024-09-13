import {
  Box,
  Container,
  Divider,
  Image,
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
    <Box
      pt={"xl"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Box w={"44"}>
        <Logo />
      </Box>
      <Divider orientation="vertical" size={"sm"} color={"black"} mx="lg" />
      <Box w={"60%"}>
        <Paragraph
          title="Surf Logistics Inc."
          titleColor="about"
          desColor="services"
          description="Where Freight Meets Finesse"
        />
        <Text mb={"md"}>
          {t(
            "About Surf Logistics Inc. Where Freight Meets Finesse We’re your go-to for B2B transport across North America, offering everything from cargo vans to tractor trailers."
          )}
        </Text>
        <Text>
          {t(
            "At Surf, we are all about speed, flexibility, and reliability. With our diverse fleet and swift equipment sourcing, we are ready for any challenge—without tying you down with contracts. Get your logistics done right, every time."
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default AboutContent;
