// src/App.js
import { useTranslation } from "react-i18next";
import "../i18n"; // Import the i18n configuration
import { Box, Button, Flex, Group, rem, Select } from "@mantine/core";
import { forwardRef } from "react";

const langs = {
  en: "English",
  fr: "Français",
};
const LanguageSwitcher = ({ color }) => {
  const { t, i18n } = useTranslation();

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Button
      maw={"116px"}
      variant="subtle"
      aria-label="Select Language" // Provide an accessible name for screen readers
      onClick={() => changeLanguage(i18n.language == "fr" ? "en" : "fr")}
    >
      {langs[i18n.language]}
    </Button>
  );
};

export default LanguageSwitcher;
