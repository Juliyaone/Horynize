import React from 'react';
import {
  View, StyleSheet, ScrollView, Text,
} from 'react-native';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ChangeEmailForm from '../../components/ChangeEmailForm'
import GoBackComponent from '../../components/GoBack';
import DeleteUser from '../../components/DeleteUser';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
    marginBottom: 30,
  },
  headerTextSettings: {
    flexGrow: 1,
    fontFamily: 'SFProDisplayBold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.38,
    color: '#222222',
    marginBottom: 25,
  },
});

function ChangeUserDataScreen({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <GoBackComponent navigation={navigation} />
        <Text style={styles.headerTextSettings}>Личные данные</Text>
        <ChangePasswordForm />
        <ChangeEmailForm />
        <DeleteUser />
      </View>
    </ScrollView>
  );
}

export default ChangeUserDataScreen;
