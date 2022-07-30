import React from 'react';
import { useTheme } from '@react-navigation/native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions
} from '@react-navigation/bottom-tabs';
import { Platform, View } from "react-native"
import { HomeScreenParam, TabScreenParam } from './screens';
import { NavigationProp, RouteProp } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from "react-native-vector-icons/Ionicons"

import HomeScreen from "../../screens/home"
import Chart from '../../screens/chart';
import Online from '../../screens/online';
import Custom from '../../screens/custom';
import Book from '../../screens/book';
import NewBook from '../../screens/newBook';




const { Screen, Navigator } = createBottomTabNavigator<TabScreenParam>();
const {
  Screen: StackScreen,
  Navigator: StackNav,
} = createStackNavigator<HomeScreenParam>();

type ScreenOptions = {
  route: RouteProp<TabScreenParam>;
  navigation: NavigationProp<TabScreenParam>;
};

const HomeNavigator: React.FC = () => {
  const { colors } = useTheme();


  return (
      <Navigator initialRouteName="Home">
        <Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size}   />
          }}
          
        />
        <Screen
          name="Chart"
          component={Chart}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons name='stats-chart' color={color} size={size}   />
          }}
        />
        <Screen
          name="Online"
          component={Online}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons name='wifi' color={color} size={size}   />
          }}
        />
        <Screen
          name="Custom"
          component={Custom}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Ionicons name='bookmark' color={color} size={size}   />
          }}
        />
      </Navigator>
  );
};

const Home: React.FC = () => {
  const { colors } = useTheme();
  return (  
          <StackNav
            screenOptions={{
              headerShown: false
            }}
            initialRouteName="Tab"
          >
            <StackScreen
              component={HomeNavigator}
              name="Tab"
              options={{
                title: 'Home'
              }}
            />

            <StackScreen name='Book' component={Book} />
            <StackScreen name='NewBook' component={NewBook}/>

            {/* <StackScreen
              name='Chat'
            /> */}
        
            {/* <StackScreen component={ChatsNavigation} name="ChatsScreenStack" /> */}
        
          </StackNav>
  );
};

export default Home;
