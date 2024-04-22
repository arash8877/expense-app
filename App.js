import { StatusBar } from "expo-status-bar";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpenses";
import manageExpense from "./screens/ManageExpense";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ManageExpense" component={manageExpense} />
          <Stack.Screen name="AllExpenses" component={AllExpenses} />
          <Stack.Screen name="RecentExpenses" component={RecentExpenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
