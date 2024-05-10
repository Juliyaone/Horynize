import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { Formik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../../components/providers/AuthContext';

import ApplyIcon from '../../img/icons/apply';
import GoBackComponent from '../../components/GoBack';

import ModalError from '../../components/ModalError';
import Loader from '../../components/Loader';
import ModalResetPassword from '../Modal/ModalResetPassword';

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
    fontSize: responsiveFontSize(2.8),
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
    fontSize: responsiveFontSize(2.1),
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
  textPasswordBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textPassword: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
    marginBottom: 20,
    textAlign: 'center',
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
  const [openModalResetPassword, setOpenModalResetPassword] = useState(false);
  const [authorizationError, setAuthorizationError] = useState(false);

  const { signIn } = useContext(AuthContext);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const errorMessages = {
    'error - incorrect password': 'Неверный пароль',
    'error - username is not active': 'Пользователь не найден',
    'error - incorect username': 'Пользователь не найден',
  };

  function getTranslatedErrorMessage(errorMessage) {
    return errorMessages[errorMessage] || 'Произошла неизвестная ошибка';
  }

  const sendAuthorizationData = async (values) => {
    if (values.username !== '' && values.password !== '') {
      try {
        const answer = await loginUser(values).unwrap();
        if (answer['0']?.jwt) {
          const token = answer['0'].jwt;

          console.log('token', token);
          const refreshToken = String(answer['0'].jwt_refresh);

          const { controllers } = answer;

          let controllerId = '0';

          if (controllers && controllers.length > 0) {
            controllerId = String(controllers[0].id_controller);
          }

          const userIdData = String(answer['0'].id_user);
          const email = String(answer['0'].email);
          const userNameData = String(answer['0'].username);

          const data = {
            token, controllerId, userIdData, controllers, email, userNameData, refreshToken,
          };

          await signIn(data);
        }
        navigation.navigate('MainApp');
      } catch (error) {
        let errorMessage;

        if (error.data) {
          if (error.data.message) {
            errorMessage = getTranslatedErrorMessage(error.data.message);
          } else {
            errorMessage = JSON.stringify(error.data);
          }
        } else if (error.message) {
          errorMessage = getTranslatedErrorMessage(error.message);
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

  const openModalResetPasswordFunc = () => {
    setOpenModalResetPassword(true)
  }

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

      {openModalResetPassword && (
        <ModalResetPassword
          modalVisible={openModalResetPassword}
          setModalVisible={setOpenModalResetPassword}
        />
      )}
      <GoBackComponent navigation={navigation} />

      <Text style={styles.title}>Авторизация</Text>

      <Formik
        initialValues={{ username: '', password: '' }}
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

            <TouchableOpacity style={styles.textPasswordBox} onPress={openModalResetPasswordFunc}>
              <Text style={styles.textPassword}>
                Забыли пароль?
              </Text>
            </TouchableOpacity>

          </View>
        )}
      </Formik>
    </View>
  );
}

export default SignInScreen;
