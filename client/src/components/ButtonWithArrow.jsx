import { Box, Button, Text, useMantineTheme } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";

const ButtonWithArrow = ({
  textColor = "white",
  text = "",
  onClick,
  isLoading = false,
}) => {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  
  return (
    <Button
      c={textColor}
      variant="subtle"
      component={Box}
      fw={"normal"}
      loading={isLoading}
      type="submit"
      display={"block"}
      // fz={'16px'}
      h={'48px'}
      onClick={onClick}
      leftIcon={
        <IconArrowNarrowRight
          style={{ marginRight: "1px" }}
          size={32}
          color={theme.colors.brand[5]}
        />
      }
      sx={{

        // maxWidth: '200px', // Set a max-width for the button to control text wrapping
        whiteSpace: 'normal', // Allow wrapping for the button text
        wordWrap: 'break-word', // Wrap long words if necessary
      }}
    >
      <Text
        display={"block"}
        my={'md'}

        sx={{
          whiteSpace: 'normal', // Allow text wrapping inside the Text component
          wordWrap: 'break-word',
        }}
      >
        {t(text)}
      </Text>
    </Button>
  );
};

export default ButtonWithArrow;
