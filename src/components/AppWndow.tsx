import { Box, Flex, IconButton, Text, Link, Skeleton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiX, FiDownload } from "react-icons/fi";
import { FunctionComponent, useState } from "react";

const MotionBox = motion.create(Box);

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
  const [loading, setLoading] = useState(true);

  if (!app || !rect) return null;

  return (
    <MotionBox
      position="fixed"
      top={rect.top}
      left={rect.left}
      width={rect.width}
      height={rect.height}
      bg="black"
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

        <Flex gap={2}>
          {app === "Resume" && (
            <Link href="/AMRITRAJ_PATRA_Resume.pdf" download target="_blank">
              <IconButton
                aria-label="download"
                size="sm"
                variant="ghost"
                color="white"
              >
                <FiDownload />
                <Box
                  position="absolute"
                  top="6px"
                  right="6px"
                  w="6px"
                  h="6px"
                  bg="green.400"
                  rounded="full"
                />
              </IconButton>
            </Link>
          )}

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
      </Flex>

      <Box h="calc(100% - 50px)" position="relative">
        {app === "Resume" ? (
          <>
            {loading && <Skeleton position="absolute" inset="0" zIndex={10} />}

            <iframe
              src="/AMRITRAJ_PATRA_Resume.pdf"
              width="100%"
              height="100%"
              style={{
                border: "none",
                opacity: loading ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
              onLoad={() => setLoading(false)}
            />
          </>
        ) : (
          <Flex align="center" justify="center" h="full" color="white">
            {app} App (Coming soon)
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
};

export default AppWindow;
