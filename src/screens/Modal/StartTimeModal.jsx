import React, { useRef } from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder, Platform,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import TimePicker from '../../components/TimePicker';
import ApplyIcon from '../../img/icons/apply';

import { styles } from './styles/StartTimeModalStyle';

function StartTimeModal({ modalVisibleStartTime, setModalVisibleStartTime, setStartTime }) {
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
        <View style={[styles.modalView, isAndroid ? styles.modalViewTransparent : null]} {...panResponder.panHandlers}>
          {!isAndroid && <Text style={styles.modalText}>Начало работы</Text>}

          <TimePicker closeModal={setModalVisibleStartTime} setTime={setStartTime} />

          {!isAndroid && (
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
          )}
        </View>
      </View>
    </Modal>
  );
}

export default StartTimeModal;
