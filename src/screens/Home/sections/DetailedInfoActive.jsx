import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window'); // Получаем ширину экрана

const styles = StyleSheet.create({
  boxHomeDetaile: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gradientBox: {
    borderRadius: 12,
    paddingTop: 14,
    paddingBottom: 4,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 20,
    marginTop: 'auto',

  },
  boxHomeDetaileItem: {
    display: 'flex',
    maxWidth: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxHomeDetaileItemName: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  boxHomeDetaileItemText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 32,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  boxHomeDetaileItemNameTablet: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 27,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  boxHomeDetaileItemTextTablet: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 60,
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

function DetailedInfoActive({ currentContoller }) {
  const { params } = currentContoller;
  const [layoutWidth, setLayoutWidth] = useState(screenWidth); // Исходная ширина устанавливается равной ширине экрана

  if (!params) {
    return null;
  }

  // Обработчик, который запускается, когда размеры блока становятся известны
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setLayoutWidth(width); // Обновляем состояние с новой шириной блока
  };

  // Вычисляем размер шрифта как процент от ширины блока
  const fontSize = layoutWidth * 0.09; // Например, 5% от ширины блока
  const fontSizeBig = layoutWidth * 0.04; // Например, 5% от ширины блока

  // Создаем динамический стиль для текста
  const dynamicTextStyles = StyleSheet.create({
    textBig: {
      fontSize: fontSizeBig,
      fontFamily: 'SFProDisplay',
      fontStyle: 'normal',
      fontWeight: '600',
      textAlign: 'center',
      color: '#FFFFFF',
    },
    text: {
      fontSize, // Используем вычисленный размер шрифта
      fontFamily: 'SFProDisplay',
      fontStyle: 'normal',
      fontWeight: '600',
      textAlign: 'center',
      color: '#FFFFFF',
    },
  });

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
          {/* <Text style={styles.boxHomeDetaileItemName}>{text}</Text> */}
          <Text style={dynamicTextStyles.textBig}>{text}</Text>

          {/* <Text style={styles.boxHomeDetaileItemText}>{unit}</Text> */}
          <Text style={dynamicTextStyles.text}>{unit}</Text>

        </View>
      );
    });

  return (
    <LinearGradient
      colors={['#FEB84A', '#FF5204']}
      style={styles.gradientBox}
      onLayout={onLayout} // Присваиваем обработчик события onLayout
    >
      <View style={styles.boxHomeDetaile}>{result}</View>
    </LinearGradient>
  );
}

export default DetailedInfoActive;
