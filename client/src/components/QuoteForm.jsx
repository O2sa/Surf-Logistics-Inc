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
const QuoteForm = () => {
  const { t } = useTranslation();
  const returnRadioList = (items) =>
    items.map((val) => (
      <Radio
        p={"sm"}
        sx={{ borderRadius: "4px" }}
        bg={"white"}
        // w={'100%'}
        key={val}
        value={val}
        label={t(val)}
      />
    ));

  return (
    <Grid gutter={"lg"}>
      <Grid.Col
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "space-between",
        }}
        span={12}
        sm={6}
      >
        <Box mb={"md"} w={"fit-content"}>
          <Radio.Group
            name="shippingOption"
            label={t("Shipping Option")}
            withAsterisk
            // w={'100%'}
          >
            <SimpleGrid
              // spacing={"xs"}
              spacing={4}
              breakpoints={[
                { minWidth: "xs", cols: 1 },
                { minWidth: "md", cols: 2 },
              ]}
            >
              {returnRadioList(shippingOptions)}
            </SimpleGrid>
          </Radio.Group>
        </Box>

        {/* <Select label={t("Consultation Interest")} /> */}
      </Grid.Col>{" "}
      <Grid.Col span={12} sm={4}>
        {" "}
        <Box w={"fit-content"}>
          <Text size={"sm"}>{t("Item Description")}</Text>
          <Group spacing={2} noWrap mb={"sm"}>
            <NumberInput placeholder={t("Package type")} />
            <Select placeholder={t("Quantity")} data={shippingOptions} />
          </Group>{" "}
          <Group spacing={2} mb={"sm"}>
            <NumberInput placeholder={t("Length (in)")} />
            <NumberInput placeholder={t("Width (in)")} />
            <NumberInput placeholder={t("Height (in)")} />
          </Group>{" "}
          <Group spacing={2} noWrap mb={"sm"}>
            <NumberInput placeholder={t("Package Weight")} />
            <NumberInput placeholder={t("Package Weight")} />
          </Group>
          <Group spacing={2}>
            <Button variant="subtle" c="white" leftIcon={<IconPlus />}>
              {t("Add Another Item")}
            </Button>
          </Group>{" "}
        </Box>
      </Grid.Col>
      <Grid.Col span={12} sm={6}>
        <Box mb={"md"}>
          <TextInput
            label={t("Pickup Location")}
            type="text"
            placeholder={t("Postal Code")}
            required
            mb={4}

          />
          <DatePickerInput
            placeholder={t("Pickup Date")}
            required
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}

            mx="auto"
          />
        </Box>
        <Radio.Group
          name="favoriteFramework"
          label={t("Extra Services at Pickup")}
          withAsterisk
        >
          <Stack mt="xs" spacing={4}>
            {returnRadioList(extraServices)}
          </Stack>
        </Radio.Group>
      </Grid.Col>{" "}
      <Grid.Col span={12} sm={6}>
        <Box mb={"md"}>
          <TextInput
            label={t("Delivery Location")}
            type="text"
            placeholder={t("Postal Code")}
            required
            mb={4}
          />
          <DatePickerInput
            placeholder={t("Pickup Date")}
            required
            mx="auto"
            icon={<IconCalendar size="1.1rem" stroke={1.5} />}
          />{" "}
        </Box>
        <Radio.Group
          name="favoriteFramework"
          label={t("Extra Services at Delivery")}
          withAsterisk
        >
          <Stack mt="xs" spacing={4}>
            {returnRadioList(extraServices)}
          </Stack>
        </Radio.Group>

        <Button fullWidth color="about" mt={"md"}>
          {t("Get Quote")}
        </Button>
      </Grid.Col>{" "}
    </Grid>
  );
};

export default QuoteForm;
