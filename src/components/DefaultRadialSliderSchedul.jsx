import React, { useRef } from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Platform,
} from 'react-native';

import { RadialSlider } from 'react-native-radial-slider';
// TODO
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    height: '50%',
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
  modalViewTransparent: {
    backgroundColor: 'transparent',
    padding: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
  modalText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
    marginBottom: 10,
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
});

function DefaultRadialSliderSchedul({
  modalVisible, setModalVisible, setTemperatureSchedule, temperatureSchedule, setIsEnabledTemp,
}) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisible(false);
          setIsEnabledTemp(false)
        }
      },
    }),
  ).current;

  // TODO
  const isAndroid = Platform.OS === 'android';

  const handleOnChange = (value) => {
    setTemperatureSchedule(value);
    console.log('temperatureSchedule', temperatureSchedule);
    return value;
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        setIsEnabledTemp(false)
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>

          <RadialSlider
            value={temperatureSchedule}
            min={15}
            max={30}
            onChange={handleOnChange}
            thumbColor="#FF5204"
            thumbBorderWidth={3}
            thumbRadius={14}
            valueStyle={{ fontSize: 53, color: '#FF5204' }}
            needleBackgroundColor="#e2e2e2"
            stroke="#FF5204"
            lineColor="#e2e2e2"
            sliderTrackColor="#e2e2e2"
            linearGradient={[{ offset: '0%', color: '#FEB84A' }, { offset: '100%', color: '#FF5204' }]}
            isHideSubtitle
            isHideTailText
            isHideTitle
            unit="°C"
            unitStyle={{ fontSize: 24, color: '#FF5204', fontWeight: 700 }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default DefaultRadialSliderSchedul;
