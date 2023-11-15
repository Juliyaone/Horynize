import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PrivacyPolicyScreen from '../../screens/SignUp/PrivacyPolicyScreen';
import SignUpScreen from '../../screens/SignUp/SignUpScreen';

const PrivacyPolicyStack = createNativeStackNavigator();

function SignUpStackNavigator() {
  return (
    <PrivacyPolicyStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivacyPolicyStack.Screen name="SignUpScreen" component={SignUpScreen} />

      <PrivacyPolicyStack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </PrivacyPolicyStack.Navigator>
  );
}

export default SignUpStackNavigator;
