import { Box, HStack } from "@chakra-ui/react";
import {
  FiGithub,
  FiFileText,
  FiFile,
  FiCalendar,
  FiMusic,
  FiMail,
  FiLink,
  FiTerminal,
} from "react-icons/fi";

const apps = [
  { icon: FiGithub, label: "GitHub" },
  { icon: FiFileText, label: "Notes" },
  { icon: FiFile, label: "PDF" },
  { icon: FiCalendar, label: "Calendar" },
  { icon: FiMusic, label: "Spotify" },
  { icon: FiMail, label: "Mail" },
  { icon: FiLink, label: "Link" },
  { icon: FiTerminal, label: "Terminal" },
];

export default function Dock() {
  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      zIndex={1000}
    >
      <HStack
        gap={3}
        px={4}
        py={2}
        rounded="2xl"
        bg="rgba(30,30,30,0.65)"
        backdropFilter="blur(25px)"
        border="1px solid rgba(255,255,255,0.08)"
        boxShadow="0 15px 40px rgba(0,0,0,0.6)"
      >
        {apps.map((app, i) => {
          const Icon = app.icon;

          return (
            <Box
              key={i}
              position="relative"
              w="48px"
              h="48px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              rounded="xl"
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{
                transform: "translateY(-8px) scale(1.25)",
              }}
              _active={{
                transform: "scale(0.95)",
              }}
            >
              {/* SVG Icon */}
              <Box
                as={Icon}
                boxSize="22px" // 👈 IMPORTANT (perfect visual size)
                color="white"
                opacity={0.9}
              />

              {/* Reflection */}
              <Box
                position="absolute"
                bottom="-12px"
                w="60%"
                h="6px"
                bg="whiteAlpha.200"
                filter="blur(6px)"
                opacity={0.25}
                rounded="full"
              />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
}
