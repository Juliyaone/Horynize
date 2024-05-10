import React, { useState } from 'react';
import {
  View, StyleSheet, Text, ScrollView,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';


import ChangePasswordForm from '../../components/ChangePasswordForm';
import ChangeEmailForm from '../../components/ChangeEmailForm'
import GoBackComponent from '../../components/GoBack';
import DeleteUser from '../../components/DeleteUser';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSuccess';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.8),
    color: '#212121',
    marginBottom: 30,
  },
  headerTextSettings: {
    flexGrow: 1,
    fontFamily: 'SFProDisplayBold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: responsiveFontSize(2.5),
    alignItems: 'center',
    textAlign: 'center',
    color: '#222222',
    marginBottom: 25,
  },
});

function ChangeUserDataScreen({ navigation }) {
  const [errorText, setErrorText] = useState('');
  const [chagePasswordError, setChagePasswordError] = useState(false);
  const [chagePasswordSuccessfully, setChagePasswordSuccessfully] = useState(false);

  return (
    <ScrollView>
      <GoBackComponent navigation={navigation} />

      <View style={styles.container}>

        <Text style={styles.headerTextSettings}>Личные данные</Text>

        {chagePasswordError
          && (
            <ModalError
              errorText={errorText}
              visible={!!chagePasswordError}
              onDismiss={() => setChagePasswordError(null)}
            />
          )}

        {chagePasswordSuccessfully
          && (
            <ModalError
              errorText="Данные изменены"
              visible={!!chagePasswordSuccessfully}
              onDismiss={() => setChagePasswordSuccessfully(null)}
            />
          )}
        <ChangePasswordForm
          setChagePasswordSuccessfully={setChagePasswordSuccessfully}
          setChagePasswordError={setChagePasswordError}
          setErrorText={setErrorText}
        />
        <ChangeEmailForm
          setChagePasswordSuccessfully={setChagePasswordSuccessfully}
          setChagePasswordError={setChagePasswordError}
          setErrorText={setErrorText}
        />
        <DeleteUser navigation={navigation} />
      </View>
    </ScrollView>
  );
}

export default ChangeUserDataScreen;
