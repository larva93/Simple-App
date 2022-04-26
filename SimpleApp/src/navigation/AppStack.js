import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './BottomTabs';
import MovieDetail from '../screens/Movie Detail';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

export default AppStack;
