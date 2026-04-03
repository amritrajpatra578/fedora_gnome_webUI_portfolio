import Dock from "@/components/Docks";
import SystemMenu from "@/components/SystemMenu";
import { Box, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const systemMenu = useDisclosure();

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Wallpaper */}
      <Box
        position="absolute"
        inset="0"
        bgImage="url('/bg.jpg')"
        bgSize="cover"
        backgroundPosition="center"
        transition="transform 0.4s ease"
      />

      {/* Dim Layer */}
      <Box
        position="absolute"
        inset="0"
        bg="black"
        opacity={systemMenu.open ? 0.55 : 0.25}
        transition="opacity 0.3s ease"
      />

      {/* UI Layer */}
      <Box position="relative" zIndex={10}>
        <SystemMenu isOpen={systemMenu.open} onClose={systemMenu.onClose} />

        <Dock />
      </Box>
    </Box>
  );
}
