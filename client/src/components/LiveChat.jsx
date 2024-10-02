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
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconMessage } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import TawkToChat from "./TawkWidget";
import { SlArrowDown } from "react-icons/sl";

function LiveChat() {
  const [opened, { toggle, close }] = useDisclosure(true);
  const theme = useMantineTheme();
  const { t } = useTranslation();

  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    (function () {
      const s1 = document.createElement("script");
      const s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = "https://embed.tawk.to/66e353e1ea492f34bc12aad5/1i7jvvah9";
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Ensure the widget is hidden after load
    // const hideWidget = () => {
    //   if (window.Tawk_API) {
    //     window.Tawk_API.onLoad = function () {
    //       console.log("Tawk.to widget hidden on load");
    //       window.Tawk_API.hideWidget(); // Hide the widget once it has loaded
    //     };
    //   }
    // };

    // hideWidget(); // Call hideWidget to make sure it's hidden after load
  }, []);

  if (window.Tawk_API) {
    // console.log("Tawk.to widget hidden on load");
    window.Tawk_API.hideWidget(); // Hide the widget once it has loaded
  }

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize(); // Opens the Tawk.to chat widget
    }
  };

  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

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
          <IconMessage
            style={{
              width: "80%",
              height: "80%",
              color: theme.colors.quote[5],
            }}
            stroke={1.5}
          />
        </ActionIcon>
      ) : (
        <Box
          opened={opened}
          bg={"about"}
          // withCloseButton
          onClose={close}
          p={0}
          radius={"0"}
          w={"250px"}
          h={"333px"}
        >
          <Box w={"250px"} h={"333px"}>
            <Box bg={"services"} pos={"relative"} display={'flex'} >
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
                mt={'12px'}
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
                    color:'white'
                  }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Box>

            <Box px={"sm"}>
              <Text fw={"600"} fz={"16px"} c="services" my={"sm"} maw={"170px"}>
                {t("Have Questions? Chat with us live")}
              </Text>

              <Text color="white" fz={"16px"}>
                {t(
                  "Hit the button below to connect with our team in real time and get answers to all your logistics questions. We are ready to assist!"
                )}
              </Text>
            </Box>
            <Box mx={4} mt={"md"} h={"50px"}>
              <ActionIcon
                // style={{ position: "absolute" }}
                bg="#fff"
                size={"xl"}
                variant="filled"
                aria-label="bottom arrow"
                w={"100%"}
                radius={"0"}
                mb={4}
                onClick={openChat}
              >
                <IconMessage
                  style={{
                    width: "80%",
                    height: "80%",
                    color: theme.colors.quote[5],
                  }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
export default LiveChat;
