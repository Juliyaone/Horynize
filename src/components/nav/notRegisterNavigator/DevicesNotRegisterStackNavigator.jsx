import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DevicesAllScreenNotRegister from '../../../screens/Devices/DevicesAllScreenNotRegister';

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
        name="DevicesAll"
        component={DevicesAllScreenNotRegister}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
    </DevicesStack.Navigator>
  );
}

export default DevicesStackNavigator;
