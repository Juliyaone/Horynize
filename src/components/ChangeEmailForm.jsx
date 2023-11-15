import React from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useChangePasswordMutation } from '../redux/usersApi';
import Loader from './Loader';
import ApplyIcon from '../img/icons/apply';

import CustomButton from './CustomButton';

const editSchema = yup.object({
  email: yup.string().required('Email обязателен').email('Некорректный Email'),
  password: yup.string().required('Пароль обязателен').min(8, 'Пароль должен быть не менее 8 символов'),
});

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
  cardBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15,
  },
  cardUserBtnBox: {
    width: '100%',
  },

});

function ChangeEmailForm() {
  const [changePassword, { isLoading: isLoaderChangePassword }] = useChangePasswordMutation();

  const onClickBtnEditUser = (values) => {
    const userData = {
      user_id: '1',
      username: 'victoruni2',
      password: values.password,
      email: values.email,
    };

    changePassword(userData);
  };

  if (isLoaderChangePassword) {
    return <Loader />;
  }

  return (
    <View style={styles.cardBox}>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={editSchema}
        onSubmit={(values, actions) => {
          onClickBtnEditUser(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <>
            <View style={styles.inputContainer}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
              />
            </View>
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <View style={styles.inputContainer}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                secureTextEntry
              />
            </View>
            <Text style={styles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <View style={styles.cardUserBtnBox}>
              <CustomButton text="Изменить Email" onPress={props.handleSubmit} />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

export default ChangeEmailForm;
