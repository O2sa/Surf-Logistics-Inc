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
import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";



function LiveChat() {
  const [opened, { toggle, close }] = useDisclosure(true);
  const theme = useMantineTheme();
  const {
    t,
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    // Initialize the chat widget
    ChatWidgetController.init(language);
  }, []);

  const handleShowChat = () => {
    ChatWidgetController.showChat();
  };

  const handleHideChat = () => {
    ChatWidgetController.hideChat();
  };

  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        bottom: "250px",
        right: "0",

        marginRight: "20px",

        [theme.fn.largerThan("md")]: {
          marginRight: "40px",
        },

        [theme.fn.smallerThan("lg")]: {
          bottom: "20px",
        },
        zIndex: "1",
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
          onClick={handleShowChat}
        >
          <Image
            src={"/chat_icon.svg"}
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
                // pos={"fixed"}
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
                style={{
                  wordSpacing: "-1px",
                  overflow: "hidden",
                  lineHeight: language == "fr" && "19px",
                }}
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
              onClick={handleShowChat}
            >
              <Image
                src={"/chat_icon.svg"}
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
export const ChatWidgetController = (() => {
  // Initialize Tawk.to
  const init = (language) => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.autoStart = false; // Disable auto-start

    // Load Tawk.to script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${
      import.meta.env.VITE_APP_TAWK_PROPERTY_ID
    }/${
      language === "fr"
        ? import.meta.env.VITE_APP_TAWK_FR_WIDGET_ID
        : import.meta.env.VITE_APP_TAWK_EN_WIDGET_ID
    }`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    // window.Tawk_API.onLoad = () => {
    //   console.log("Tawk.to loaded");
    // };

    // // Handle the onChatHidden event to perform cleanup when the chat is closed
    // window.Tawk_API.onChatHidden = () => {
    //   console.log("Chat closed. Performing cleanup.");
    //   // Add any additional cleanup code here, if needed
    // };
  };

  // Show the chat widget
  const showChat = () => {
    window.Tawk_API.start({ showWidget: false });

    window.Tawk_API.maximize({ showWidget: true });
    // window.Tawk_API.hideWidget();

    if (window.Tawk_API) {
      window.Tawk_API.onChatEnded = function () {
        hideChat();
      };
    }
    window.Tawk_API.onLoad = function () {
      window.Tawk_API.hideWidget();
    };
  };

  // if (window.Tawk_API) {
  //   window.Tawk_API.onChatMinimized = function () {
  //     hideChat();
  //   };
  // }
  // window.Tawk_API.onLoad = function () {
  //   window.Tawk_API.hideWidget();
  // };

  // Hide the chat widget
  const hideChat = () => {
    window.Tawk_API.shutdown();
  };

  // Switch between English and French widgets
  const switchLanguage = (language) => {
    const widgetId =
      language === "fr"
        ? import.meta.env.VITE_APP_TAWK_FR_WIDGET_ID
        : import.meta.env.VITE_APP_TAWK_EN_WIDGET_ID;
    if (window.Tawk_API) {
      window.Tawk_API.switchWidget({
        propertyId: import.meta.env.VITE_APP_TAWK_PROPERTY_ID,
        widgetId: widgetId,
      });
    }
  };

  // Expose the functions
  return {
    init,
    showChat,
    hideChat,
    switchLanguage,
  };
})();

export default LiveChat;
