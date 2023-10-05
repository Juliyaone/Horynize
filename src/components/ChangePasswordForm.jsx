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
  lastInputContainer: {
    marginBottom: 10,
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

const passwordSchema = yup.object({
  oldPassword: yup.string().required('Старый пароль обязателен'),
  newPassword: yup.string().required('Новый пароль обязателен').min(8, 'Пароль должен быть не менее 8 символов'),
});

function ChangePasswordForm() {
  const [changePassword, { isLoading: isLoaderChangePassword }] = useChangePasswordMutation();

  const onClickBtnChangePassword = (values) => {
    const userData = {
      user_id: '1',
      username: 'victoruni1',
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
      email: 'admin6@sanruskmv.ru',
    };

    changePassword(userData);
  };

  if (isLoaderChangePassword) {
    return <Loader />;
  }

  return (
    <View style={{ marginBottom: 30, marginTop: 30 }}>

      <Formik
        initialValues={{ oldPassword: '', newPassword: '' }}
        validationSchema={passwordSchema}
        onSubmit={(values, actions) => {
          onClickBtnChangePassword(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <>
            <View style={styles.inputContainer}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Старый пароль"
                onChangeText={props.handleChange('oldPassword')}
                onBlur={props.handleBlur('oldPassword')}
                value={props.values.oldPassword}
              // secureTextEntry
              />
            </View>

            <Text style={styles.errorText}>
              {props.touched.oldPassword && props.errors.oldPassword}
            </Text>

            <View style={[styles.inputContainer, styles.lastInputContainer]}>
              <ApplyIcon style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Новый пароль"
                onChangeText={props.handleChange('newPassword')}
                onBlur={props.handleBlur('newPassword')}
                value={props.values.newPassword}
              // secureTextEntry
              />
            </View>
            <Text style={styles.errorText}>
              {props.touched.newPassword && props.errors.newPassword}
            </Text>
            <CustomButton text="Изменить пароль" onPress={props.handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  )
}

export default ChangePasswordForm;
