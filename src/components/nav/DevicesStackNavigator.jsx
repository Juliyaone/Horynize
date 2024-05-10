import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DevicesAddScreen from '../../screens/Devices/DevicesAddScreen';
import DevicesAllScreen from '../../screens/Devices/DevicesAllScreen';
import DevicesUserScreen from '../../screens/Devices/DevicesUserScreen';

const DevicesStack = createNativeStackNavigator();

function DevicesStackNavigator() {
  return (
    <DevicesStack.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
    >
      <DevicesStack.Screen
        name="DevicesUser"
        component={DevicesUserScreen}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      <DevicesStack.Screen
        name="DevicesAll"
        component={DevicesAllScreen}
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
