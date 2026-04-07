import {
  Box,
  HStack,
  IconButton,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiPause,
  FiPlay,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";

export interface ClockMenuProps {
  isOpen: boolean;
}

const ClockMenu: FunctionComponent<ClockMenuProps> = ({ isOpen }) => {
  const [playing, setPlaying] = useState(true);
  const [date, setDate] = useState(new Date());

  const track = {
    title: "Timeless",
    artist: "The Weeknd, Playboi Carti",
    cover: "weeknd.jpg",
  };

  const today = new Date();

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = date.toLocaleString("default", {
    month: "long",
  });

  return (
    <Box
      position="absolute"
      top="40px"
      left="50%"
      transform="translateX(-50%)"
      w="360px"
      bg="rgba(40,40,40,0.75)"
      backdropFilter="blur(20px)"
      color="white"
      p={4}
      rounded="2xl"
      shadow="xl"
      zIndex={1100}
      opacity={isOpen ? 1 : 0}
      transition="all 0.2s ease"
      pointerEvents={isOpen ? "auto" : "none"}
    >
      <VStack gap={4} align="stretch">
        <Box>
          <HStack justify="space-between" mb={2}>
            <IconButton
              aria-label="prev"
              size="sm"
              variant="ghost"
              onClick={() => setDate(new Date(year, month - 1, 1))}
            >
              <FiChevronLeft />
            </IconButton>

            <Text fontSize="sm" fontWeight="medium">
              {monthName} {year}
            </Text>

            <IconButton
              aria-label="next"
              size="sm"
              variant="ghost"
              onClick={() => setDate(new Date(year, month + 1, 1))}
            >
              <FiChevronRight />
            </IconButton>
          </HStack>

          <SimpleGrid columns={7} gap={1} mb={1}>
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <Text
                key={`${d}-${i}`}
                fontSize="xs"
                textAlign="center"
                opacity={0.6}
              >
                {d}
              </Text>
            ))}
          </SimpleGrid>

          <SimpleGrid columns={7} gap={1}>
            {days.map((day, i) => {
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();

              return (
                <Box
                  key={i}
                  h="32px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="sm"
                  rounded="md"
                  bg={isToday ? "blue.500" : "transparent"}
                  _hover={{
                    bg: isToday ? "blue.600" : "whiteAlpha.200",
                  }}
                  cursor={day ? "pointer" : "default"}
                >
                  {day || ""}
                </Box>
              );
            })}
          </SimpleGrid>
        </Box>

        <Box>
          <Text fontSize="sm" mb={2} opacity={0.7}>
            Now Playing
          </Text>

          <Box bg="whiteAlpha.100" rounded="xl" p={3}>
            <HStack align="center" gap={3}>
              <Image
                src={track.cover}
                alt="cover"
                boxSize="50px"
                objectFit="cover"
                rounded="md"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://via.placeholder.com/50";
                }}
              />

              <VStack align="stretch" flex={1} gap={2}>
                {playing ? (
                  <VStack align="start" gap={0}>
                    <Text fontSize="sm" fontWeight="medium" lineClamp={1}>
                      {track.title}
                    </Text>
                    <Text fontSize="xs" opacity={0.6} lineClamp={1}>
                      {track.artist}
                    </Text>
                  </VStack>
                ) : (
                  <Text fontSize="sm">No Music Playing</Text>
                )}

                <HStack gap={2}>
                  <IconButton aria-label="prev" size="xs" variant="ghost">
                    <FiSkipBack />
                  </IconButton>

                  <IconButton
                    aria-label="play"
                    size="xs"
                    variant="ghost"
                    onClick={() => setPlaying(!playing)}
                  >
                    {playing ? <FiPause /> : <FiPlay />}
                  </IconButton>

                  <IconButton aria-label="next" size="xs" variant="ghost">
                    <FiSkipForward />
                  </IconButton>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
};

export default ClockMenu;
