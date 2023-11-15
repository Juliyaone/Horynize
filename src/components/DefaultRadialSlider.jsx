import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadialSlider } from 'react-native-radial-slider';

const styles = StyleSheet.create({
  containerRadialSlider: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    paddingBottom: 0,
  },
});

function DefaultRadialSlider({
  temperature, sendParamsData, changeParams, id, scrollToIndex,
}) {
  const sendParamsTemperature = async (newTemperature) => {
    try {
      if (id) {
        const data = {
          controllerId: String(id),
          tempTarget: String(newTemperature),
        }

        await sendParamsData(data);
      }
    } catch (error) {
      console.log('errornewTemperature', error);
    }
  }

  // const handleOnChange = () => {
  // };

  const handleOnComplete = (value) => {
    sendParamsTemperature(value);
    changeParams({ tempTarget: value });
    scrollToIndex(3) // прокрутка к темепартуре
  };

  return (
    <View style={styles.containerRadialSlider}>
      <RadialSlider
        value={temperature}
        min={15}
        max={30}
        // onChange={handleOnChange}
        onComplete={(value) => handleOnComplete(value)}
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
  );
}

export default DefaultRadialSlider;
