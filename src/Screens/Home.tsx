import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Heading,
  HStack,
  IconButton,
  Text,
  useTheme,
  VStack,
  FlatList,
  Center,
} from "native-base";
import { SignOut, ChatTeardropText } from "phosphor-react-native";

import { Filter } from "../Components/Filter";
import { Button } from "../Components/Button";
import { Order, IORDERPROPS } from "../Components/Order";

import Logo from "../assets/logo_secondary.svg";

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<IORDERPROPS[]>([
    {
      id: "11",
      patrimony: "123",
      status: "open",
      when: "10/12/2022",
    },
  ]);

  function handleOpenNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  return (
    <VStack flex={1} pb={6} bg={"gray.700"}>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        pt={12}
        bg="gray.600"
        pb={5}
        px={6}
      >
        <Logo />

        <IconButton icon={<SignOut size={26} color={colors.gray[300]} />} />
      </HStack>

      <VStack px={6} flex={1}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Meus Chamados</Heading>
          <Text color="gray.200">3</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            title="em andamento"
            type="open"
            isActive={statusSelected === "open"}
            onPress={() => setStatusSelected("open")}
          />
          <Filter
            title="finalizados"
            type="closed"
            isActive={statusSelected === "closed"}
            onPress={() => setStatusSelected("closed")}
          />
        </HStack>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Order data={item} onPress={() => handleOpenDetails(item.id)} />
          )}
          ListEmptyComponent={() => {
            return (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text fontSize="xl" mt={6} textAlign="center" color="gray.300">
                  Você ainda não possui {"\n"}solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizados"}
                </Text>
              </Center>
            );
          }}
        />

        <Button title="Nova solicitação" onPress={handleOpenNewOrder} />
      </VStack>
    </VStack>
  );
}
