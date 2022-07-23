import { useEffect, useState } from "react";
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

import firestore from "@react-native-firebase/firestore";

import { SignOut, ChatTeardropText } from "phosphor-react-native";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

import { Filter } from "../Components/Filter";
import { Button } from "../Components/Button";
import { Loading } from "../Components/Loading";
import { Order, IORDERPROPS } from "../Components/Order";

import Logo from "../assets/logo_secondary.svg";
import { dateFormat } from "../utils/dataFormat";

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [statusSelected, setStatusSelected] = useState<"open" | "closed">(
    "open"
  );

  const [orders, setOrders] = useState<IORDERPROPS[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function handleOpenNewOrder() {
    navigation.navigate("new");
  }

  function handleOpenDetails(orderId: string) {
    navigation.navigate("details", { orderId });
  }

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        Alert.alert("Sair", "Não foi possivel sair.");
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection("orders")
      .where("status", "==", statusSelected)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, created_at, status } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: dateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected]);

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

        <IconButton
          onPress={handleLogout}
          icon={<SignOut size={26} color={colors.gray[300]} />}
        />
      </HStack>

      <VStack px={6} flex={1}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
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

        {isLoading ? (
          <Loading />
        ) : (
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
                  <Text
                    fontSize="xl"
                    mt={6}
                    textAlign="center"
                    color="gray.300"
                  >
                    Você ainda não possui {"\n"}solicitações{" "}
                    {statusSelected === "open" ? "em andamento" : "finalizados"}
                  </Text>
                </Center>
              );
            }}
          />
        )}

        <Button title="Nova solicitação" onPress={handleOpenNewOrder} />
      </VStack>
    </VStack>
  );
}
