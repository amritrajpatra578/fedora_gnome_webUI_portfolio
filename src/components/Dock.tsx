import { Box, HStack, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import {
  FiCalendar,
  FiFile,
  FiFileText,
  FiGithub,
  FiMail,
  FiMusic,
  FiPhoneCall,
  FiTerminal,
} from "react-icons/fi";

const apps = [
  { icon: FiGithub, label: "GitHub" },
  { icon: BsLinkedin, label: "Linkedin" },
  { icon: FiFileText, label: "Notes" },
  { icon: FiFile, label: "PDF" },
  { icon: FiPhoneCall, label: "Phone Call" },
  { icon: FiCalendar, label: "Calendar" },
  { icon: FiMusic, label: "Spotify" },
  { icon: FiMail, label: "Mail" },
  { icon: FiTerminal, label: "Terminal" },
];

export interface DockProps {
  onOpenApp: (app: string, rect: DOMRect) => void;
}

const Dock: FunctionComponent<DockProps> = ({ onOpenApp }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Box position="fixed" bottom="20px" left="50%" transform="translateX(-50%)">
      <HStack
        gap={3}
        px={4}
        py={2}
        rounded="2xl"
        bg="rgba(30,30,30,0.65)"
        backdropFilter="blur(25px)"
        border="1px solid rgba(255,255,255,0.08)"
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
              cursor="pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={(e) => {
                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();
                onOpenApp(app.label, rect);
              }}
              transition="all 0.2s ease"
              transform={hovered === i ? "translateY(-8px) scale(1.2)" : "none"}
            >
              {hovered === i && (
                <Box
                  position="absolute"
                  bottom="60px"
                  px={2}
                  py={1}
                  rounded="md"
                  bg="rgba(0,0,0,0.85)"
                  backdropFilter="blur(10px)"
                  whiteSpace="nowrap"
                  zIndex={2000}
                  pointerEvents="none"
                >
                  <Text fontSize="xs" color="white">
                    {app.label}
                  </Text>

                  <Box
                    position="absolute"
                    bottom="-4px"
                    left="50%"
                    transform="translateX(-50%) rotate(45deg)"
                    w="6px"
                    h="6px"
                    bg="rgba(0,0,0,0.85)"
                  />
                </Box>
              )}

              <Box as={Icon} boxSize="22px" color="white" />
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
};

export default Dock;
