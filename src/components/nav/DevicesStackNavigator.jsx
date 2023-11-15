import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DevicesAddScreen from '../../screens/Devices/DevicesAddScreen';
import DevicesAllScreen from '../../screens/Devices/DevicesAllScreen';
import DevicesUserScreen from '../../screens/Devices/DevicesUserScreen';
import { AuthContext } from '../providers/AuthContext';

const DevicesStack = createNativeStackNavigator();

function DevicesStackNavigator({ navigation }) {
  const [initialRouteName, setInitialRouteName] = useState('');
  const { userToken, isLoading, isInitialized } = useContext(AuthContext);

  useEffect(() => {
    if (isInitialized && !isLoading) {
      const initialRouteNameData = userToken ? 'DevicesUser' : 'DevicesAll';
      setInitialRouteName(initialRouteNameData);
    }
  }, [userToken, isLoading, isInitialized, navigation]);
  return (
    <DevicesStack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
    >
      {userToken && (

      <DevicesStack.Screen
        name="DevicesUser"
        component={DevicesUserScreen}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      )}

      <DevicesStack.Screen
        name="DevicesAll"
        component={DevicesAllScreen}
        screenOptions={{
          unmountOnBlur: true,
          headerShown: false,
        }}
      />
      {userToken && (
        <DevicesStack.Screen name="DevicesAdd" component={DevicesAddScreen} />
      )}
    </DevicesStack.Navigator>
  );
}

export default DevicesStackNavigator;
