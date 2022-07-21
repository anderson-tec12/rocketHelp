import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Details } from "../Screens/Details";
import { Home } from "../Screens/Home";
import { Register } from "../Screens/Register";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="new" component={Register} />
      <Screen name="details" component={Details} />
    </Navigator>
  );
}
