import { Box, Flex, HStack, Text } from "@chakra-ui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import {
  FiBatteryCharging,
  FiBluetooth,
  FiVolume2,
  FiWifi,
} from "react-icons/fi";
import ClockMenu from "./ClockMenu";
import SystemMenu from "./SystemMenu";

const Navbar: FunctionComponent = () => {
  const [time, setTime] = useState("");
  const [clockOpen, setClockOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const closeAll = () => {
    setClockOpen(false);
    setSystemOpen(false);
  };

  return (
    <Fragment>
      {(clockOpen || systemOpen) && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          zIndex={999}
          onClick={closeAll}
        />
      )}

      <Box
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="40px"
        px={4}
        bg="rgba(0, 0, 0, 0.74)"
        backdropFilter="blur(20px)"
        borderBottom="1px solid rgba(255,255,255,0.08)"
        zIndex={1000}
      >
        <Flex h="100%" align="center" justify="space-between">
          <Box
            position="relative"
            onMouseEnter={() => setShowIntro(true)}
            onMouseLeave={() => setShowIntro(false)}
          >
            <Box
              as="button"
              color="white"
              fontSize="sm"
              px={2}
              py={1}
              rounded="md"
              _hover={{
                bg: "rgba(255,255,255,0.08)",
              }}
              transition="all 0.2s ease"
            >
              Amritraj Patra
            </Box>

            <Box
              position="absolute"
              top="120%"
              left="0"
              w="260px"
              bg="rgba(40,40,40,0.75)"
              backdropFilter="blur(20px)"
              border="1px solid rgba(255,255,255,0.08)"
              p={3}
              rounded="xl"
              shadow="xl"
              color="white"
              opacity={showIntro ? 1 : 0}
              transform={showIntro ? "translateY(0)" : "translateY(-10px)"}
              pointerEvents={showIntro ? "auto" : "none"}
              transition="all 0.2s ease"
              zIndex={1200}
            >
              <Box fontSize="xs" opacity={0.75} mt={1}>
                I am a Full-Stack Developer crafting real-time systems and
                recreating OS-level experiences like this Fedora GNOME-inspired
                web UI.
              </Box>
            </Box>
          </Box>

          <Box position="relative">
            <Text
              color="white"
              fontSize="sm"
              cursor="pointer"
              onClick={() => {
                setClockOpen(!clockOpen);
                setSystemOpen(false);
              }}
              _hover={{ opacity: 0.7 }}
            >
              {time}
            </Text>

            <ClockMenu isOpen={clockOpen} />
          </Box>

          <Box position="relative">
            <HStack
              _hover={{ opacity: 0.7 }}
              gap={3}
              color="white"
              cursor="pointer"
              onClick={() => {
                setSystemOpen(!systemOpen);
                setClockOpen(false);
              }}
            >
              <Box as={FiWifi} boxSize="18px" />
              <Box as={FiBluetooth} boxSize="14px" />
              <Box as={FiVolume2} boxSize="17px" />
              <Box as={FiBatteryCharging} boxSize="18px" />
            </HStack>

            <SystemMenu
              isOpen={systemOpen}
              onClose={() => setSystemOpen(false)}
            />
          </Box>
        </Flex>
      </Box>
    </Fragment>
  );
};

export default Navbar;
