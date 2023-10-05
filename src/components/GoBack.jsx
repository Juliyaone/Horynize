import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import ArrowLeft from '../img/icons/ArrowLeft';

const styles = StyleSheet.create({
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 50,
  },
})

function GoBack({ navigation }) {
  return (
    <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
      <ArrowLeft />
      <Text>Назад</Text>
    </TouchableOpacity>
  )
}

export default GoBack;
