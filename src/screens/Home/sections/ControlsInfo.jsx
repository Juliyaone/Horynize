import React, { useContext } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { UserContext } from '../../../components/providers/UserContext';

import TemperatureIcon from '../../../img/temp-white.png';
import HumidityIcon from '../../../img/hum-white.png';
import SpeedIcon from '../../../img/fan-white.png';
import TimerActiveIcon from '../../../img/time-white.png';
import MicrophoneActiveIcon from '../../../img/microfon-white.png';
import ModeActiveIcon from '../../../img/mode-white.png';
import SettingsIcon from '../../../img/settings-light-grey.png';

const screenWidth = Dimensions.get('window').width;
const gap = 10;
const totalGaps = gap * 4;
const controlsInfoWidth = (screenWidth + totalGaps * 7) / 5;
const fontSizeHeader = controlsInfoWidth * 0.10;
const fontSizeText = fontSizeHeader - 2;
const calculatedLineHeight = controlsInfoWidth * 0.12 + 0.1;

const controlsInfoBgWidth = controlsInfoWidth / 3;
const controlsInfoBgIconWidth = controlsInfoWidth / 5;

const styles = StyleSheet.create({
  controlsInfoBox: {
    width: controlsInfoWidth,
    height: controlsInfoWidth,
    marginRight: gap,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 5,
  },

  controlsInfoBoxActive: {
    width: controlsInfoWidth,
    height: controlsInfoWidth,
    marginRight: gap,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 5,
  },
  controlsInfoBoxIconSettings: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlsInfoBg: {
    borderRadius: 8,
    width: controlsInfoBgWidth,
    height: controlsInfoBgWidth,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,

  },
  controlsInfoBgIcon: {
    width: controlsInfoBgIconWidth,
    height: controlsInfoBgIconWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsInfoBtnTextName: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: fontSizeHeader,
    lineHeight: calculatedLineHeight,
    color: '#787880',
    marginBottom: 5,
  },
  controlsInfoBtnText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: fontSizeText,
    lineHeight: calculatedLineHeight,

    color: '#787880',
    marginBottom: 1,
  },
  controlsInfoBtnTextBox: {
    display: 'flex',
    flexDirection: 'row',
  },
})

const FunctionsIcon = {
  tempTarget: TemperatureIcon,
  humRoomTarget: HumidityIcon,
  fanSpeedPTarget: SpeedIcon,
  res: ModeActiveIcon,
  ZagrFiltr: TimerActiveIcon,
  ZagrFiltr1: SettingsIcon,
  tempChannel: MicrophoneActiveIcon,
};

const resNames = {
  0: 'Не установлен',
  1: 'Вентиляция',
  2: 'Нагрев',
  3: 'Охлаждение',
  4: 'Климат-контроль',
  2057: 'Hе выбрано',
};

const dynamicBtnTextStyle = (buttonSize) => ({
  fontFamily: 'SFProDisplay',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: buttonSize * 0.10,
  lineHeight: buttonSize * 0.10 + 0.2,
  color: '#787880',
  marginBottom: 5,
});

const dynamicBtnText2Style = (buttonSize) => ({
  fontFamily: 'SFProDisplay',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: buttonSize * 0.09,
  lineHeight: buttonSize * 0.09 + 0.2,
  color: '#787880',
  marginBottom: 2,
});

function ControlsInfo(props) {
  const {
    params, filteredEntries, temperature, flatListRef, indexActive, tokensForAssistants,
  } = props;

  const {
    res: resMode, humRoomTarget: humTarget, fanSpeedPTarget: fanTarget,
  } = params;

  const { currentDayOfWeek } = useContext(UserContext);

  const timersAllDaysState = useSelector((state) => state.timersAllDays.timersAllDays);

  const timersForCurrentDay = timersAllDaysState[currentDayOfWeek];

  // Находим таймеры с реальными значениями (не "00:00")
  const activeTimers = timersForCurrentDay.filter((timer) => timer.time !== '00:00');

  // Определяем время для первого и второго таймеров
  const firstTimer = activeTimers.find((timer) => timer.num === 1) || null;
  const secondTimer = activeTimers.find((timer) => timer.num === 2) || null;
  const thirdTimer = activeTimers.find((timer) => timer.num === 3) || null;
  const fourthTimer = activeTimers.find((timer) => timer.num === 4) || null;

  // Строим строку времени для первого таймера, если он активен
  let firstTimerTimeRange = '';
  if (firstTimer && secondTimer) {
    firstTimerTimeRange = `с: ${firstTimer.time} до: ${secondTimer.time}`;
  }

  // Строим строку времени для второго таймера, если он активен
  let secondTimerTimeRange = '';
  if (thirdTimer && fourthTimer) {
    secondTimerTimeRange = `с: ${thirdTimer.time} до: ${fourthTimer.time}`;
  }

  const { tokens } = tokensForAssistants;
  const { tokenYandex, tokenSber } = tokens[0];

  const renderItem = ({ item }) => {
    if (item[0] === 'co2RoomTarget') {
      return null;
    }

    const imageSrc = FunctionsIcon[item[0]];

    return (
      <View
        style={[
          styles.controlsInfoBox,
        ]}
      >
        <View style={styles.controlsInfoBoxIconSettings}>
          <LinearGradient
            colors={['#FEB84A', '#FF5204']}
            style={styles.controlsInfoBg}
          >
            <Image source={imageSrc} style={styles.controlsInfoBgIcon} />
          </LinearGradient>

        </View>

        {(item[0] === 'tempTarget') && (
          <>
            <Text
              style={dynamicBtnTextStyle(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Температура
            </Text>
            <Text style={dynamicBtnText2Style(controlsInfoWidth)}>

              {resMode === '1'
                ? '0' : `${temperature} °`}

            </Text>
          </>
        )}

        {(item[0] === 'humRoomTarget') && (
          <>
            <Text
              style={dynamicBtnTextStyle(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Влажность
            </Text>
            <Text
              style={dynamicBtnText2Style(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {humTarget}
              %
            </Text>
          </>
        )}

        {(item[0] === 'fanSpeedPTarget') && (
          <>
            <Text
              style={dynamicBtnTextStyle(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Скорость
            </Text>
            <Text
              style={dynamicBtnText2Style(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {fanTarget}
            </Text>
          </>
        )}

        {(item[0] === 'tempChannel') && (
          <>
            <Text
              style={dynamicBtnTextStyle(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Голосовые ассистенты
            </Text>

            <Text
              style={dynamicBtnText2Style(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {tokenYandex === true && 'Алиса '}
              {tokenSber === true && 'Сбер'}
              {(tokenSber === false && tokenYandex === false) && 'Не подключены'}
            </Text>
          </>
        )}

        {(item[0] === 'res') && (
          <>
            <Text
              style={dynamicBtnTextStyle(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Режим
            </Text>
            <Text
              style={dynamicBtnText2Style(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {resNames[resMode]}
            </Text>
          </>
        )}

        {(item[0] === 'ZagrFiltr' && timersAllDaysState) && (
          <>
            <Text
              style={dynamicBtnTextStyle(controlsInfoWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Автозапуск сегодня
            </Text>

            {firstTimerTimeRange ? (
              <Text
                style={dynamicBtnText2Style(controlsInfoWidth)}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {firstTimerTimeRange}
              </Text>
            ) : (
              <Text
                style={dynamicBtnText2Style(controlsInfoWidth)}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                нет
              </Text>
            )}
            {secondTimerTimeRange ? (
              <Text
                style={dynamicBtnText2Style(controlsInfoWidth)}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {secondTimerTimeRange}
              </Text>
            ) : null}

          </>
        )}
      </View>
    )
  };

  return (
    <FlatList
      ref={flatListRef}
      initialScrollIndex={indexActive}
      data={filteredEntries}
      renderItem={renderItem}
      keyExtractor={(item) => item[0]}
      horizontal
      showsVerticalScrollIndicator={false}
      estimatedItemSize={33}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export default ControlsInfo;
