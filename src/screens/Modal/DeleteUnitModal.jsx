import React, { useRef, useContext } from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { useBindMutation } from '../../redux/usersApi';
import Loader from '../../components/Loader';
import { AuthContext } from '../../components/providers/AuthContext';

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

    textAlign: 'center',

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
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
    color: '#787880',
    textAlign: 'center',
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
  sliderBoxText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderValueBox: {
    width: 79,
    heigh: 32,
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
  sliderValueText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
  },
  sliderText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
  },
});

function DeleteUnitModal({
  modalVisible, setModalVisible, unitId, navigation,
}) {
  const { userId, unlinkController } = useContext(AuthContext);

  const [bind, { isLoading: isLoadingBind }] = useBindMutation();

  const onDeleteUnit = async () => {
    const bindData = {
      userid: userId,
      controllerid: String(unitId),
      binding: '0',
    };
    try {
      const bindDataAwait = await bind(bindData);

      const deleteUnitId = bindDataAwait?.data?.controllerID;

      await unlinkController(deleteUnitId);

      navigation.navigate('DevicesStack', {
        screen: 'DevicesUser',
      });
    } catch (error) {
      console.error('Ошибка удаления установки:', error);
    }
    setModalVisible(false);
  };

  const onClose = () => {
    setModalVisible(false);
  }

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

  if (isLoadingBind) {
    return <Loader />
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
        <View style={styles.modalView} {...panResponder.panHandlers}>

          <Text style={styles.modalText}>Вы действительно хотите удалить установку?</Text>

          <View style={{
            flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginTop: 40,
          }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onDeleteUnit}
              style={{ width: '50%' }}

            >
              <View style={styles.content}>
                <Text style={styles.text}>Удалить</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onClose}
              style={{ width: '50%' }}
            >
              <View style={styles.content}>
                <Text style={styles.text}>Нет</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default DeleteUnitModal;
