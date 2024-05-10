import React, { useRef } from 'react';
import {
  View, Text, Modal, PanResponder,
} from 'react-native';

import Slider from '@react-native-community/slider';

import { styles } from './styles/ScheduleModalStyle';

function SpeedModalShedule({
  modalVisibleSpeed, seModalVisibleSpeed, speedSchedule, setSpeedSchedule,
}) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          seModalVisibleSpeed(false);
        }
      },
    }),
  ).current;

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisibleSpeed}
      onRequestClose={() => {
        seModalVisibleSpeed(!modalVisibleSpeed);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Скорость</Text>


          <View>
            <View style={styles.boxDays}>
              {numbers.map((item) => <Text key={item} style={styles.dayText}>{item}</Text>)}
            </View>
            <View style={styles.boxDays}>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#ED7635"
                maximumTrackTintColor="#787880"
                thumbTintColor="#ED7635"
                onValueChange={(speed) => setSpeedSchedule(speed)}
                value={speedSchedule === '255' ? 0 : speedSchedule}
                onSlidingComplete={(speed) => setSpeedSchedule(speed)}
              />
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
}

export default SpeedModalShedule;
