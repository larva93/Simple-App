import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import About from '../screens/About';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: true,
        headerTintColor: '#FFFFFF',
        headerStyle: {backgroundColor: '#1A1C22'},
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarInactiveTintColor: '#828387',
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveBackgroundColor: '#000000',
        tabBarActiveBackgroundColor: '#1A1C22',
        tabBarLabelStyle: {fontSize: 12, fontWeight: '700'},
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name == 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? 25 : 20;
          } else if (route.name == 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
            size = focused ? 25 : 20;
          } else if (route.name == 'About') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
            size = focused ? 25 : 20;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen options={{headerShown: false}} name="Home" component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name="Explore"
        component={Explore}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="About"
        component={About}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
