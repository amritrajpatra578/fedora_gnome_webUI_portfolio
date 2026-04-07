import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Slider,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import {
  FiAirplay,
  FiBatteryCharging,
  FiBell,
  FiBluetooth,
  FiLock,
  FiMoon,
  FiPower,
  FiSettings,
  FiSun,
  FiWifi,
} from "react-icons/fi";
import QuickTile from "./QuickTile";

export interface SystemMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SystemMenu: FunctionComponent<SystemMenuProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <Box
      position="fixed"
      inset="0"
      zIndex={1000}
      onClick={onClose}
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        position="absolute"
        top="50px"
        right="12px"
        w="340px"
        bg="rgba(50,50,50,0.65)"
        backdropFilter="blur(24px)"
        border="1px solid rgba(255,255,255,0.08)"
        color="white"
        p={4}
        rounded="2xl"
        shadow="0 10px 40px rgba(0,0,0,0.6)"
        opacity={isOpen ? 1 : 0}
        transform={
          isOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.98)"
        }
        transition="all 0.18s cubic-bezier(0.25, 0.8, 0.25, 1)"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Box bg="whiteAlpha.200" px={3} py={1} rounded="full">
            <Flex>
              <Box as={FiBatteryCharging} margin={1} boxSize="18px" />
              <>100%</>
            </Flex>
          </Box>

          <HStack gap={2}>
            <IconButton aria-label="settings" size="sm" variant="ghost">
              <FiSettings />
            </IconButton>
            <IconButton aria-label="lock" size="sm" variant="ghost">
              <FiLock />
            </IconButton>
            <IconButton aria-label="power" size="sm" variant="ghost">
              <FiPower />
            </IconButton>
          </HStack>
        </Flex>

        <Text fontSize="xs" mb={1}>
          Volume
        </Text>
        <Slider.Root defaultValue={[40]}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} />
          </Slider.Control>
        </Slider.Root>

        <Text fontSize="xs" mt={3} mb={1}>
          Brightness
        </Text>
        <Slider.Root defaultValue={[70]}>
          <Slider.Control>
            <Slider.Track>
              <Slider.Range />
            </Slider.Track>
            <Slider.Thumb index={0} />
          </Slider.Control>
        </Slider.Root>

        <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={4}>
          <GridItem>
            <QuickTile icon={<FiWifi />} label="Wi-Fi" active />
          </GridItem>

          <GridItem>
            <QuickTile icon={<FiBluetooth />} label="Bluetooth" active />
          </GridItem>

          <GridItem>
            <QuickTile icon={<FiMoon />} label="Night Light" active />
          </GridItem>

          <GridItem>
            <QuickTile icon={<FiSun />} label="Dark Style" active />
          </GridItem>

          <GridItem>
            <QuickTile icon={<FiAirplay />} label="Airplane" />
          </GridItem>

          <GridItem>
            <QuickTile icon={<FiBell />} label="Do Not Disturb" />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default SystemMenu;
