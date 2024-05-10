import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, ScrollView,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useRegisterUserMutation, useGetUnitsAllQuery } from '../../redux/usersApi';

import { AuthContext } from '../../components/providers/AuthContext';

import GalleryModal from '../Modal/GalleryModal';
import Loader from '../../components/Loader';
import ModalError from '../../components/ModalError';
import CustomButton from '../../components/CustomButton';

import ArrowLeft from '../../img/icons/ArrowLeft';
import ApplyIcon from '../../img/icons/apply';

const styles = StyleSheet.create({
  containerSignUp: {
    position: 'relative',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 80,
  },
  floatingGoBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#ffffff',
  },
  btnBack: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
  },
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
  textRegistr: {
    fontFamily: 'SFProDisplay',
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    color: '#787880',
  },
  textRegistrBtn: {
    fontFamily: 'SFProDisplay',
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
  },
  btnRegisterBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    marginRight: 20,
    borderRadius: 50,
    overflow: 'hidden',
  },
  boxTextTextRegistr: {
    marginBottom: 20,
    marginTop: 10,
  },
  gradientBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9\-_\.]+$/, 'Введите имя на английском языке')
    .min(4, 'Не менее 4 символов')
    .required('Введите ваше имя'),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать не менее 8 символов')
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
  modelId: yup.string().required('Выберите модель'),
});

function SignUp({ navigation }) {
  const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedModelName, setSelectedModelName] = useState('');

  const [registrationError, setRegistrationError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { signIn } = useContext(AuthContext);

  const { data: modelsAll, isLoading: modelsAllIsLoading, error: errorModelsAll } = useGetUnitsAllQuery();

  const [registerUser, { isLoader }] = useRegisterUserMutation();

  const errObj = {
    incomplete_request_fields: 'Вы не заполнили все поля',
    incorrect_username: 'Неверный логин',
    short_password: 'Короткий пароль',
    invalid_email: 'Не верный email',
    user_exists: 'Пользователь с таким email уже зарегистрирован',
    controller_hash_is_wrong: 'Проверьте поля "Регистрационный номер" и "Регистрационный ключ". Если усановка ранее уже была привязана к другому пользователю, то ее необходимо отвязать.',
  }

  const submitToServer = async (values) => {
    if (values.username !== '' && values.password !== '' && values.email !== ''
      && values.id !== '' && values.key !== '' && values.modelId !== '') {
      try {
        const answer = await registerUser(values).unwrap();

        if (answer?.jwt) {
          const token = String(answer?.jwt);
          const refreshToken = String(answer?.refreshToken);
          const controllerId = String(answer.controllerId);

          const { controllers } = answer;

          const userIdData = String(answer.id_user);
          const email = String(answer.email);
          const userNameData = String(answer.username);

          const data = {
            token, controllerId, userIdData, controllers, email, userNameData, refreshToken,
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
        setErrorText(errObj[errorMessage]);

        setRegistrationError(true);
      }
    }
  }

  const openPickerModal = () => {
    setPickerVisible(true);
  };

  const handleModelChange = (itemValue, setFieldValue) => {
    setSelectedModelId(itemValue);
    const selectedName = modelsAll.models.find((model) => model.id_model.toString() === itemValue)?.name || '';
    setSelectedModelName(selectedName);
    setPickerVisible(false);
    setFieldValue('modelId', itemValue); // Обновляем modelId в Formik
  };

  if (modelsAllIsLoading || isLoader) {
    return <Loader />
  }
  if (errorModelsAll) {
    return <Text style={{ marginTop: 100 }}>Сервер не отвечает, попробуйте войти позже</Text>
  }

  return (
    <View style={{ backgroundColor: 'ffffff', flex: 1 }}>

      <View style={styles.floatingGoBack}>
        <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
          <ArrowLeft />
          <Text>Назад</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ backgroundColor: '#ffffff', flex: 1 }}>

        <View style={styles.containerSignUp}>
          {registrationError
            && (
              <ModalError
                errorText={errorText}
                visible={!!registrationError}
                onDismiss={() => setRegistrationError(null)}
              />
            )}

          <Text style={styles.title}>Регистрация</Text>

          <Formik
            initialValues={{
              username: '', password: '', email: '', id: '', key: '', modelId: '',
            }}
            onSubmit={(values, actions) => {
              submitToServer(values, actions, navigation);
            }}
            validationSchema={validationSchema}
          >
            {({
              handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors, values,
            }) => (

              <View>
                {touched.username && errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
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

                {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
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

                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
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

                {touched.modelId && errors.modelId && <Text style={styles.errorText}>{errors.modelId}</Text>}
                <TouchableOpacity style={styles.inputContainer} onPress={openPickerModal}>
                  <ApplyIcon style={styles.inputIcon} />
                  <TextInput
                    onPressIn={openPickerModal}
                    style={styles.input}
                    editable={false}
                    placeholder="Выберите модель"
                    value={selectedModelName}
                    pointerEvents="none"
                  />
                </TouchableOpacity>

                <Modal
                  transparent
                  visible={isPickerVisible}
                  onRequestClose={() => setPickerVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={selectedModelId}
                        onValueChange={(itemValue) => handleModelChange(itemValue, setFieldValue)}
                      >
                        {modelsAll?.models.map((model, index) => (
                          <Picker.Item label={model.name} value={model.id_model.toString()} key={index} />
                        ))}
                      </Picker>
                    </View>
                  </View>
                </Modal>

                {touched.id && errors.id && <Text style={styles.errorText}>{errors.id}</Text>}
                <View style={styles.inputContainer}>
                  <ApplyIcon style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('id')}
                    onBlur={handleBlur('id')}
                    autoCapitalize="characters"
                    value={values.id}
                    placeholder="Регистрационный номер"
                  />
                  <TouchableOpacity style={styles.btnRegisterBox} onPress={() => setGalleryModalVisible(true)}>
                    <LinearGradient
                      colors={['#FEB84A', '#FF5204']}
                      style={styles.gradientBackground}
                    >
                      <Text style={styles.textRegistrBtn}>?</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                {touched.key && errors.key && <Text style={styles.errorText}>{errors.key}</Text>}
                <View style={styles.inputContainer}>
                  <ApplyIcon style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('key')}
                    onBlur={handleBlur('key')}
                    autoCapitalize="characters"
                    value={values.key}
                    placeholder="Регистрационный ключ"
                  />
                  <TouchableOpacity style={styles.btnRegisterBox} onPress={() => setGalleryModalVisible(true)}>
                    <LinearGradient
                      colors={['#FEB84A', '#FF5204']}
                      style={styles.gradientBackground}
                    >
                      <Text style={styles.textRegistrBtn}>?</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <GalleryModal isGalleryModalVisible={isGalleryModalVisible} setGalleryModalVisible={setGalleryModalVisible} />

                <View style={styles.boxTextTextRegistr}>
                  <Text style={styles.textRegistr}>Регистрируясь Вы принимаете</Text>

                  <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                    <Text style={styles.textRegistr}>Политику конфиденциальности</Text>
                  </TouchableOpacity>
                </View>

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
      </ScrollView>
    </View>

  );
}

export default SignUp;
