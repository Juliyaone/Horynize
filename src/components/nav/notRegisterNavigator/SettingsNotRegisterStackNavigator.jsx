import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsNotRegisterScreen from '../../../screens/Settings/SettingsNotRegisterScreen'

const SettingsStack = createNativeStackNavigator();

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsNotRegisterScreen" component={SettingsNotRegisterScreen} />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackNavigator;
