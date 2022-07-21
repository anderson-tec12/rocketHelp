import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from "native-base";

import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from "phosphor-react-native";

export type IORDERPROPS = {
  id: string;
  patrimony: string;
  when: string;
  status: "open" | "closed";
};

interface IPROPS extends IPressableProps {
  data: IORDERPROPS;
}

export function Order({ data, ...rest }: IPROPS) {
  const { colors } = useTheme();

  const colorType =
    data.status === "open" ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        rounded="sm"
        justifyContent="space-between"
        alignItems="center"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colorType} />

        <VStack flex={1} ml={5} my={5}>
          <Text color="white" fontSize="md">
            Patrimônio {data.patrimony}
          </Text>

          <HStack alignContent="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {data.status === "closed" ? (
            <CircleWavyCheck size={24} color={colorType} />
          ) : (
            <Hourglass size={24} color={colorType} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
}
