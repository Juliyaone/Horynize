import React, { useRef } from 'react';
import {
  StyleSheet, View, Modal, PanResponder, Text, Dimensions,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { RadialSlider } from 'react-native-radial-slider';

const window = Dimensions.get('window');

const isTablet = () => {
  const aspectRatio = window.height / window.width;
  return window.width >= 768 && aspectRatio <= 1.6;
};

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
    fontSize: responsiveFontSize(2.8),
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
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
  },
  containerRadialSlider: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingBottom: 0,
    paddingTop: 50,
  },
});

const getSliderStyle = () => {
  if (isTablet()) {
    // Стили для планшетов/iPad
    return {
      radius: 200,
      thumbRadius: 25,
      thumbBorderWidth: 10,
      sliderWidth: 40,
      sliderStyle: 20,
      isHideButtons: true,
      valueStyle: { fontSize: 100, color: '#FF5204' },
      unitStyle: { fontSize: 40, color: '#FF5204', fontWeight: '700' },
    };
  }
  // Стили для телефонов
  return {
    radius: 85,
    thumbRadius: 10,
    thumbBorderWidth: 5,
    sliderWidth: 20,
    sliderStyle: 10,
    isHideButtons: true,
    valueStyle: { fontSize: 53, color: '#FF5204' },
    unitStyle: { fontSize: 24, color: '#FF5204', fontWeight: '700' },
  };
};

function DefaultRadialSliderSchedul({
  setModalVisibleTemperature, modalVisibleTemperature, setTemperatureSchedule, temperatureSchedule,
}) {
  const sliderStyle = getSliderStyle();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisibleTemperature(false);
        }
      },
    }),
  ).current;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisibleTemperature}
      onRequestClose={() => {
        setModalVisibleTemperature(!modalVisibleTemperature);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Температура</Text>

          <View style={styles.containerRadialSlider}>
            <RadialSlider
              value={Number(temperatureSchedule)}
              min={15}
              max={30}
              onComplete={(value) => setTemperatureSchedule(value)}
              thumbColor="#FF5204"
              thumbRadius={sliderStyle.thumbRadius}
              valueStyle={sliderStyle.valueStyle}
              needleBackgroundColor="#e2e2e2"
              stroke="#FF5204"
              lineColor="#e2e2e2"
              sliderTrackColor="#e2e2e2"
              linearGradient={[{ offset: '0%', color: '#FEB84A' }, { offset: '100%', color: '#FF5204' }]}
              isHideSubtitle
              isHideTailText
              isHideTitle
              unit="°C"
              isHideButtons={sliderStyle.isHideButtons}
              markerLineSize={sliderStyle.markerLineSize}
              sliderWidth={sliderStyle.sliderWidth}
              thumbBorderWidth={sliderStyle.thumbBorderWidth}
              radius={sliderStyle.radius}
              unitStyle={sliderStyle.unitStyle}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}

export default DefaultRadialSliderSchedul;
