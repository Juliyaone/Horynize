import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  textNotReg: {

    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: 0.35,
    textAlign: 'center',
    color: '#212121',
    marginTop: 30,
  },
})

export default function StartScreen({ navigation }) {
  const handleClick1 = () => {
    navigation.navigate('SignIn');
  };

  const handleClick2 = () => {
    navigation.navigate('SignUp');
  };

  const handleClick3 = () => {
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>

      <CustomButton onPress={handleClick1} text="Войти" />
      <CustomButton onPress={handleClick2} text="Зарегистрироваться" />

      <TouchableOpacity onPress={handleClick3}>
        <Text style={styles.textNotReg}>Войти без регистрации</Text>
      </TouchableOpacity>

    </View>
  )
}
