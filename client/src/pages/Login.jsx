import React, { useState } from "react";
import axios from "axios";

import {
  Link,
  Form,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Center,
  Image,
  Menu,
  Box,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import customFetch from "../utils/customFetch";
import { getNotfication } from "../utils/notfications";
import { useAuth } from "../components/AuthProvider";
import Logo from "../components/Logo";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App";
import { isEmail } from "@mantine/form";
const Login = ({}) => {
  const location = useLocation();
  const { queryClient } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail(t('Enter your email')),
      password: isNotEmpty(t('Enter your Password')),
    },
  });
  const from = location.state?.from?.pathname || "/dashboard";

  // console.log(form.values)

  const handleSubmit = async (values) => {
    try {
      const { data } = await customFetch.post("/auth/login", values);
      queryClient.invalidateQueries("auth/isAuthenticated");

      navigate(from, { replace: true });
      getNotfication(true, t("You are logged in!"));
    } catch (error) {
      console.log(error);
      getNotfication(false, error?.response?.data?.msg);
    }
  };

  const handleGoToRegister = () => {
    // Redirect to register page, keeping track of the target page for after registration
    navigate("/register", { state: { from } });
  };

  return (
    <Container size={420} my={40}>
      <Group position="center">
        <Box position="center" w={100}>
          <Logo type={'footer'} />
        </Box>{" "}
      </Group>
      <Group mt="md" position="center" sx={{ gap: 0 }}>
        <Text mr={"sm"} ta="center">
          {t("Haven't created an account yet?")}
        </Text>
        <Anchor onClick={handleGoToRegister}>
          <Text color="brand">{t("Create an account")}</Text>
        </Anchor>
      </Group>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={t("Email")}
            placeholder="example@example.com"
            size="md"
            withAsterisk
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label={t("Password")}
            withAsterisk
            placeholder=""
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />{" "}
          <Group align="center">
            <Button type="submit" fullWidth mt="xl" size="md">
              {t("Login")}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
