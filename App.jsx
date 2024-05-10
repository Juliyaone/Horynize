import 'react-native-gesture-handler';
import React, { useEffect, useState, useContext } from 'react';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { UserProvider } from './src/components/providers/UserContext';
import { AuthProvider, AuthContext } from './src/components/providers/AuthContext';

import StartScreen from './src/screens/Start/StartScreen';
import SignInScreen from './src/screens/SignIn/SignInScreen'
import SignUpStack from './src/components/nav/SignUpStackNavigator';

import TabNavigator from './src/components/nav/TabNavigator';
import TabNotRegisterNavigator from './src/components/nav/notRegisterNavigator/TabNotRegisterNavigator';

import Loader from './src/components/Loader';

SplashScreen.preventAutoHideAsync();

function AppStack() {
  const Stack = createNativeStackNavigator();
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Stack.Navigator initialRouteName={userToken !== null ? 'MainApp' : 'Start'}>
      <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpStack} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MainAppNotRegister" component={TabNotRegisterNavigator} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
}

function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // eslint-disable-next-line global-require
          SFProDisplay: require('./assets/fonts/SF-Pro-Display-Medium.otf'),
          // eslint-disable-next-line global-require
          SFProDisplayLight: require('./assets/fonts/SF-Pro-Display-Light.otf'),
          // eslint-disable-next-line global-require
          SFProDisplayBold: require('./assets/fonts/SF-Pro-Display-Bold.otf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthProvider>
        <UserProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </UserProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
