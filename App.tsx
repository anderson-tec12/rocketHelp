import React from "react";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";

import { THEME } from "./src/styles/theme";

// import { SignIn } from "./src/Screens/SignIn";
// import { Home } from "./src/Screens/Home";
import { Register } from "./src/Screens/Register";
import { Loading } from "./src/Components/Loading";

export default function App() {
  const [fontsLoad] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        // hidden
      />
      {fontsLoad ? <Register /> : <Loading />}
    </NativeBaseProvider>
  );
}
