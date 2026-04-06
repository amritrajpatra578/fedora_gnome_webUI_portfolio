import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import { FiX } from "react-icons/fi";

const MotionBox = motion(Box);

export interface AppWindowProps {
  app: string | null;
  rect: DOMRect | null;
  closing: boolean;
  onClose: () => void;
}

const AppWindow: FunctionComponent<AppWindowProps> = ({
  app,
  rect,
  closing,
  onClose,
}) => {
  if (!app || !rect) {
    return null;
  }

  return (
    <MotionBox
      position="fixed"
      top={rect.top}
      left={rect.left}
      width={rect.width}
      height={rect.height}
      bg="rgb(0, 0, 0)"
      borderRadius="16px"
      zIndex={2000}
      animate={
        closing
          ? {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              borderRadius: 16,
            }
          : {
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              borderRadius: 0,
            }
      }
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25,
      }}
    >
      <Flex justify="space-between" align="center" p={3}>
        <Text color="white" fontSize="sm">
          {app}
        </Text>

        <IconButton
          aria-label="close"
          size="sm"
          onClick={onClose}
          variant="ghost"
          color="white"
        >
          <FiX />
        </IconButton>
      </Flex>

      <Flex align="center" justify="center" h="full" color="white">
        {app} App (Empty for now)
      </Flex>
    </MotionBox>
  );
};

export default AppWindow;
