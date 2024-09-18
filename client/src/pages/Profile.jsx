import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  PasswordInput,
  Text,
  TextInput,
  rem,
} from "@mantine/core";

import { hasLength, isEmail, isNotEmpty, useForm } from "@mantine/form";

import { useAuth } from "../components/AuthProvider";
import { useCrudOperations } from "../utils/crud";
import { getNotfication } from "../utils/notfications";
import { t } from "i18next";

export default function Profile({}) {
  const { user } = useAuth();

  const updateProfile = useCrudOperations(
    ["current-user"],
    [`current-user`],
    "update"
  );

  const updatePassword = useCrudOperations(
    ["current-user"],
    [`current-user/change-pass`],
    "update"
  );

  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
    },

    validate: {
      firstName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      lastName: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      email: isEmail(),
    },
  });

  const passform = useForm({
    initialValues: {
      password: "",
      oldPassword: "",
      confirmPassword: "",
      _id: user._id,
    },
    validate: {
      oldPassword: isNotEmpty(),
      password: hasLength({ min: 8 }),
      confirmPassword: (value, values) =>
        value !== values?.password ? t("Passwords are not equal!") : null,
    },
  });

  // console.log(form.values)
  const handleSubmit = async (values) => {
    await updateProfile.mutateAsync(values);
    getNotfication(true, "Personal information has been modified!");
  };

  const passhandleSubmit = async (values) => {
    // console.log(values)
    await updatePassword.mutateAsync(values);
    logout();
    getNotfication(true, "Password has been successfully modified!");
  };

  return (
    <Container fluid>
      <Container
        bg="white"
        py={34}
        sx={
          {
            //   background: 'ligth',
          }
        }
        // h={'auto'}
        pt={4}
        fluid
        mb={34}
      >
        <Text>{t("Personal Information")}</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group mt={5} noWrap sx={{}}>
            <Grid
              gutterXs={"lg"}
              align="space-between"
              justify="center"
              w={"100%"}
            >
              <Grid.Col xs={12} md={9}>
                <Box mb={"md"}>
                  <TextInput
                    my={4}
                    size="md"
                    // w={'50%'}
                    label={t("Full Name")}
                    placeholder={t("First Name")}
                    {...form.getInputProps("firstName")}
                    withAsterisk
                  />{" "}
                  <TextInput
                    my={4}
                    size="md"
                    // w={'50%'}
                    placeholder={t("Last Name")}
                    {...form.getInputProps("lastName")}
                    withAsterisk
                    mb={'md'}
                    
                  />
                  <TextInput
                    size="md"
                    label={t("E-mail")}
                    {...form.getInputProps("email")}
                    withAsterisk
                  />
                </Box>
              </Grid.Col>
              <Grid.Col
                p={16}
                sx={{ alignContent: "center", textAlign: "center" }}
                // bg={'secondary'}
                mt={rem("30px")}
                // className='bg-secondary'
                xs={11}
                md={2}
              ></Grid.Col>
            </Grid>
          </Group>

          <Flex m={12} justify={"flex-end"}>
            <Button
              loading={updateProfile.isPending}
              // onClick={handleSubmit}
              type="submit"
              mt={34}
              size="lg"
            >
              {t("Submit")}
            </Button>
          </Flex>
        </form>
      </Container>
      <Group bg="white" py={34} px={16}>
        <form onSubmit={passform.onSubmit(passhandleSubmit)}>
          <Text>{t("Change password")}</Text>
          <Group mt={2} sx={{}}>
            <PasswordInput
              size="md"
              w={"100%"}
              placeholder={t("Old password")}
              label={t("Old password")}
              name="oldPassword"
              {...passform.getInputProps("oldPassword")}
              withAsterisk
            />
            <PasswordInput
              w={"100%"}
              size="md"
              label={t("New password")}
              name="password"
              {...passform.getInputProps("password")}
              withAsterisk
            />
            <PasswordInput
              w={"100%"}
              size="md"
              placeholder={t("Repeat password")}
              label={t("Repeat password")}
              name="confirmPassword"
              {...passform.getInputProps("confirmPassword")}
            />
            <Button
              loading={updatePassword.isPending}
              type="submit"
              fullWidth
              mt="xl"
              size="md"
            >
              {t("Submit")}
            </Button>
          </Group>
        </form>
      </Group>
    </Container>
  );
}
