import React, { useRef } from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder, Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import TimePicker from '../../components/TimePicker';
import TimePickerAndroid from '../../components/TimePickerAndroid';

import ApplyIcon from '../../img/icons/apply';
import { styles } from './styles/FinishTimeModal';

function FinishTimeModal({
  modalVisibleFinishTime, setModalVisibleFinishTime, finishtTime, setFinishTime,
}) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisibleFinishTime(false);
        }
      },
    }),
  ).current;

  const isAndroid = Platform.OS === 'android';

  if (isAndroid && modalVisibleFinishTime) {
    return (
      <View>
        <TimePickerAndroid setTime={setFinishTime} finishTime={finishtTime} onClose={setModalVisibleFinishTime} />
      </View>
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisibleFinishTime}
      onRequestClose={() => {
        setModalVisibleFinishTime(!modalVisibleFinishTime);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Завершение работы</Text>


          <TimePicker setTime={setFinishTime} finishtTime={finishtTime} closeModal={setModalVisibleFinishTime} />


          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={() => { setModalVisibleFinishTime(!modalVisibleFinishTime) }}
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

export default FinishTimeModal;
