import React, { useRef, useState } from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder, Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import TimePicker from '../../components/TimePicker';
import TimePickerAndroid from '../../components/TimePickerAndroid';

import ApplyIcon from '../../img/icons/apply';
import { styles } from './styles/StartTimeModalStyle';

function StartTimeModal({
  modalVisibleStartTime, setModalVisibleStartTime, startTime, setStartTime,
}) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisibleStartTime(false);
        }
      },
    }),
  ).current;

  const isAndroid = Platform.OS === 'android';

  if (isAndroid && modalVisibleStartTime) {
    return (
      <View>
        <TimePickerAndroid
          modalVisibleStartTime={modalVisibleStartTime}
          onClose={setModalVisibleStartTime}
          startTime={startTime}
          setTime={setStartTime}
        />
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisibleStartTime}
      onRequestClose={() => {
        setModalVisibleStartTime(!modalVisibleStartTime);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          {!isAndroid && <Text style={styles.modalText}>Начало работы</Text>}

          <TimePicker setTime={setStartTime} startTime={startTime} closeModal={setModalVisibleStartTime} />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => { setModalVisibleStartTime(!modalVisibleStartTime) }}
          >
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}
            >
              <View style={styles.content}>
                <ApplyIcon style={styles.icon} />
                <Text style={styles.text}>Применить</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default StartTimeModal;
