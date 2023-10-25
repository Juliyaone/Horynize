import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  boxHomeDetaile: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxHomeDetaileItem: {
    display: 'flex',
    maxWidth: '33%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxHomeDetaileItemName: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  boxHomeDetaileItemText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#FFFFFF',
  },
});
function DetailedInfoActive({ currentContoller }) {
  const { params } = currentContoller;

  if (!params) {
    return null;
  }
  const keyForRender = ['humRoom', 'tempChannel', 'tempRoom'];

  const getTextAndUnit = (key, value) => {
    const texts = {
      humRoom: ['Влажность в помещении', '%'],
      tempChannel: ['Температура на улице', '°C'],
      tempRoom: ['Температура в помещении', '°C'],
    };

    if (!texts[key]) {
      return [`Unknown Key: ${key}`, 'N/A'];
    }

    return [texts[key][0], `${Math.round(value)}${texts[key][1]}`];
  };

  const result = Object.entries(params)
    .filter(([key]) => keyForRender.includes(key))
    .map(([key, value]) => {
      const [text, unit] = getTextAndUnit(key, value);

      return (
        <View style={styles.boxHomeDetaileItem} key={key}>
          <Text style={styles.boxHomeDetaileItemName}>{text}</Text>
          <Text style={styles.boxHomeDetaileItemText}>{unit}</Text>
        </View>
      );
    });

  return (
    <LinearGradient
      colors={['#FEB84A', '#FF5204']}
      style={{
        borderRadius: 12,
        paddingTop: 14,
        paddingBottom: 4,
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 20,
      }}
    >
      <View style={styles.boxHomeDetaile}>{result}</View>
    </LinearGradient>
  );
}

export default DetailedInfoActive;

