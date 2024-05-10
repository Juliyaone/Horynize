import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DevicesIcon from '../../../img/icons/nav/devices';
import SettingIcon from '../../../img/icons/nav/setting';

import SettingsNotRegisterStackNavigator from './SettingsNotRegisterStackNavigator';
import DevicesNotRegisterStackNavigator from './DevicesNotRegisterStackNavigator';

const Tab = createBottomTabNavigator();

function TabNotRegisterNavigator() {
  const initialRouteName = 'DevicesNotRegisterStackNavigator';

  const activTabIconColor = '#ED7635';
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconXml;

          if (route.name === 'DevicesNotRegisterStackNavigator') {
            iconXml = <DevicesIcon />;
          } else if (route.name === 'SettingsNotRegisterStackNavigator') {
            iconXml = <SettingIcon />;
          }

          const iconColor = focused ? activTabIconColor : color;

          return React.cloneElement(iconXml, { color: iconColor });
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
          paddingTop: 15,

          borderTopWidth: 1,
          borderTopColor: '#BEBEC0',
        },
        tabBarLabel: '',
      })}
    >
      <Tab.Screen
        name="DevicesNotRegisterStackNavigator"
        component={DevicesNotRegisterStackNavigator}
        options={{ unmountOnBlur: true, headerShown: false }}
      />

      <Tab.Screen
        name="SettingsNotRegisterStackNavigator"
        options={{ unmountOnBlur: true, headerShown: false }}
        component={SettingsNotRegisterStackNavigator}
      />
    </Tab.Navigator>
  );
}

export default TabNotRegisterNavigator;
