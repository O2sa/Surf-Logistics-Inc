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
  NumberInput,
  Image,
  Center,
  Radio,
  Select,
  Box,
} from "@mantine/core";
import { hasLength, useForm, isEmail } from "@mantine/form";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "react-phone-input-2/lib/style.css";
import { getNotfication } from "../utils/notfications";
import customFetch from "../utils/customFetch";
import { useTranslation } from "react-i18next";
import parsePhoneNumberFromString from "libphonenumber-js";
import PhoneInput from "react-phone-input-2";
import { useAuth } from "../components/AuthProvider";

export default function Register() {
  const { t } = useTranslation();
  const location=useLocation()
  const from = location.state?.from?.pathname || "/dashboard";

  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      password: "",
      phone: null,
    },

    validate: {
      firstName:hasLength({ min: 2}, t("Name must have at least 2 letters")),
      lastName:hasLength({ min: 2}, t("Name must have at least 2 letters")),
 
      email: isEmail(t('Enter your email')),
      phone: (number) => {
        try {
          // Parse the phone number
          const phoneNumber = parsePhoneNumberFromString(number);
          if (phoneNumber) {
            if (phoneNumber.isValid()) {
              return null;
            } else {
              return t("Invalid phone number format.");
            }
          } else {
            return t("Invalid phone number format.");
          }
        } catch (error) {
          return t("Invalid phone number format.");
        }
      },

      password: hasLength({ min: 10 }),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await customFetch.post("/auth/register", values);
      getNotfication(true, t("Account creation completed successfully!"))
      navigate(from, { replace: true });

    } catch (error) {
      getNotfication(false, error?.response?.data?.msg);
    }
  };

  return (
    <Container size={420} my={40}>
     <Group position="center">
        <Box  w={100}>
          <Logo type={'footer'}/>
        </Box>{" "}
      </Group>
      <Title order={3}  ta="center" mt={5}>
        {t("Create your account!")}
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label={t("Full Name")}
            size="md"
            mb={"xs"}
            placeholder={t("First Name")}
            required
            {...form.getInputProps("firstName")}
          />
          <TextInput
            placeholder={t("Last Name")}
            {...form.getInputProps("lastName")}
            size="md"
            required
            mb={"md"}
          />
          <Text>
          {t("Phone number")}
          </Text>
          <PhoneInput
            country={"us"} // Set default country
            enableSearch={true} // Enable country code search
            label={t("Phone number")}
            placeholder={t("Enter phone number")}
            {...form.getInputProps("phone")}
          />
          <TextInput
            my={"md"}
            label={t("Email")}
            placeholder="example@example.com"
            size="md"
            withAsterisk
            mt="md"
            {...form.getInputProps("email")}
          />
          <TextInput
            mb={"md"}
            label={t("Company or Organization Name")}
            {...form.getInputProps("company")}
          />
          <PasswordInput
            label={t("Password")}
            withAsterisk
            placeholder=""
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />{" "}
          <Button
            type="submit"
            // onClick={() => handleSubmit(form.values)}
            fullWidth
            mt="xl"
            size="md"
          >
            {t("Register")}
          </Button>
        </form>
        <Group mt="md" position="center" sx={{ gap: 0 }}>
          <Text mr={"sm"} ta="center">
            {" "}
            {t("Already have an account?")}
          </Text>
          <Link to="/login">
            <Text color="brand">{t("Login")}</Text>
          </Link>
        </Group>
      </Paper>
    </Container>
  );
}
