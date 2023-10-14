import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput,
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';

import { UserContext } from '../../components/providers/UserContext';
import { AuthContext } from '../../components/providers/AuthContext';
import { saveCredentials } from '../../components/providers/SecureStore';

import ApplyIcon from '../../img/icons/apply';
import GoBackComponent from '../../components/GoBack';

import ModalError from '../../components/ModalError';
import Loader from '../../components/Loader';

import CustomButton from '../../components/CustomButton';
import { useLoginUserMutation } from '../../redux/usersApi';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: '#DDDDDD',
    borderRadius: 16,
    marginBottom: 10,
  },
  lastInputContainer: {
    marginBottom: 30,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: '#DDDDDD',
    borderRadius: 16,
    padding: 15,
    color: '#212121',
    fontSize: 16,
  },
  inputIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  errorText: {
    color: '#FF5204',
    padding: 0,
    marginTop: 0,
    marginBottom: 10,
  },

});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Введите ваше имя'),
  password: yup
    .string()
    .required('Введите ваш пароль'),
});

function SignInScreen({ navigation }) {
  const [errorText, setErrorText] = useState('');
  const [authorizationError, setAuthorizationError] = useState(false);

  const { setUserId, setUserData } = useContext(UserContext);
  const { signIn } = useContext(AuthContext);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const sendAuthorizationData = async (values) => {
    if (values.username !== '' && values.password !== '') {
      try {
        const answer = await loginUser(values).unwrap();
        console.log('answerSignIn', answer);

        if (answer['0']?.jwt) {
          const token = answer['0'].jwt;
          const { controllers } = answer;
          const controllerId = String(answer.controllers[0].id_controller);
          const userId = String(answer['0'].id_user);
          const email = String(answer['0'].email);
          const userName = String(answer['0'].username);

          await saveCredentials(values.username, values.password);
          const data = {
            token, controllerId, userId, controllers, email, userName,
          };

          await signIn(data);
        }

        setUserId(answer['0'].id_user);

        setUserData({
          username: answer['0'].username,
          email: answer['0'].email,
          id: answer['0'].id_user,
          units: answer.controllers,
          jwt: answer['0'].jwt,
          id_model: answer.controllers[0].id_model,
          name_model: answer.controllers[0].name,
        });

        navigation.navigate('MainApp');
      } catch (error) {
        console.log('error', error);
        let errorMessage;

        if (error.data) {
          if (error.data.message) {
            errorMessage = error.data.message;
          } else {
            errorMessage = JSON.stringify(error.data);
          }
        } else if (error.message) {
          errorMessage = error.message;
        } else {
          errorMessage = JSON.stringify(error);
        }

        setErrorText(errorMessage);

        setAuthorizationError(true);
      }
    }
  }

  const handleSubmit = async (values) => {
    sendAuthorizationData(values)
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>

      {authorizationError
        && (
        <ModalError
          errorText={errorText}
          visible={!!authorizationError}
          onDismiss={() => setAuthorizationError(null)}
        />
        )}
      <GoBackComponent navigation={navigation} />

      <Text style={styles.title}>Авторизация</Text>

      <Formik
        initialValues={{ username: 'victoruni1', password: '1234567890' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >

        {({
          // eslint-disable-next-line no-shadow
          handleChange, handleBlur, handleSubmit, values, errors,
        }) => (

          <View>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

            <View style={styles.inputContainer}>
              <ApplyIcon style={styles.inputIcon} />

              <TextInput
                style={styles.input}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
                placeholder="Имя"
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            <View style={[styles.inputContainer, styles.lastInputContainer]}>
              <ApplyIcon style={styles.inputIcon} />

              <TextInput
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder="Пароль"
                secureTextEntry
              />
            </View>
            <CustomButton onPress={handleSubmit} text="Войти" IconComponent={false} style={{ width: '100%' }} />

          </View>
        )}
      </Formik>
    </View>
  );
}

export default SignInScreen;
