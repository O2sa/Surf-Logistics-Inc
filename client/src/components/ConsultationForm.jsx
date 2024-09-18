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
const shippingOptions = [
  "PTL (Partial Truckload)",
  "LTL (Less-Than-Truckload)",
  "FTL (Full Truckload)",
  "International Shipping",
  "Expedited Shipping",
  "Temperature Controlled",
  "Heavy Haul",
  "White Glove",
];

import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useNavigate } from "react-router-dom";
import { DatePicker, DateTimePicker, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { getNotfication } from "../utils/notfications";
import customFetch from "../utils/customFetch";
import { convertLocalDateToUtc } from "../utils/utils";
const ConsultationForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      consultationInterest: "",
      email: "",
      comments: "",
      date: null,
      time: null,
    },

    validate: {
      // Validate that the appointment date is not in the past
      date: (value) =>
        value && dayjs(value).isBefore(dayjs(), "day")
          ? "Appointment date cannot be in the past"
          : null,

      // Ensure time is picked
      time: (value) => (value ? null : "Please pick an appointment time"),
    },
  });

  const handleSubmit = async (values) => {
    try {
      await customFetch.post("/current-user/add-consultation", {
        ...values,
        date: convertLocalDateToUtc(values.date),
      });
      getNotfication(
        true,
        t('Your free quote request has been sent successfully.')
      );
      navigate("/dashboard/consultations");
    } catch (error) {
      getNotfication(false, error?.response?.data?.msg);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid gutter={"lg"} justify="center">
        <Grid.Col span={"content"} md={4}>
          <Select
            data={shippingOptions}
            required
            label={t("Consultation Interest")}
            {...form.getInputProps("consultationInterest")}
            mb={"sm"}
          />
          <DateTimePicker
            // bg={"white"}
            // w={"fit-content"}
            required
            label={t("Appointment Date")}
            {...form.getInputProps("date")}
          />{" "}
        </Grid.Col>{" "}
        <Grid.Col span={"content"} md={4}>
          {/* <TimeInput
            label={t("Appointment Time")}
            icon={<IconClock size="1rem" stroke={1.5} />}
            maw={400}
            mb={"md"}
            {...form.getInputProps("time")}
          /> */}
          <Textarea
            mb={"md"}
            label={t("Additional Information / Comments")}
            {...form.getInputProps("comments")}
            required
          />
          <Button
            onClick={() => handleSubmit(form.values)}
            type="submit"
            fullWidth
          >
            {t("Submit")}
          </Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ConsultationForm;
