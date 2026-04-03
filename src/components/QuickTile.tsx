import { Box, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export function QuickTile({ icon, label, active = false }: Props) {
  const [isActive, setIsActive] = useState(active);

  return (
    <Box
      onClick={() => setIsActive(!isActive)}
      cursor="pointer"
      p={3}
      rounded="xl"
      transition="all 0.2s ease"
      bg={isActive ? "blue.500" : "whiteAlpha.100"}
      _hover={{
        bg: isActive ? "blue.600" : "whiteAlpha.200",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
    >
      <VStack gap={2}>
        <Box fontSize="18px" color={isActive ? "white" : "gray.300"}>
          {icon}
        </Box>

        <Text
          fontSize="xs"
          textAlign="center"
          color={isActive ? "white" : "gray.300"}
        >
          {label}
        </Text>
      </VStack>
    </Box>
  );
}
