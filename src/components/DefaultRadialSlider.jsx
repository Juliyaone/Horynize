import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const DefaultRadialSlider = ({ temperature, setTemperature, onComplete }) => {

  const handleOnChange = (value) => {
    setTemperature(value);
    return value;
  };

  return (
    <View style={styles.containerRadialSlider}>
      <RadialSlider
        value={temperature}
        min={15}
        max={30}
        onChange={handleOnChange}
        onComplete={(value) => onComplete(value)}
        thumbColor='#FF5204'
        thumbBorderWidth={3}
        thumbRadius={14}
        valueStyle={{ fontSize: 53, color: '#FF5204' }}
        needleBackgroundColor='#e2e2e2'
        stroke='#FF5204'
        lineColor='#e2e2e2'
        sliderTrackColor='#e2e2e2'
        linearGradient={[{ offset: '0%', color: '#FEB84A' }, { offset: '100%', color: '#FF5204' }]}
        isHideSubtitle={true}
        isHideTailText={true}
        isHideTitle={true}
        unit='°C'
        unitStyle={{ fontSize: 24, color: '#FF5204', fontWeight: 700 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerRadialSlider: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 23,
  },
});

export default DefaultRadialSlider;