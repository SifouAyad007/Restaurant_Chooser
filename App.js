import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './navigation';
import  AppNavigator  from './AppNavigator' ;

export default function App(){

  return(
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}