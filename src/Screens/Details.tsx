import { VStack, useTheme, HStack, Text, ScrollView, Box } from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Firestore from "@react-native-firebase/firestore";
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  Clipboard,
} from "phosphor-react-native";
import { Alert } from "react-native";

import { Header } from "../Components/Header";
import { IORDERPROPS } from "../Components/Order";
import { Input } from "../Components/Input";
import { Loading } from "../Components/Loading";
import { CardDetails } from "../Components/CardDetails";
import { Button } from "../Components/Button";
import { OrderFirestoreDTO } from "../DTO/orderDTO";
import { dateFormat } from "../utils/dataFormat";

type RouteParams = {
  orderId: string;
};

type OrderDetails = IORDERPROPS & {
  description: string;
  solution: string;
  closed: string;
};

export function Details() {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [solution, setSolution] = useState("");
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);

  const { orderId } = route.params as RouteParams;

  function handleOrderClosed() {
    if (!solution) {
      return Alert.alert("Solução", "Preencha uma solução!");
    }

    Firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(order.id)
      .update({
        status: "closed",
        solution,
        closed_at: Firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert("Solicitação", "Solicitação encerrada com sucesso!");
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Solicitação", "Não foi possivel encerrar a solicitação");
      });
  }

  useEffect(() => {
    Firestore()
      .collection<OrderFirestoreDTO>("orders")
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          created_at,
          description,
          patrimony,
          status,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? dateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          closed,
          solution,
          when: dateFormat(created_at),
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === "closed" ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          ml={2}
          textTransform="uppercase"
          color={
            order.status === "closed"
              ? colors.green[300]
              : colors.secondary[700]
          }
        >
          {order.status === "closed" ? "Finalizado" : "Em andamento"}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="Equipamento"
          description={`Patrimonio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="Descrição do problema"
          description={`${order.description}`}
          icon={Clipboard}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="Solução"
          icon={CircleWavyCheck}
          description={order.solution}
          footer={order.closed && `Encerrado em ${order.closed}`}
        >
          {order.status === "open" && (
            <Input
              placeholder="Descrição da solução"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === "open" && (
        <Button
          title="Encerrar solicitação"
          onPress={handleOrderClosed}
          m={5}
        />
      )}
    </VStack>
  );
}
