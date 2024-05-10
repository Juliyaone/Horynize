import React, { memo, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image, Dimensions, StyleSheet,
} from 'react-native';
import HumidityActiveIcon from '../../../img/hum.png';
import SpeedActiveIcon from '../../../img/fan.png';
import TimerIcon from '../../../img/time.png';
import Microphone from '../../../img/microfon.png';
import ModeIcon from '../../../img/mode.png';
import PowerBtnActiveIcon from '../../../img/power.png';
import DeleteUnitIcon from '../../../img/delete_unit_icon.png';

const screenWidth = Dimensions.get('window').width;
const gap = 10;
const totalGaps = gap * 4;
const buttonWidth = (screenWidth + totalGaps) / 5;
const ImgWidth = buttonWidth * 0.3;

const styles = StyleSheet.create({
  controlsBox: {
    width: buttonWidth,
    height: buttonWidth,
    marginRight: gap,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ED7635',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
  },
  controlsBoxBtn: {
    width: buttonWidth,
    height: buttonWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsBoxIconBtn: {
    width: ImgWidth,
    height: ImgWidth,
    marginBottom: '5%',
  },
})

// Функция для динамического вычисления стилей
const dynamicBtnTextStyle = (buttonSize) => ({
  fontFamily: 'SFProDisplay',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: buttonSize * 0.13,
  lineHeight: buttonSize * 0.13 + 0.2,
  textAlign: 'center',
  color: '#ED7635',
  marginBottom: 4,
});

const FunctionsIconSmall = {
  humRoomTarget: HumidityActiveIcon,
  fanSpeedPTarget: SpeedActiveIcon,
  res: ModeIcon,
  ZagrFiltr: TimerIcon,
  tempChannel: Microphone,
  co2RoomTarget: DeleteUnitIcon,
};

const keyForRenderSmall = ['humRoomTarget', 'fanSpeedPTarget', 'res', 'ZagrFiltr', 'tempChannel', 'co2RoomTarget'];

function ControlsImp(props) {
  const {
    entriesUnitParams, openModal, sendParamsOff,
  } = props;

  const openModalHandler = useCallback((itemName) => {
    openModal(itemName)
  }, [openModal]);

  const renderItemSmall = ({ item }) => {
    if (!keyForRenderSmall.includes(item[0])) {
      return null;
    }

    const imageSrc = FunctionsIconSmall[item[0]];
    return (
      <View style={styles.controlsBox}>

        <TouchableOpacity style={styles.controlsBoxBtn} onPress={() => openModalHandler(item[0])} >
          <Image source={imageSrc} style={styles.controlsBoxIconBtn} />
          {(item[0] === 'humRoomTarget')
            && (
              <Text
                style={dynamicBtnTextStyle(buttonWidth)}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                Влажность
              </Text>
            )}

          {(item[0] === 'fanSpeedPTarget') && (
            <Text
              style={dynamicBtnTextStyle(buttonWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Скорость вращения
            </Text>
          )}
          {(item[0] === 'res') && (
            <Text
              style={dynamicBtnTextStyle(buttonWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Режим
            </Text>
          )}
          {(item[0] === 'ZagrFiltr') && (
            <Text
              style={dynamicBtnTextStyle(buttonWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Автозапуск
            </Text>
          )}
          {(item[0] === 'tempChannel') && (
            <Text
              style={dynamicBtnTextStyle(buttonWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Голосовые ассистенты
            </Text>
          )}
          {(item[0] === 'co2RoomTarget') && (
            <Text
              style={dynamicBtnTextStyle(buttonWidth)}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Удалить установку
            </Text>
          )}
        </TouchableOpacity>
      </View>
    )
  };

  const renderButtonPower = () => (
    <View style={styles.controlsBox}>

      <TouchableOpacity style={styles.controlsBoxBtn} onPress={sendParamsOff}>
        <Image source={PowerBtnActiveIcon} style={styles.controlsBoxIconBtn} />
        <Text
          style={dynamicBtnTextStyle(buttonWidth)}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Выключить
        </Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <FlatList
      data={entriesUnitParams}
      keyExtractor={(item) => item[0]}
      renderItem={renderItemSmall}
      horizontal
      showsVerticalScrollIndicator={false}
      estimatedItemSize={33}
      ListHeaderComponent={renderButtonPower}
      showsHorizontalScrollIndicator={false}
    />
  );
}

export const Controls = memo(ControlsImp);
