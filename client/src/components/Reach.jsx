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
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { getNotfication } from "../utils/notfications";
import customFetch from "../utils/customFetch";

const Reach = () => {
  const { t } = useTranslation();
  const nav=useNavigate()
  const onClick=(route)=>nav(route)
  const form = useForm({
    initialValues: {
      name: "",
      subject: "",
      email: "",
    
    },

    validate: {
      name: isNotEmpty(),
      subject: isNotEmpty(),
      
      email: isEmail(),
     
    },
  });


  const handleSubmit = async (values) => {
    console.log("Date in UTC:", values);
    try {
      await customFetch.post("/current-user/add-reach",values);
      getNotfication(
        true,
        t('Your message has been sent successfully.')
      );
      nav("/");
    } catch (error) {
      getNotfication(false, error?.response?.data?.msg);
    }
  };



  return (
    <Grid  justify={"space-around"}>



      <Grid.Col
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        span={12}
        md={6}
      >
        <Box>
          <Title c={"brand"} order={5}>
            {t("Got Questions?")}
          </Title>

          <Text style={{ lineHeight: "1.2" }} mb={"md"} c={"brand"} maw={'300px'}>
            {`${t("Call us at")} `}
            <span style={{ color: "white" }}>514-816-1182</span>
            {` ${t("to explore exciting business opportunities with us.")}`}
          </Text>
        </Box>{" "}
        <Box>
          <Title c={"brand"} order={5}>
            {t("Prefer Email?")}
          </Title>

          <Text style={{ lineHeight: "1.2" }} mb={"md"} c={"brand"} maw={'300px'}>
            {`${t("Shoot us a message at")} `}
            <span style={{ color: "white" }}>info@surflogistics.ca</span>
            {` ${t(
              "and we'll get back to you quickly with the answers you need."
            )}`}
          </Text>
        </Box>
      </Grid.Col>{" "}
      <Grid.Col span={12} md={6}>
      <form onSubmit={form.onSubmit(handleSubmit)}>

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
          {...form.getInputProps("name")}
          required
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
          required
          mb={"md"}
          {...form.getInputProps("email")}
          placeholder={t("Your email")}
        />
        <Textarea
          autosize
          minRows={4}
          maxRows={8}
          required
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
          {...form.getInputProps("comments")}
          placeholder={t("Tell us about your project")}
        />
        <Box  onClick={()=>handleSubmit(form.values)} ta={"end"}>
          <ButtonWithArrow  text="Lets do it" />
        </Box>
        </form>
      </Grid.Col>
    </Grid>
  );
};

export default Reach;
