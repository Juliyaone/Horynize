import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DevicesIcon from '../../img/icons/nav/devices.jsx';
import HomeIcon from '../../img/icons/nav/home.jsx';
import SettingIcon from '../../img/icons/nav/setting.jsx';


import HomeStackNavigator from './HomeStackNavigator.jsx';
import SettingsStackNavigator from './SettingsStackNavigator.jsx';
import DevicesStackNavigator from './DevicesStackNavigator.jsx';


const Tab = createBottomTabNavigator();

function TabNavigator() {
  const activTabIconColor = '#ED7635';
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconXml;

          if (route.name === 'HomeStack') {
            iconXml = <HomeIcon />;
          } else if (route.name === 'SettingsStack') {
            iconXml = <SettingIcon />;
          } else if (route.name === 'DevicesStack') {
            iconXml = <DevicesIcon />;
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
          borderTopWidth: 1,
          borderTopColor: '#BEBEC0'
        },
        tabBarLabel: ''
      })}
    >
      <Tab.Screen name="DevicesStack" options={{ headerShown: false }} component={DevicesStackNavigator} />

      <Tab.Screen name="HomeStack" options={{ headerShown: false }} component={HomeStackNavigator} />
      <Tab.Screen name="SettingsStack" options={{ headerShown: false }} component={SettingsStackNavigator} />

    </Tab.Navigator>
  );
}

export default TabNavigator;
