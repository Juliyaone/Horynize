import React, { memo, useMemo, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import TemperatureIcon from '../../../img/temperature.png';
import HumidityIcon from '../../../img/humidity.png';
import SpeedIcon from '../../../img/speed.png';
import SettingsIcon from '../../../img/icons/settings';
import ModeActiveIcon from '../../../img/modeActive.png';
import TimerActiveIcon from '../../../img/timerActive.png';

import { styles } from '../HomePlayScreenStyle';

const FunctionsIcon = {
  tempTarget: TemperatureIcon,
  humRoomTarget: HumidityIcon,
  fanSpeedP: SpeedIcon,
  res: ModeActiveIcon,
  ZagrFiltr: TimerActiveIcon,
};

const resNames = {
  0: 'Не установлен',
  1: 'Вентиляция',
  2: 'Нагрев',
  3: 'Охлаждение',
  4: 'Климат-контроль',
};

function ControlsInfoImp(props) {
  const {
    params, id, entriesUnitParams, timers, navigation, temperature, resMode, humTarget, fanTarget,
  } = props;

  // const {
  //   tempTarget: temperature, res: resMode, humRoomTarget: humTarget, fanSpeedP: fanTarget,
  // } = params;

  const keyForRender = useMemo(() => ['tempTarget', 'humRoomTarget', 'fanSpeedP', 'res', 'ZagrFiltr'], []);

  const handleSettings = useCallback(() => {
    if (id) {
      navigation.navigate('HomeStack', { screen: 'HomeSchedule', params: { clickedControllerId: String(id) } });
    }
  }, [id, navigation]);

  const renderItem = ({ item, index }) => {
    if (!keyForRender.includes(item[0])) {
      return null;
    }
    const imageSrc = FunctionsIcon[item[0]];

    return (
      <View
        style={[
          styles.boxFunctionDevices,
          index !== Object.entries(params).length - 1 && styles.itemMargin,
        ]}
      >
        <View style={styles.boxIconSettings}>
          <LinearGradient
            colors={['#FEB84A', '#FF5204']}
            style={{
              borderRadius: 8, width: 40, height: 40, marginBottom: 5, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View style={styles.functionDevicesBtn}>
              <Image source={imageSrc} style={{ width: 30, height: 30 }} />
            </View>
          </LinearGradient>

          {item[0] === 'ZagrFiltr'
          && (
          <TouchableOpacity onPress={handleSettings}>
            <SettingsIcon />
          </TouchableOpacity>
          )}
        </View>

        {(item[0] === 'tempTarget') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Температура</Text>
            <Text style={styles.boxPowerBtnText}>
              {temperature}
              °
            </Text>
          </>
        )}

        {(item[0] === 'humRoomTarget') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Влажность</Text>
            <Text style={styles.boxPowerBtnText}>
              {humTarget}
              %
            </Text>
          </>
        )}

        {(item[0] === 'fanSpeedP') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Скорость</Text>
            <Text style={styles.boxPowerBtnText}>{fanTarget}</Text>
          </>
        )}

        {(item[0] === 'res') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Режим</Text>
            <Text style={styles.boxPowerBtnText}>{(String(resMode) !== '0') ? resNames[resMode] : 'Не выбрано'}</Text>
          </>
        )}

        {(item[0] === 'ZagrFiltr') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Автозапуск</Text>

            {timers?.timers && (
              <>
                <View style={styles.boxPowerBtnTextBox}>
                  <Text style={styles.boxPowerBtnText}>{timers?.timers[0].time}</Text>
                </View>
                {timers?.timers[1].fanSpeed === '255' && (
                  <>
                    <Text style={styles.boxPowerBtnText}>до</Text>
                    <View style={styles.boxPowerBtnTextBox}>
                      <Text style={styles.boxPowerBtnText}>{timers?.timers[1].time}</Text>
                    </View>

                  </>
                )}
              </>
            )}
          </>
        )}
      </View>
    )
  };

  return (
    <FlatList
      data={entriesUnitParams}
      keyExtractor={(item) => item[0]}
      renderItem={renderItem}
      horizontal
      showsVerticalScrollIndicator={false}
      estimatedItemSize={33}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export const ControlsInfo = memo(ControlsInfoImp);
