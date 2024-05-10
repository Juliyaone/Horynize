import React, { useRef, useContext, useState } from 'react';
import {
  StyleSheet, View, Text, Modal, PanResponder, Dimensions, TextInput,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Formik } from 'formik';
import * as yup from 'yup';

import { AuthContext } from '../../components/providers/AuthContext'

import CustomButton from '../../components/CustomButton';
import ModalError from '../../components/ModalError';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: screenHeight * 0.5,
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    marginBottom: 40,
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
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    // backgroundColor: '#DDDDDD',
    borderRadius: 16,
    padding: 15,
    // color: '#212121',
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
});

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z0-9\s]+$/, 'Имя установки может содержать только буквы, цифры и пробелы')
    .min(3, 'Имя установки должно содержать минимум 3 символа')
    .max(50, 'Имя установки не должно превышать 50 символов')
    .required('Введите новое имя установки'),
});

function EditModal({
  modalVisible, setModalVisible, selectedDevice, bind, userId,
}) {
  const [editNameError, setEditNameError] = useState(false);

  const { bindControllerEditName } = useContext(AuthContext);

  const editName = async (values) => {
    try {
      const dataForAsyncStorage = {
        userid: userId,
        controllerid: selectedDevice.id_controller,
        customName: values.name,
      };

      await bindControllerEditName(dataForAsyncStorage);

      const dataForApi = {
        userid: userId,
        controllerid: selectedDevice.id_controller,
        customName: values.name,
        binding: '2',
      };

      await bind(dataForApi).unwrap();
      setModalVisible(false);
    } catch (error) {
      console.error('Error binding:', error);
      setEditNameError(true)
    }
  };
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
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >

      <ModalError
        errorText={'Не удалось изменить имя, попробуйте еще раз'}
        visible={!!editNameError}
        onDismiss={() => setEditNameError(null)}
      />

      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Введите новое имя установки</Text>
          <View style={{ width: '100%' }}>

            <Formik
              initialValues={{ name: selectedDevice ? selectedDevice.name_model : '' }}
              onSubmit={(values, actions) => {
                editName(values);
                actions.setSubmitting(false);
              }}
              validationSchema={validationSchema}
            >
              {({
                // eslint-disable-next-line no-shadow
                handleChange, handleBlur, handleSubmit, values, errors,
              }) => (

                <View>
                  {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                  <View style={styles.inputContainer}>

                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                      placeholder="Имя"
                    />
                  </View>
                  <CustomButton
                    style={{ width: '100%' }}
                    text="Переименовать"
                    onPress={handleSubmit}
                  />

                </View>
              )}
            </Formik>

          </View>
        </View>
      </View>
    </Modal>
  );
}

export default EditModal;
