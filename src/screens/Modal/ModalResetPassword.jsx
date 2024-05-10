import React, { useRef, useState } from 'react';
import {
  StyleSheet, View, Text, Modal, PanResponder, TextInput,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { Formik } from 'formik';
import * as yup from 'yup';
import ApplyIcon from '../../img/icons/apply';
import CustomButton from '../../components/CustomButton';
import ModalError from '../../components/ModalError';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    minHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.8),
    color: '#212121',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: '#DDDDDD',
    borderRadius: 16,
    marginBottom: 10,
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
  email: yup
    .string()
    .email('Введите действительный email')
    .required('Введите ваш email'),
});

function ModalResetPassword({
  modalVisible, setModalVisible,
}) {
  const [errorText, setErrorText] = useState('');
  const [authorizationError, setAuthorizationError] = useState(false);
  const [resetPassword, setResetPassword] = useState('');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisible(false);
        }
      },
    }),
  ).current;

  const sendResetPassword = async (value) => {
    try {
      const response = await fetch('https://smart.horynize.ru/Auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `funcname=restorePasswordRequest&email=${value.email}`,
      });
      const data = await response.text();
      setResetPassword(data);
    } catch (error) {
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

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        {authorizationError
          && (
            <ModalError
              errorText={errorText}
              visible={!!authorizationError}
              onDismiss={() => setAuthorizationError(null)}
            />
          )}

        <View style={styles.modalView} {...panResponder.panHandlers}>
          {resetPassword === '' && (
            <>
              <Text style={styles.modalText}>Введите Email</Text>

              <Formik
                initialValues={{ email: '' }}
                onSubmit={(values) => {
                  sendResetPassword(values);
                }}
                validationSchema={validationSchema}
              >

                {({
                  handleChange, handleBlur, handleSubmit, values, errors,
                }) => (

                  <View style={{ width: '100%' }}>
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

                    <CustomButton onPress={handleSubmit} text="Отправить" IconComponent={false} style={{ width: '100%' }} />

                  </View>
                )}
              </Formik>
            </>
          )}
          {resetPassword === '0' && (
            <View style={{ width: '100%' }}>
              <Text style={styles.modalText}>На Ваш Email отправлена ссылка для восстановления пароля</Text>

              <CustomButton onPress={() => { setModalVisible(false) }} text="Закрыть" IconComponent={false} style={{ width: '100%' }} />
            </View>
          )}
          {resetPassword === '-1' && (
            <View style={{ width: '100%' }}>
              <Text style={styles.modalText}>Такой email не зарегистрирован</Text>

              <CustomButton onPress={() => { setModalVisible(false) }} text="Закрыть" IconComponent={false} style={{ width: '100%' }} />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

export default ModalResetPassword;
