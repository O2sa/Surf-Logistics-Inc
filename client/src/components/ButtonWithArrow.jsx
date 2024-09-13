import { Button, useMantineTheme } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";

const ButtonWithArrow = ({ textColor = "white", text = "",onClick }) => {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  return (
    <Button
      c={textColor}
      variant="subtle"
      fw={'normal'}
      onClick={onClick}
      leftIcon={
        <IconArrowNarrowRight
          style={{ marginRight: "1px" }}
          size={32}
          color={theme.colors.brand[5]}
        />
      }
    >
      {t(text)}
    </Button>
  );
};

export default ButtonWithArrow;
