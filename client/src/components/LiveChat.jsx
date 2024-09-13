import { useDisclosure } from "@mantine/hooks";
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
import { useEffect } from "react";
import TawkToChat from "./TawkWidget";

function LiveChat() {
  const [opened, { toggle, close }] = useDisclosure(true);
  const theme = useMantineTheme();
  const { t } = useTranslation();

  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function() {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src='https://embed.tawk.to/66e353e1ea492f34bc12aad5/1i7jvvah9';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Listen for the widget load event
    Tawk_API.onLoad = function() {
      console.log("Tawk.to widget loaded");
    };
  }, []);

  // Hide widget
  const hideWidget = () => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  };

  // Show widget
  const showWidget = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
    }
  };
  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize(); // Opens the Tawk.to chat widget
    }
  };
  return (
    <>
      <Dialog
        opened={opened}
        bg={"about"}
        withCloseButton
        onClose={close}
        w={"14rem"}
        p={0}
        radius={'0'}

      >
        <Box>
          <Title w={"100%"} ta={"center"} c={'white'} py={"md"} bg={"services"} order={5}>
           {t('Live Chat')}
          </Title>

          <Box px={'sm'}>
            <Text c="services" size={'sm'} my={'sm'}>
              {t("Have Questions? Chatwith us live")}
            </Text>
            <Text color="white" size={'xs'} mr={'md'}>
              {t(
                "Hit the button below to connect with our team in real time and get answers to all your logistics questions. We are ready to assist!"
              )}
            </Text>
          </Box>
          <Box mx={4}  mt={'md'}>
          <ActionIcon
            // style={{ position: "absolute" }}
            bg="#fff"
            size={"xl"}

            variant="filled"
            aria-label="bottom arrow"
            w={'100%'}
            radius={'0'}
            mb={4}
            onClick={openChat}

          >
            <IconMessage
              style={{ width: "80%", height: "80%", color: theme.colors.quote[5] }}
              stroke={1.5}
            />
          </ActionIcon>

          </Box>
        </Box>
      </Dialog>
    </>
  );
}
export default LiveChat;
