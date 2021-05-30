import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import COLORS from './src/consts/colors';  MAIS TARDE
import Home from '../pages/Home'
import Status from '../pages/Status'

const Stack = createStackNavigator();

const HomeRoutes = () => {
  
  return (
      <NavigationContainer>
        {/* <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" /> */}
        <StatusBar backgroundColor="red" barStyle="dark-content" />
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Status" component={Status} />
  
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default HomeRoutes;
