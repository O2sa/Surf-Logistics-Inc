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
    <Box m={'auto'}>
      <Title  c={titleColor} order={4} style={{fontSize:"18px"}}>
        {t(title)}
      </Title>

      <Text maw={'900px'} style={{fontSize:"18px"}} mb={'md'} c={desColor}>{t(description)}</Text>
    </Box>
  );
};

export default Paragraph;
