import {
  Box,
  Button,
  Flex,
  Grid,
  Group,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  SimpleGrid,
  Stack,
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
const extraServices = [
  "Residential Area",
  "Lift Gate at Pickup",
  "Limited Access Area",
  "Hazerdous Materials",
  "Expedited Shipping",
  "Other",
];
import { useNavigate } from "react-router-dom";
import { DatePicker, DatePickerInput, TimeInput } from "@mantine/dates";
import { IconCalendar, IconClock, IconPlus } from "@tabler/icons-react";
import { getNotfication } from "../utils/notfications";
import customFetch from "../utils/customFetch";
import { useForm } from "@mantine/form";
import dayjs from "dayjs";
import { convertLocalDateToUtc } from "../utils/utils";
const QuoteForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      shippingOption: "",
      pickupServices: "",
      deliveryServices: "",
      type: "",
      quantity: "",
      lenght: "",
      width: "",
      height: "",
      weight: "",
      pickupPostalCode: "",
      pickupDate: null,
      deliveryPostalCode: "",
      deliveryDate: null,
    },
  });

  const handleSubmit = async (values) => {
    console.log("Date in UTC:", values);
    try {
      await customFetch.post("/current-user/add-quote", {
        ...values,
        pickupDate: convertLocalDateToUtc(values.pickupDate),
        eliveryDate: convertLocalDateToUtc(values.deliveryDate),
      });
      getNotfication(
        true,
        t('Your free consultation request has been sent successfully.')
      );
      navigate("/dashboard");
    } catch (error) {
      getNotfication(false, error?.response?.data?.msg);
    }
  };

  const returnRadioList = (items) =>
    items.map((val) => (
      <Radio
        p={"sm"}
        sx={{ borderRadius: "4px" }}
        bg={"white"}
        // w={'100%'}
        fz={"xs"}
        size="xs"
        key={val}
        value={val}
        label={t(val)}
      />
    ));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Grid
        gutter={"lg"}
        fz={"xs"}
        justify="center"
        style={{ fontSize: "12px !important" }}
      >
        <Grid.Col
          style={{
            // display: "flex",
            flexDirection: "column",
            // justifyContent: "space-between",
          }}
          span={12}
          md={4}
        >
          <Select
            label={t("Shipping Option")}
            withAsterisk
            {...form.getInputProps("shippingOption")}
            data={shippingOptions}
            // w={'100%'}
            mb={'sm'}
          />
   
          <Text size={"sm"}>{t("Item Description")}</Text>
          <Group spacing={2} mb={"sm"} noWrap>
            <NumberInput
              placeholder={t("Quantity")}
              {...form.getInputProps("quantity")}
              required
            />
            <Select
              placeholder={t("Package Type")}
              {...form.getInputProps("type")}
              data={shippingOptions}
              required
            />
          </Group>{" "}
          <Group spacing={2} >
            <NumberInput
              placeholder={t("Length (in)")}
              {...form.getInputProps("lenght")}
              // icon={<Text>In</Text>}
              required
            />
            <NumberInput
              placeholder={t("Width (in)")}
              {...form.getInputProps("width")}
            />
            <NumberInput
              placeholder={t("Height (in)")}
              {...form.getInputProps("height")}
              required
            />
          </Group>{" "}
          <Group spacing={2} noWrap >
            <NumberInput
              placeholder={t("Package Weight (kg)")}
              {...form.getInputProps("weight")}
              required
            />
          </Group>
          <Group spacing={2}>
            {/* <Button variant="subtle" c="white" leftIcon={<IconPlus />}>
              {t("Add Another Item")}
            </Button> */}
          </Group>{" "}
        </Grid.Col>{" "}
        <Grid.Col span={12} md={4}>
          <Box mb={"md"}>
            <TextInput
              label={t("Pickup Location")}
              type="text"
              {...form.getInputProps("pickupPostalCode")}
              placeholder={t("Postal Code")}
              required
              mb={4}
            />
            <DatePickerInput
              placeholder={t("Pickup Date")}
              required
              {...form.getInputProps("pickupDate")}
              icon={<IconCalendar size="1.1rem" stroke={1.5} />}
              mx="auto"
              
            />
          </Box>
          {/* <Radio.Group
            label={t("Extra Services at Pickup")}
            withAsterisk

          >
            <Stack mt="xs" spacing={4}>
              {returnRadioList(extraServices)}
            </Stack>
          </Radio.Group> */}
          <Select
            label={t("Extra Services at Pickup")}
            {...form.getInputProps("pickupServices")}
            data={extraServices}
            withAsterisk
            required
          />
        </Grid.Col>{" "}
        <Grid.Col span={12} md={4}>
          <Box mb={"md"}>
            <TextInput
              label={t("Delivery Location")}
              type="text"
              {...form.getInputProps("deliveryPostalCode")}
              placeholder={t("Postal Code")}
              required
              mb={4}
            />
            <DatePickerInput
              placeholder={t("Pickup Date")}
              required
              mx="auto"
              {...form.getInputProps("deliveryDate")}
              icon={<IconCalendar size="1.1rem" stroke={1.5} />}
            />{" "}
          </Box>
          <Select
            label={t("Extra Services at Delivery")}
            {...form.getInputProps("deliveryServices")}
            data={extraServices}
            withAsterisk
            required
          />

          {/* <Stack mt="xs" spacing={4}>
              {returnRadioList(extraServices)}
            </Stack> */}
          {/* </Radio.Group> */}

          <Button fullWidth color="about" type="submit" mt={"md"}>
            {t("Get Quote")}
          </Button>
        </Grid.Col>{" "}
      </Grid>
    </form>
  );
};

export default QuoteForm;
