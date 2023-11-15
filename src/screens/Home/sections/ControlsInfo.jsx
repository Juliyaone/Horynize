import React, {
  useCallback,
} from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';

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
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 10,
  },
  controlsInfoBtnText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: fontSizeText,
    lineHeight: calculatedLineHeight,
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 4,
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

function ControlsInfo(props) {
  const {
    params, id, filteredEntries, navigation, temperature, flatListRef, indexActive,
  } = props;

  const {
    res: resMode, humRoomTarget: humTarget, fanSpeedPTarget: fanTarget,
  } = params;

  const timersDayState = useSelector((state) => state.timersDay);
  // console.log('timersDayStateControlsInfo', timersDayState);

  const handleSettings = useCallback(() => {
    if (id) {
      navigation.navigate('HomeStack', { screen: 'HomeSchedule', params: { clickedControllerId: String(id) } });
    }
  }, [id, navigation]);

  const renderItem = ({ item }) => {
    // if (item[0] === 'tempTarget' && resMode == '1') {
    //   return null;
    // }

    const imageSrc = FunctionsIcon[item[0]];

    return (
      <View
        style={[
          styles.controlsInfoBox,
          // (index === indexActive) ? styles.controlsInfoBoxActive : styles.controlsInfoBox,
        ]}
      >
        <View style={styles.controlsInfoBoxIconSettings}>
          <LinearGradient
            colors={['#FEB84A', '#FF5204']}
            style={styles.controlsInfoBg}
          >
            <Image source={imageSrc} style={styles.controlsInfoBgIcon} />
          </LinearGradient>
          {(item[0] === 'ZagrFiltr') && (
          <TouchableOpacity onPress={handleSettings}>
            <Image source={SettingsIcon} style={styles.controlsInfoBgIcon} />
          </TouchableOpacity>
          )}

        </View>

        {(item[0] === 'tempTarget') && (
          <>
            <Text style={styles.controlsInfoBtnTextName}>Температура</Text>
            <Text style={styles.controlsInfoBtnText}>

              {resMode === '1'
                ? '0' : `${temperature} °`}

            </Text>
          </>
        )}

        {(item[0] === 'humRoomTarget') && (
          <>
            <Text style={styles.controlsInfoBtnTextName}>Влажность</Text>
            <Text style={styles.controlsInfoBtnText}>
              {humTarget}
              %
            </Text>
          </>
        )}

        {(item[0] === 'fanSpeedPTarget') && (
          <>
            <Text style={styles.controlsInfoBtnTextName}>Скорость</Text>
            <Text style={styles.controlsInfoBtnText}>{fanTarget}</Text>
          </>
        )}

        {(item[0] === 'tempChannel') && (
          <>
            <Text style={styles.controlsInfoBtnTextName}>Голосовые ассистенты</Text>
            <Text style={styles.controlsInfoBtnText}>Не подключены</Text>
            {/* <Text style={styles.controlsInfoBtnText}>Алиса</Text>
            <Text style={styles.controlsInfoBtnText}>Сбер</Text> */}
          </>
        )}

        {(item[0] === 'res') && (
          <>
            <Text style={styles.controlsInfoBtnTextName}>Режим</Text>
            <Text style={styles.controlsInfoBtnText}>{resNames[resMode]}</Text>
          </>
        )}

        {(item[0] === 'ZagrFiltr') && (
          <>
            <Text style={styles.controlsInfoBtnTextName}>Автозапуск сегодня</Text>

            {timersDayState?.timers[0]?.num === 1 && (
              <View style={styles.controlsInfoBtnTextBox}>
                <Text style={styles.controlsInfoBtnText}>
                  {timersDayState?.timers[0].time}
                  {' '}
                  до
                  {' '}
                  {timersDayState?.timers[1].time}
                </Text>
              </View>
            )}
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
