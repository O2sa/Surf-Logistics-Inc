import {
  Box,
  Container,
  Divider,
  Image,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import Paragraph from "./paragraph";

const Services = () => {
  const { t } = useTranslation();

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Box>
        <Paragraph description="Services If you are in need of rock solid freight solutions, whether you are a distribution center, manufacturer, or just about any enterprise in need of swift logistics, Surf is your answer." />{" "}
        <Paragraph
          title="B2B Freight Transport"
          titleColor="services"
          description="Tailored solutions for businesses of all shapes and sizes."
        />{" "}
        <Paragraph
          title="Specialized Transport"
          titleColor="services"
          description="From temperature-sensitive to time-critical, we handle it all."
        />{" "}
        <Paragraph
          title="Our Fleet"
          titleColor="services"
          description="Need cargo vans, straight trucks, or refrigerated rigs? We have got you covered."
        />
      </Box>
    </Box>
  );
};

export default Services;
