import AuthScreen from "./components/auth/authScreen";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from "./navigation";



export default function AppNavigator() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen} 
        options={{ headerShown: false }} // hide header if you want
      />
      <Stack.Screen 
        name="Home" 
        component={Navigation} 
      />
    </Stack.Navigator>
  );
}