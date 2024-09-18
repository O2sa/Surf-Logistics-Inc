import { useAuth } from "../components/AuthProvider";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useTranslation } from "react-i18next";
dayjs.extend(utc);
dayjs.extend(timezone);
import { MRT_Localization_AR } from "mantine-react-table/locales/ar";
import { MRT_Localization_FR } from "mantine-react-table/locales/fr";
import { MRT_Localization_EN } from "mantine-react-table/locales/en";

export const isUserAdmin = () => {
  const { user } = useAuth();

  return user?.role === "admin";
};

export function convertUtcDateToLocal(utcDate) {
  // Convert UTC date to local time zone
  return dayjs.utc(utcDate).tz(dayjs.tz.guess()).format("MMMM D, YYYY h:mm A");
}

export function convertLocalDateToUtc(date) {
  return dayjs(date).utc().format();
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
export const tableLocale = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return lang === "fr" ? MRT_Localization_FR : MRT_Localization_EN;
};
