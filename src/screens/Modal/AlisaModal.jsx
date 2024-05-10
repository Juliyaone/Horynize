import React, { useRef } from 'react';
import {
  StyleSheet, View, Text, Modal, Button, PanResponder, Dimensions, Platform, Linking, Alert,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import CustomButton from '../../components/CustomButton';

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
    fontSize: responsiveFontSize(2.1),
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
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
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
  const openLink = (androidUrl, iosUrl = '', message = '') => {
    if (Platform.OS === 'ios' && message) {
      // Если мы на iOS и есть сообщение, показываем его вместо открытия ссылки
      Alert.alert('Уведомление', message);
    } else {
      // В противном случае обрабатываем URL как обычно
      const url = Platform.OS === 'ios' ? iosUrl : androidUrl;
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Don't know how to open URI: ${url}`);
        }
      });
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
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Голосовые ассистенты</Text>
          <View style={{ width: '100%' }}>

            <CustomButton
              style={{ width: '100%' }}
              text="Алиса"
              onPress={() => {
                openLink(
                  'https://play.google.com/store/apps/details?id=com.yandex.iot', // Android URL для Алисы
                  'https://apps.apple.com/ru/app/%D0%B4%D0%BE%D0%BC-%D1%81-%D0%B0%D0%BB%D0%B8%D1%81%D0%BE%D0%B9/id1582810683', // iOS URL для Алисы
                )
              }}
            />
            {/* <CustomButton
              style={{ width: '100%' }}
              text="Сбер"
              onPress={() => {
                openLink(
                  'https://play.google.com/store/apps/details?id=com.salute.smarthome.prod', // Android URL для Сбер Салют
                  '', // iOS URL не используется
                  'Приложение "Сбер Салют" недоступно на iOS', // Сообщение для пользователей iOS
                )
              }}
            /> */}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AlisaModal;
