import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingsScreen from '../../screens/Settings/SettingsScreen'
import ChangeUserDataScreen from '../../screens/Settings/ChangeUserDataScreen';

const SettingsStack = createNativeStackNavigator();

function SettingsStackNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="ChangeUserData" component={ChangeUserDataScreen} />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackNavigator;
