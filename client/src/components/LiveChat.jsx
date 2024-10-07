import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import {
  Dialog,
  Group,
  Button,
  TextInput,
  Text,
  Box,
  Title,
  ActionIcon,
  useMantineTheme,
  Image,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconMessage } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";

function LiveChat() {
  const [opened, { toggle, close }] = useDisclosure(true);
  const theme = useMantineTheme();
  const { t, i18n } = useTranslation();
  TawkToChat();

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.setAttributes({
        language: i18n.language, // Set the widget's language dynamically
      });
      window.Tawk_API.maximize(); // Opens the Tawk.to chat widget
    }
  };

  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        bottom: "250px",
        right: "0",
        marginRight: "1rem",
        [theme.fn.smallerThan("md")]: {
          bottom: "20px",
        },
        zIndex: "100",
      })}
    >
      {isSmallScreen || !opened ? (
        <ActionIcon
          // style={{ position: "absolute" }}
          bg="#fff"
          size={"4rem"}
          variant="filled"
          aria-label="bottom arrow"
          radius={"xl"}
          mb={4}
          onClick={openChat}
        >
          <Image
            src={"/public/chat_icon.svg"}
            alt="chat icon"
            style={{
              width: "70%",
              // height: "80%",
              color: theme.colors.quote[5],
            }}
            stroke={1.5}
          />
        </ActionIcon>
      ) : (
        <Box
          bg={"about"}
          // withCloseButton
          onClose={close}
          p={0}
          radius={"0"}
          w={"250px"}
          h={"333px"}
        >
          <Box w={"250px"} h={"333px"}>
            <Box bg={"services"} pos={"relative"} display={"flex"}>
              <Text
                w={"100%"}
                ta={"center"}
                c={"white"}
                py={"md"}
                fw={"600"}
                fz={"18px"}
                h={"50px"}
              >
                {t("Live Chat")}
              </Text>

              <ActionIcon
                pos={"fixed"}
                // style={{ position: "absolute" }}
                // size={"xl"}
                right={"1.3rem"}
                mt={"12px"}
                color="#fff"
                onClick={close}
                variant="transparent"
                aria-label="bottom arrow"
                w={"42px"}
              >
                <SlArrowDown
                  style={{
                    // width: '85px',
                    // height: '42px',
                    width: "80%",
                    height: "80%",
                    // color: theme.colors[color]
                    //   ? theme.colors[color][5]
                    //   : color,
                    color: "white",
                  }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Box>

            <Box px={"sm"} h={"171px"}>
              <Text fw={"600"} fz={"16px"} c="services" my={"sm"} maw={"170px"}>
                {t("Have Questions? Chat with us live")}
              </Text>

              <Text
                style={{ wordSpacing: "-1px", overflow: "hidden" }}
                color="white"
                fz={"16px"}
              >
                {t(
                  "Hit the button below to connect with our team in real time and get answers to all your logistics questions. We are ready to assist!"
                )}
              </Text>
            </Box>
            <ActionIcon
              style={{ position: "absolute" }}
              bg="#fff"
              // size={"xl"}
              variant="filled"
              aria-label="bottom arrow"
              w={"232px"}
              h={"50px"}
              radius={"0"}
              mx={"9px"}
              bottom={"10px"}
              onClick={openChat}
            >
              <Image
                src={"/public/chat_icon.svg"}
                alt="chat icon"
                style={{
                  width: "30px",
                  // height: "80%",
                  color: theme.colors.quote[5],
                }}
                stroke={1.5}
              />
            </ActionIcon>
          </Box>
        </Box>
      )}
    </Box>
  );
}


const TawkToChat = () => {
  const { i18n } = useTranslation(); // Access the current language from i18n

  const getChatId = () => {
    const lang = i18n.language; // Get the language from i18n

    // Map the language to the specific Tawk.to widget
    switch (lang) {
      case 'fr':
        return '66e353e1ea492f34bc12aad5/1i9k8v1lq'; // Widget ID for German
      case 'en':
        return '66e353e1ea492f34bc12aad5/1i7jvvah9'; // Widget ID for Russian
      
      default:
        return '66e353e1ea492f34bc12aad5/1i7jvvah9'; // Default to English
    }
  };

  useEffect(() => {
    const chatId = getChatId();

    if (!chatId) {
      return;
    }

    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;

      // Load the widget dynamically based on chatId (which includes language)
      s1.src = `https://embed.tawk.to/${chatId}`;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");

      s0.parentNode.insertBefore(s1, s0);
    })();

    return () => {
      // Clean up: Remove the widget script if language changes
      const tawkScript = document.querySelector('script[src*="tawk.to"]');
      if (tawkScript) {
        tawkScript.remove();
        if (window.Tawk_API) {
          window.Tawk_API = null;
        }
      }
    };
  }, [i18n.language]); // Reload when language changes

  return null;
};



export default LiveChat;
