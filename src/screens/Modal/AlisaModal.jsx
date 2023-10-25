import React, { useRef, useEffect } from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Dimensions, Image,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as AuthSession from 'expo-auth-session';

import AlisaIconMiddle from '../../img/alisaIconMiddle.png';

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
    marginRight: 8,
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
    height: 76,
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

function AlisaModal({
  modalVisible,
  setModalVisible,
}) {
  const redirectUri = AuthSession.makeRedirectUri({
    native: 'mycoolredirect://redirect',
  });

  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    // Обращение к вашему серверу для инициации процесса OAuth
    authorizationEndpoint: 'http://localhost:3000/auth/yandex',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      // Используйте код для получения токена доступа (через ваш сервер)
      setModalVisible(false);
    }
  }, [response]);

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
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Подключить Алису</Text>

          <TouchableOpacity onPress={async () => {
            if (request) {
              await promptAsync({ useProxy: false });
            }
          }}>
            <Image source={AlisaIconMiddle} style={{ width: 50, height: 50 }} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default AlisaModal;
