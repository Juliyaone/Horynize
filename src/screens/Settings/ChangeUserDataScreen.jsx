import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import { useChangePasswordMutation } from '../../redux/usersApi';
import { Formik } from 'formik';
import * as yup from 'yup';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ChangeEmailForm from '../../components/ChangeEmailForm'
import GoBackComponent from '../../components/GoBack';

const ChangeUserDataScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <GoBackComponent navigation={navigation} />
      <ChangePasswordForm />
      <ChangeEmailForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: "#212121",
    marginBottom: 30
  }
});

export default ChangeUserDataScreen;
