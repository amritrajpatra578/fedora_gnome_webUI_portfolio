import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Box
      h="100vh"
      w="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(135deg, #1a1a1a, #0f0f0f)"
      color="white"
      position="relative"
      overflow="hidden"
    >
      <VStack
        gap={5}
        px={10}
        py={8}
        rounded="2xl"
        bg="rgba(40,40,40,0.6)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255,255,255,0.08)"
        boxShadow="0 20px 60px rgba(0,0,0,0.6)"
        textAlign="center"
      >
        <Text fontSize="6xl" fontWeight="bold">
          404
        </Text>

        <Text fontSize="lg" opacity={0.8}>
          Page not found
        </Text>

        <Text fontSize="sm" opacity={0.6}>
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </Text>

        <Button
          mt={2}
          colorScheme="blue"
          rounded="full"
          px={6}
          onClick={() => router.push("/")}
        >
          Go Home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
