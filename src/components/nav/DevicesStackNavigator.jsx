import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DevicesAddScreen from '../../screens/Devices/DevicesAddScreen.jsx';
import DevicesScreen from '../../screens/Devices/DevicesScreen.jsx';

const DevicesStack = createNativeStackNavigator();

function DevicesStackNavigator() {
  return (
    <DevicesStack.Navigator screenOptions={{ headerShown: false }}>
      <DevicesStack.Screen name="Devices" component={DevicesScreen} />
      <DevicesStack.Screen name="DevicesAdd" component={DevicesAddScreen} />
    </DevicesStack.Navigator>
  );
}

export default DevicesStackNavigator;
