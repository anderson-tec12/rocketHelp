import React, { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../Components/Input";
import { Button } from "../Components/Button";

export function SignIn() {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn() {
    if (!email || !pass) {
      return Alert.alert("Entrar", "Informe email e senha!");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, pass)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        Alert.alert("Error :(", "Email ou senha incorretos");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // console.log(email, pass);
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />

      <Input
        mb={8}
        secureTextEntry
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        onChangeText={setPass}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
