import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';
import { AuthContext } from './providers/AuthContext';

const window = Dimensions.get('window');

const isTablet = () => {
  const aspectRatio = window.height / window.width;
  return window.width >= 768 && aspectRatio <= 1.6;
};

const styles = StyleSheet.create({
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

function DefaultRadialSlider({
  sendParamsData, changeParams, temperature, scrollToIndex, currentParams,
}) {
  const sliderStyle = getSliderStyle();

  // const { unitId } = useContext(AuthContext);

  const sendParamsTemperature = async (newTemperature) => {
    // console.log('currentParams во время вызова:', currentParams['vent-unit'][0]['id_vent-unit']);
    const unitControllerCurrentId = currentParams['vent-unit'][0]['id_vent-unit'];

    const data = {
      controllerId: String(unitControllerCurrentId),
      tempTarget: String(newTemperature),
    }

    await sendParamsData(data);
    changeParams({ tempTarget: newTemperature });
    scrollToIndex(3) // прокрутка к темепартуре
  }

  return (
    <View style={styles.containerRadialSlider}>
      <RadialSlider
        value={temperature}
        min={15}
        max={30}
        onComplete={(value) => sendParamsTemperature(value)}
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
  );
}

export default DefaultRadialSlider;
