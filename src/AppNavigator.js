import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import CreatePost from './screens/CreatePost';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Splash}
          name={'Splash'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Home}
          name={'Home'}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={CreatePost}
          name={'CreatePost'}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
