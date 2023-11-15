import React, { useState, useContext } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
} from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup';
import { saveCredentials } from '../../components/providers/SecureStore';
import { AuthContext } from '../../components/providers/AuthContext';

import { useRegisterUserMutation } from '../../redux/usersApi';
import ModalError from '../../components/ModalError';
import GoBackComponent from '../../components/GoBack';
import Loader from '../../components/Loader';

import ApplyIcon from '../../img/icons/apply';

import CustomButton from '../../components/CustomButton';

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
  email: yup
    .string()
    .email('Введите действительный email')
    .required('Введите ваш email'),
  id: yup
    .string()
    .required('Введите id вентиляционной установки'),
  key: yup
    .string()
    .min(4, 'Ключ должен содержать ровно 4 символа')
    .max(4, 'Ключ должен содержать ровно 4 символа')
    .required('Введите ключ вентиляционной установки'),
});

function SignUp({ navigation }) {
  const [registrationError, setRegistrationError] = useState(false);
  console.log('registrationError', registrationError);

  const [errorText, setErrorText] = useState('');
  // const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);

  // console.log('isPrivacyPolicyAccepted', isPrivacyPolicyAccepted);

  const [registerUser, { isLoader }] = useRegisterUserMutation();
  const { signIn } = useContext(AuthContext);

  const sendRegisterData = async (values) => {
    if (values.username !== '' && values.password !== '' && values.email !== ''
      && values.id !== '' && values.key !== '') {
      try {
        const answer = await registerUser(values).unwrap();
        console.log(answer['0']?.jwt);

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
        navigation.navigate('MainApp');
      } catch (error) {
        let errorMessage;

        console.log('errorMessage', error);

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
        setRegistrationError(true);
      }
    }
  }

  const handleSubmit = async (values) => {
    console.log('handleSubmit', values);
    sendRegisterData(values)
  };

  if (isLoader) {
    return <Loader />
  }

  return (
    <View style={styles.container}>

      {registrationError
        && (
        <ModalError
          errorText={errorText}
          visible={!!registrationError}
          onDismiss={() => setRegistrationError(null)}
        />
        )}
      <GoBackComponent navigation={navigation} />

      <Text style={styles.title}>Регистрация</Text>

      <Formik
        initialValues={{
          username: '', password: '', email: '', id: '', key: '',
        }}
        onSubmit={(values) => {
          console.log('Formik onSubmit', values); // Добавьте это

          // if (isPrivacyPolicyAccepted) {
          // values.privacyPolicy = true;

          handleSubmit(values);
          navigation.navigate('MainApp');

          // } else {
          //   setRegistrationError(true);
          //   setErrorText('Вы должны принять политику конфиденциальности');
          // }
        }}
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
            <View style={styles.inputContainer}>
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
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            <View style={styles.inputContainer}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
              />
            </View>

            {errors.id && <Text style={styles.errorText}>{errors.id}</Text>}
            <View style={styles.inputContainer}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                onChangeText={handleChange('id')}
                onBlur={handleBlur('id')}
                value={values.id}
                placeholder="Регистрационный номер"
              />
            </View>

            {errors.key && <Text style={styles.errorText}>{errors.key}</Text>}
            <View style={[styles.inputContainer, styles.lastInputContainer]}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                onChangeText={handleChange('key')}
                onBlur={handleBlur('key')}
                value={values.key}
                placeholder="Регистрационный ключ"
              />
            </View>
            <Text style={{
              fontFamily: 'SFProDisplay',
              fontSize: 14,
              lineHeight: 18,
              textAlign: 'center',
              letterSpacing: 0.38,
              color: '#787880',
            }}
            >
              Регистрируясь Вы принимаете</Text>

              <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                <Text style={{
                  fontFamily: 'SFProDisplay',
                  fontSize: 14,
                  lineHeight: 18,
                  textAlign: 'center',
                  letterSpacing: 0.38,
                  color: '#787880',
                  marginBottom: 25 }}>Политику конфиденциальности</Text>
              </TouchableOpacity>
            <CustomButton
              onPress={handleSubmit}
              text="Зарегистрироваться"
              IconComponent={false}
              style={{ width: '100%' }}
            />
          </View>

        )}

      </Formik>
    </View>
  );
}

export default SignUp;
