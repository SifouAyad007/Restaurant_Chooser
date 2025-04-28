import React from "react";
import { Image, Platform } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PeopleScreen from "./screens/PeopleScreen";
import DecisionScreen from "./screens/DecisionScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import homeScreen from "./screens/homeScreen" ; 
import Constants from 'expo-constants';

const platformOS = Platform.OS.toLowerCase();
// console.log("PeopleScreen:", PeopleScreen);

const Tab = createMaterialTopTabNavigator();

export const Navigation = () => {
    return (
    <Tab.Navigator
    initialRouteName="DecisionScreen"
    screenOptions={{
    animationEnabled: true,
    swipEnabled: true,
    tabBarPosition: platformOS === "android" ? "top" : "bottom",
    tabBarActiveTintColor: "#1900ff",
    tabBarShowIcon: true,
    tabBarStyle: {
    paddingTop: platformOS === "android" ? Constants.statusBarnHeight : 0,
    },
}}
>
<Tab.Screen 
  name="PeopleScreen" 
  component={PeopleScreen} 
  options={{ 
    tabBarLabel: "People", 
    tabBarIcon: ({ color }) => (
      <Image 
        source={require("./assets/icon-people.png")} 
        style={{ width: 32, height: 32, tintColor: color }} 
      />
    ), 
  }} 
/>

<Tab.Screen 
  name="DecisionScreen" 
  component={DecisionScreen} 
  options={{ 
    tabBarLabel: "Decision", 
    tabBarIcon: ({ color }) => (
      <Image 
        source={require("./assets/icon-decision.png")} 
        style={{ width: 32, height: 32, tintColor: color }} 
      />
    ), 
  }} 
/>
<Tab.Screen
  name="RestaurantsScreen"
  component={RestaurantsScreen}
  options={{
    tabBarLabel: "Restaurants",
    tabBarIcon: ({ color }) => (
      <Image
        source={require("./assets/icon-restaurants.png")}
        style={{ width: 32, height: 32, tintColor: color }}
      />
    ),
  }}
/>
<Tab.Screen
  name="homeScreen"
  component={homeScreen}
  options={{
    tabBarLabel: "Home",
    tabBarIcon: ({ color }) => (
      <Image
        source={require("./assets/icon-home.png")}
        style={{ width: 32, height: 32, tintColor: color }}
      />
    ),
  }}
/>
</Tab.Navigator>
    );
};


