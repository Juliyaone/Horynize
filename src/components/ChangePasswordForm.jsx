import React, { useContext } from 'react';
import {
  View, Text, TextInput, StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useChangePasswordMutation } from '../redux/usersApi';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ApplyIcon from '../img/icons/apply';
import { AuthContext } from './providers/AuthContext';

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
  cardBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    marginBottom: 30,
  },
  cardUserBtnBox: {
    width: '100%',
  },

});

const passwordSchema = yup.object({
  newPassword: yup.string().required('Новый пароль обязателен').min(8, 'Пароль должен быть не менее 8 символов'),
});

function ChangePasswordForm({
  setChagePasswordSuccessfully, setChagePasswordError, setErrorText,
}) {
  const [changePassword, { isLoading: isLoaderChangePassword }] = useChangePasswordMutation();

  const { userId, userName, userEmail } = useContext(AuthContext);

  const onClickBtnChangePassword = (values) => {
    const userData = {
      user_id: String(userId),
      username: String(userName),
      password: values.newPassword,
      email: String(userEmail),
    };

    changePassword(userData).unwrap()
      .then((response) => {
        // Обработка успешного изменения пароля
        setChagePasswordSuccessfully(true)
      })
      .catch((error) => {
        // Обработка ошибки изменения пароля
        setErrorText(error);
        setChagePasswordError(true);
        console.error('Error changing password', error);
      });
  };

  // if (isLoaderChangePassword) {
  //   return <Loader />;
  // }

  return (
    <Formik
      initialValues={{ newPassword: '' }}
      validationSchema={passwordSchema}
      onSubmit={(values, actions) => {
        onClickBtnChangePassword(values);
        actions.resetForm();
      }}
    >
      {(props) => (
        <View style={styles.cardBox}>
          <View style={styles.inputContainer}>
            <ApplyIcon style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Новый пароль"
              onChangeText={props.handleChange('newPassword')}
              onBlur={props.handleBlur('newPassword')}
              value={props.values.newPassword}
            />
          </View>
          <Text style={styles.errorText}>
            {props.touched.newPassword && props.errors.newPassword}
          </Text>
          <View style={styles.cardUserBtnBox}>
            <CustomButton text="Изменить пароль" onPress={props.handleSubmit} />
          </View>
        </View>
      )}
    </Formik>
  )
}

export default ChangePasswordForm;
