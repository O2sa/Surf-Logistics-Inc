import {
  Box,
  Button,
  Grid,
  NumberInput,
  PasswordInput,
  Select,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import { useNavigate } from "react-router-dom";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
const ConsultationForm = () => {
  const { t } = useTranslation();
  return (
    <Grid gutter={"lg"} justify="center">
      <Grid.Col
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
        }}
        span={"content"}
        md={4}
      >
        <Box mb={"md"}>
          <TextInput
            label={t("Full Name")}
            type="text"
            placeholder={t("First Name")}
            required
          />
          <TextInput placeholder={t("Last Name")} required />
        </Box>
        <Box mb={"md"}>
          <PhoneInput
            country={"us"} // Set default country
            // value={phone}
            // onChange={handlePhoneChange}
            enableSearch={true} // Enable country code search
            placeholder="Enter phone number"
          />
          {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
        </Box>
        <TextInput
          label={t("E-mail")}
          mb={'md'}
          placeholder={t("example@example.com")}
          required
        />
        <TextInput
          label={t("Company or Organization Name")}
        />
        {/* <Select label={t("Consultation Interest")} /> */}
      </Grid.Col>{" "}
      <Grid.Col span={"content"} md={4} >
        <Text size={'sm'}>
        {t("Appointment Date")}
        </Text>
        <DatePicker
        
          bg={"white"}
          w={"fit-content"}
          label={t("Appointment Date")}
        />{" "}
      </Grid.Col>{" "}
      <Grid.Col span={12} md={4}>
        <TimeInput
          label={t("Appointment Time")}
          icon={<IconClock size="1rem" stroke={1.5} />}
          maw={400}
          mb={"md"}
        />
        <Textarea
          mb={"md"}
          label={t("Additional Information / Comments")}
          required
        />
        <Button fullWidth>{t("Submit")}</Button>
      </Grid.Col>
    </Grid>
  );
};

export default ConsultationForm;
