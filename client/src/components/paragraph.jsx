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

const Paragraph = ({
  title = "",
  titleColor = "brand",
  description = "",
  desColor = "black",
}) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Title c={titleColor} order={4}>
        {t(title)}
      </Title>

      <Text mb={'md'} c={desColor}>{t(description)}</Text>
    </Box>
  );
};

export default Paragraph;
