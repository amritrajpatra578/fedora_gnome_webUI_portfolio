import { Box, HStack, Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import { IconType } from "react-icons";
import { BsLinkedin } from "react-icons/bs";
import {
  FiCalendar,
  FiFileText,
  FiGithub,
  FiMail,
  FiPhoneCall,
  FiTerminal,
} from "react-icons/fi";

export interface AppsProps {
  icon: IconType;
  label: string;
  url?: string;
}

const apps: AppsProps[] = [
  {
    icon: FiGithub,
    label: "GitHub",
    url: "https://github.com/amritrajpatra578",
  },
  {
    icon: BsLinkedin,
    label: "Linkedin",
    url: "https://www.linkedin.com/in/amritraj-patra-408b68208/",
  },
  { icon: FiFileText, label: "Resume" },
  { icon: FiPhoneCall, label: "Phone Call", url: "tel:+917077474767" },
  { icon: FiCalendar, label: "Calendar" },
  {
    icon: FiMail,
    label: "Mail",
    url: "mailto:amritrajpatra578@gmail.com",
  },
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
                if (app.url) {
                  window.open(app.url, "_blank", "noopener,noreferrer");
                  return;
                }

                const rect = (
                  e.currentTarget as HTMLElement
                ).getBoundingClientRect();

                onOpenApp(app.label, rect);
              }}
              transition="all 0.2s ease"
              transform={hovered === i ? "translateY(-8px) scale(1.2)" : "none"}
            >
              {/* Hover Label */}
              {hovered === i && (
                <Box
                  position="absolute"
                  bottom="60px"
                  px={2}
                  py={1}
                  rounded="md"
                  bg="rgba(0,0,0,0.85)"
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

              {app.url && (
                <Box
                  position="absolute"
                  top="6px"
                  right="6px"
                  w="6px"
                  h="6px"
                  bg="green.400"
                  rounded="full"
                />
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
