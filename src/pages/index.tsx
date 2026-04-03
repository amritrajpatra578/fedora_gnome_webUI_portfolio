import Demo from "@/components/Demo";
import { Button, HStack } from "@chakra-ui/react";
import { Geist, Geist_Mono } from "next/font/google";

export default function Home() {
  return (
    <HStack>
      <Demo></Demo>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  );
}
