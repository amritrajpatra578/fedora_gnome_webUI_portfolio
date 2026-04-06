import AppWindow from "@/components/AppWndow";
import Dock from "@/components/Dock";
import { Box } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";

const HomePage: FunctionComponent = () => {
  const [app, setApp] = useState<string | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [closing, setClosing] = useState(false);

  const openApp = (name: string, r: DOMRect) => {
    setRect(r);
    setApp(name);
    setClosing(false);
  };

  const closeApp = () => {
    setClosing(true);
    setTimeout(() => setApp(null), 300);
  };

  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      <Box
        position="absolute"
        inset="0"
        bgImage="url('/bg.jpg')"
        bgSize="cover"
        backgroundPosition="center"
      />

      <Box
        position="absolute"
        inset="0"
        bg="black"
        opacity={app ? 0.4 : 0.2}
        transition="opacity 0.3s ease"
      />

      <AppWindow app={app} rect={rect} closing={closing} onClose={closeApp} />

      <Dock onOpenApp={openApp} />
    </Box>
  );
};

export default HomePage;
