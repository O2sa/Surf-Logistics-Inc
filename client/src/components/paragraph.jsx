import {
  Box,
  Container,
  Divider,
  Image,
  rem,
  Text,
  Title,
} from "@mantine/core";
import { color } from "framer-motion";
import { useTranslation } from "react-i18next";

const Paragraph = ({
  title = "",
  titleColor = "brand",
  description = "",
  desColor = "#264760",
}) => {
  const { t } = useTranslation();

  return (
    <Box  >
      <Title  c={titleColor} order={4} style={{fontSize:"18px"}}>
        {t(title)}
      </Title>

      <Text  maw={'1200px'} style={{fontSize:"18px"}} mb={'md'} c={desColor}>{t(description)}</Text>
    </Box>
  );
};

export default Paragraph;
