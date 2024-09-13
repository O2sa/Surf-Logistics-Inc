import {
  Box,
  Button,
  Grid,
  PasswordInput,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import Paragraph from "./paragraph";
import { useTranslation } from "react-i18next";
import {
  IconArrowAutofitRight,
  IconArrowNarrowRight,
} from "@tabler/icons-react";
import ButtonWithArrow from "./ButtonWithArrow";
import { useNavigate } from "react-router-dom";

const Reach = () => {
  const { t } = useTranslation();
  const nav=useNavigate()
  const onClick=(route)=>nav(route)
  return (
    <Grid gutter={"lg"}>
      <Grid.Col
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        span={12}
        md={6}
        pr={"xl"}
      >
        <Box>
          <Title c={"brand"} order={5}>
            {t("Got Questions?")}
          </Title>

          <Text style={{ lineHeight: "1.2" }} mb={"md"} c={"brand"}>
            {`${t("Call us at")} `}
            <span style={{ color: "white" }}>514-816-1182</span>
            {` ${t("to explore exciting business opportunities with us.")}`}
          </Text>
        </Box>{" "}
        <Box>
          <Title c={"brand"} order={5}>
            {t("Prefer Email?")}
          </Title>

          <Text style={{ lineHeight: "1.2" }} mb={"md"} c={"brand"}>
            {`${t("Shoot us a message at")} `}
            <span style={{ color: "white" }}>info@surflogistics.ca</span>
            {` ${t(
              "and we'll get back to you quickly with the answers you need."
            )}`}
          </Text>
        </Box>
      </Grid.Col>{" "}
      <Grid.Col span={12} md={6}>
        <TextInput
          mb={"md"}
          sx={(theme) => ({
            input: {
              backgroundColor: "transparent",
              "::placeholder": {
                color: theme.colors.brand[5],
              },
              border: "none",
              borderBottom: "1px solid white",
              borderRadius: "0",
            },
          })}
          type="text"
          placeholder={t("Your name")}
        />
        <TextInput
          sx={(theme) => ({
            input: {
              backgroundColor: "transparent",
              "::placeholder": {
                color: theme.colors.brand[5],
              },
              border: "none",
              borderBottom: "1px solid white",
              borderRadius: "0",
            },
          })}
          mb={"md"}
          type="email"
          placeholder={t("Your email")}
        />
        <Textarea
          autosize
          minRows={4}
          maxRows={8}
          sx={(theme) => ({
            textarea: {
              backgroundColor: "transparent",
              "::placeholder": {
                color: theme.colors.brand[5],
              },
              border: "none",
              borderBottom: "1px solid white",
              borderRadius: "0",
            },
          })}
          mb={"md"}
          placeholder={t("Tell us about your project")}
        />
        <Box ta={"end"}>
          <ButtonWithArrow text="Lets do it" />
        </Box>
      </Grid.Col>
    </Grid>
  );
};

export default Reach;
