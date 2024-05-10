import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DevicesIcon from '../../img/icons/nav/devices';
import HomeIcon from '../../img/icons/nav/home';
import SettingIcon from '../../img/icons/nav/setting';

import HomeStackNavigator from './HomeStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import DevicesStackNavigator from './DevicesStackNavigator';
// import { AuthContext } from '../providers/AuthContext';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  // const { userToken, isLoading, isInitialized } = useContext(AuthContext);

  // useEffect(() => {
  //   if (isInitialized && !isLoading) {
  //     navigation.navigate(userToken ? 'DevicesStack' : 'DevicesStack');
  //   }
  // }, [userToken, isLoading, isInitialized, navigation]);

  const activTabIconColor = '#ED7635';
  return (
    <Tab.Navigator
      initialRouteName="DevicesStack"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
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
          paddingTop: 15,

          borderTopWidth: 1,
          borderTopColor: '#BEBEC0',
        },
        tabBarLabel: '',
      })}
    >
      <Tab.Screen
        name="DevicesStack"
        component={DevicesStackNavigator}
        options={{ unmountOnBlur: true, headerShown: false }}
      />
      <Tab.Screen
        name="HomeStack"
        options={{ unmountOnBlur: true, headerShown: false }}
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="SettingsStack"
        options={{ unmountOnBlur: true, headerShown: false }}
        component={SettingsStackNavigator}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
