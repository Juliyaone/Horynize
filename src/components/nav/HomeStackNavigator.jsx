import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/Home/HomeScreen.jsx';
import HomePlayScreen from '../../screens/Home/HomePlayScreen.jsx';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="HomePlay" component={HomePlayScreen} />
    </HomeStack.Navigator>
  );
} 

export default HomeStackNavigator;
