import React, { useRef } from 'react';
import {
  StyleSheet, View, Text, Modal, Button, PanResponder, Dimensions,
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { useFetchAuthConfigQuery } from '../../redux/usersApi';
import Loader from '../../components/Loader';

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
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 10,
  },
  gradientBackground: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  sliderBox: {
    marginBottom: 25,
  },
  boxAutoMode: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  boxAutoModeItem: {
    width: 79,
    heigh: 76,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15,
    padding: 10,
  },
  boxAutoModeText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#787880',
  },
  boxAutoModeItemActive: {
    borderColor: '#ED7635',
    borderWidth: 1,
  },
  boxAutoModeTextActive: {
    color: '#ED7635',
  },
});

function AlisaModal({ modalVisible, setModalVisible, scrollToIndex }) {
  const { data: authConfig, error, isLoading } = useFetchAuthConfigQuery();

  const onPress = () => {
    scrollToIndex(1);
    setModalVisible(false);
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

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri: 'https://horynize.cygenic.tech/oauth/login.php',
      clientId: 'b48b79fdf64f4cb5810825887b89a457',
      responseType: AuthSession.ResponseType.Code,
      scopes: ['login:email', 'login:info'], // указываем здесь необходимые scopes
      extraParams: {
        // Параметры, необходимые для вашего сервера авторизации
      },
    },
    {
      authorizationEndpoint: 'https://oauth.yandex.ru/authorize',
    },
  );

  // Убрать useEffect для обработки ответа Яндекса, так как теперь это делает сервер

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error('Ошибка при запросе конфигурации авторизации:', error);
    // Здесь можно добавить обработку ошибок, связанных с запросом конфигурации
  }

  console.log('authConfig', authConfig);

  // Используйте ответ от сервера для обновления интерфейса или состояния компонента
  // Например, отображение данных пользователя или сообщения об ошибке

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
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Подключить Алису</Text>
          <View>
            <Button
              disabled={!request}
              title="Привязать к Алисе"
              onPress={() => {
                promptAsync();
              }}
            />
          </View>
          {/* Здесь может быть отображение данных пользователя или сообщения об ошибке */}
        </View>
      </View>
    </Modal>
  );
}

export default AlisaModal;
