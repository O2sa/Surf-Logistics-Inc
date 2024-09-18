// src/App.js
import { useTranslation } from "react-i18next";
import "../i18n"; // Import the i18n configuration
import { Box, Button, Flex, Group, rem, Select } from "@mantine/core";
import { forwardRef } from "react";

const LanguageSwitcher = ({ color }) => {
  const { t, i18n } = useTranslation();

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      w={"8rem"}
      color="white"
      sx={(theme) => ({
        input: {
          backgroundColor: "transparent",
          color: color ?? "white",
          border: "none",
        },
        item: {
          background: theme.colors.brand,
        },
      })}
      defaultValue={i18n.language}
      data={[
        { label: "🇺🇸 English", value: "en", flag: "🇺🇸" },
        { label: "🇫🇷 Français", value: "fr", flag: "🇫🇷" },
      ]}
      onChange={changeLanguage}
    />
  );
};

export default LanguageSwitcher;
