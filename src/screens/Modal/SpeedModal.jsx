import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';

import { LinearGradient } from 'expo-linear-gradient';

import SpeedBtnIcon from '../../img/icons/btnSpeed';

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

function SpeedModal({
  modalVisibleSpeed,
  setModalVisibleSpeed,
  fanTarget,
  unitId,
  sendParamsData,
  changeParams,
}) {
  const [valueSliderSpeed, setValueSliderSpeed] = useState(fanTarget);

  const onPress = useCallback(() => {
    if (valueSliderSpeed !== undefined && valueSliderSpeed !== null) {
      sendParamsData({
        controllerId: String(unitId),
        fanTarget: valueSliderSpeed.toString(),
      });
    }
    changeParams({ fanSpeedP: valueSliderSpeed });
    setModalVisibleSpeed(false);
  }, [changeParams, sendParamsData, setModalVisibleSpeed, unitId, valueSliderSpeed]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisibleSpeed(false);
        }
      },
    }),
  ).current;

  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisibleSpeed}
      onRequestClose={() => {
        setModalVisibleSpeed(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Скорость притока</Text>

          <View style={styles.sliderBox}>
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
                onValueChange={setValueSliderSpeed}
                value={valueSliderSpeed}
                onSlidingComplete={(value) => setValueSliderSpeed(value.toString())}
              />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onPress}
          >
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}
            >
              <View style={styles.content}>
                <SpeedBtnIcon style={styles.icon} />
                <Text style={styles.text}>Применить</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default SpeedModal;
