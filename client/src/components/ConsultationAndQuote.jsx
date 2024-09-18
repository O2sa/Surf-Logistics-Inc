import {
  Box,
  Button,
  Flex,
  Grid,
  PasswordInput,
  rem,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Paragraph from "./paragraph";
import { useTranslation } from "react-i18next";
import {
  IconArrowAutofitRight,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import ButtonWithArrow from "./ButtonWithArrow";
import { useNavigate } from "react-router-dom";

const ConsultationAndQuote = () => {
  const { t } = useTranslation();
  const nav = useNavigate();
  return (
    <Flex gutter={"lg"} gap={"md"} wrap={"wrap"} justify={"space-around"}>
      <Box w={"22rem"}>
        <Title c={"quote"} order={5}>
          {t("Free Consultation")}
        </Title>
        <Text style={{ lineHeight: "1.4" }} mb={"lg"}>
          {`${t(
            "Unlock your logistics potential! Our savvy consultants dive deep into your operations. Whether it is express, parcel, or trucking, we will find growth hacks and boost your game. No pressure, just powerful insights."
          )} `}
        </Text>
        <ButtonWithArrow
          textColor="quote"
          text="Book Your Free Consultation Now"
          onClick={() => nav("consultation")}
        />
      </Box>{" "}
      <Box w={"22rem"}>
        <Title c={"quote"} order={5}>
          {t("Free Quote")}
        </Title>
        <Text style={{ lineHeight: "1.4" }} mb={"lg"}>
          {t(
            "Need a freight solution that is efficient and budget friendly? Get a quick, hassle-free quote and discover how we can simplify your shipping and keep you ahead of the game."
          )}
        </Text>
        <ButtonWithArrow
          textColor="quote"
          text="Get Your Free Quote Here"
          onClick={() => nav("quote")}
        />
      </Box>{" "}
    </Flex>
  );
};

export default ConsultationAndQuote;
