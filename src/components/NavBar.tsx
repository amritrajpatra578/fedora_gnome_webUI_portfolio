import { Box, Flex, Text, HStack } from "@chakra-ui/react";
import {
  FiWifi,
  FiVolume2,
  FiBluetooth,
  FiBatteryCharging,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import ClockMenu from "./ClockMenu";
import SystemMenu from "./SystemMenu";

export default function Navbar() {
  const [time, setTime] = useState("");
  const [clockOpen, setClockOpen] = useState(false);
  const [systemOpen, setSystemOpen] = useState(false);

  // ⏰ Live Time
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

  // 🔴 Close all menus
  const closeAll = () => {
    setClockOpen(false);
    setSystemOpen(false);
  };

  return (
    <>
      {/* 🔲 Overlay for outside click */}
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

      {/* 🔝 Navbar */}
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
          {/* 🔹 LEFT */}
          <Text
            color="white"
            fontSize="sm"
            cursor="pointer"
            _hover={{ opacity: 0.7 }}
          >
            Amritraj Patra
          </Text>

          {/* 🔹 CENTER (Clock) */}
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

          {/* 🔹 RIGHT (System Icons) */}
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
    </>
  );
}
