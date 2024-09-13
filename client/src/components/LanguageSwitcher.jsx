// src/App.js
import { useTranslation } from "react-i18next";
import "../i18n"; // Import the i18n configuration
import { Button, Group, Select } from "@mantine/core";

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  // Language change handler
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Select
      w={"7rem"}
      bg={"br"}
      sx={(theme) => ({
        input: {
          backgroundColor: "transparent",
          color: theme.colors.quote[5],
          border: "none",
        },
        item: {
          background: theme.colors.brand,
        },
      })}
      defaultValue={i18n.language}
      data={[
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
      ]}
      onChange={changeLanguage}
    />
  );
};

export default LanguageSwitcher;
