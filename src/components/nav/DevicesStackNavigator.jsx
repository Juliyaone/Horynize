import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DevicesAddScreen from '../../screens/Devices/DevicesAddScreen';
import DevicesScreen from '../../screens/Devices/DevicesScreen';

const DevicesStack = createNativeStackNavigator();

function DevicesStackNavigator() {
  return (
    <DevicesStack.Navigator
      initialRouteName="Devices"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
    >
      <DevicesStack.Screen
        name="Devices"
        component={DevicesScreen}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <DevicesStack.Screen name="DevicesAdd" component={DevicesAddScreen} />
    </DevicesStack.Navigator>
  );
}

export default DevicesStackNavigator;
