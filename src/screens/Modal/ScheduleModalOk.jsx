import React, { useRef } from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import BtnOkIcon from '../../img/icons/btnOk';

import { styles } from './styles/ScheduleModalOkStyle';

function ScheduleModalOk({ modalVisible, setModalVisible }) {
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
        setModalVisible(!modalVisible);
      }}
    >

      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>График работы установлен</Text>

          <View style={styles.boxBtnSchedule} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => { setModalVisible(!modalVisible) }}
          >
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}
            >
              <View style={styles.content}>
                <BtnOkIcon style={styles.icon} />
                <Text style={styles.text}>Хорошо</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

export default ScheduleModalOk;
