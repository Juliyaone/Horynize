import React, { useContext, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import ArrowLeft from '../../img/icons/ArrowLeft';
import { useBindMutation } from '../../redux/usersApi';
import { AuthContext } from '../../components/providers/AuthContext'
import ApplyIcon from '../../img/icons/apply';
import ModalError from '../../components/ModalError';
import Loader from '../../components/Loader';
import GalleryModal from '../Modal/GalleryModal';

import CustomButton from '../../components/CustomButton';

const ServerSchema = yup.object({
  id: yup.string().required('Регистрационный номер обязателен'),
  key: yup.string().length(4, 'Регистрационный ключ должен состоять из 4 символов').required('Регистрационный ключ обязателен'),
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
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 50,
  },
  textInstruction: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default function DevicesAddScreen({ navigation, route }) {
  const nameRoute = route?.params?.customName;

  console.log('nameRoute', nameRoute);
  const clickedControllerId = route?.params?.clickedIdModel;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);

  const [errorText, setErrorText] = useState('');
  const [authorizationError, setAuthorizationError] = useState(false);


  const { userId, bindController } = useContext(AuthContext);

  const [bind, { isLoading: isLoadingBind }] = useBindMutation();

  // binding: 0 - отвязка, 1 - привязка, 2 - редактирование customName
  if (isLoadingBind) {
    return <Loader />
  }

  const handleSubmit = async (values, actions) => {
    const bindData = {
      userid: values.userid,
      customName: values.customName,
      binding: values.binding,
      id: values.id,
      key: values.key,
      id_model: values.id_model,
    };

    try {
      const bindDataAwait = await bind(bindData);

      if (bindDataAwait.data && bindDataAwait.data.controllerID) {
        await bindController(bindDataAwait.data);
      } else {
        console.error('Controller ID is missing in the response');
      }

      navigation.navigate('DevicesStack', {
        screen: 'DevicesUser',
      });
    } catch (error) {
      console.error('Ошибка добавления установки:', error);
      setErrorText(error?.data?.message);
      setAuthorizationError(true)
    }
  }

  return (
    <ScrollView>
      {authorizationError
        && (
          <ModalError
            errorText={errorText}
            visible={!!authorizationError}
            onDismiss={() => setAuthorizationError(null)}
          />
        )}

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.navigate('DevicesStack', {
            screen: 'DevicesAll',
          })}
        >
          <ArrowLeft />
          <Text>Назад</Text>
        </TouchableOpacity>

        <Formik
          initialValues={{
            userid: userId,
            customName: nameRoute,
            binding: '1', // 1 - привязка
            id: '',
            key: '',
            id_model: Number(clickedControllerId),
          }}
          validationSchema={ServerSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <View style={styles.container}>
              {Object.keys(props.values).map((key) => (
                (key !== 'userid'
                  && key !== 'controllerid'
                  && key !== 'customName'
                  && key !== 'binding'
                  && key !== 'id_model') && (
                  <React.Fragment key={key}>
                    <View style={styles.inputContainer}>
                      <ApplyIcon style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        onChangeText={props.handleChange(key)}
                        value={props.values[key]}
                        onBlur={props.handleBlur(key)}
                        // eslint-disable-next-line no-nested-ternary
                        placeholder={key === 'key'
                          ? 'Регистрационный ключ' : key === 'id'
                            ? 'Регистрационный номер' : key}
                      />
                    </View>
                    <Text style={styles.errorText}>
                      {props.touched[key] && props.errors[key]}
                    </Text>
                  </React.Fragment>
                )
              ))}

              <CustomButton text="Приязать установку" onPress={props.handleSubmit} />
            </View>
          )}
        </Formik>

        <TouchableOpacity onPress={() => setGalleryModalVisible(true)}>
          <Text style={styles.textInstruction}>Инструкция</Text>
        </TouchableOpacity>

        <GalleryModal isGalleryModalVisible={isGalleryModalVisible} setGalleryModalVisible={setGalleryModalVisible} />
      </View>
    </ScrollView>
  );
}
