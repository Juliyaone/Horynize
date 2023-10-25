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

const screenWidth = Dimensions.get('window').width;
const gap = 10;
const totalGaps = gap * 4;
const buttonWidth = (screenWidth + totalGaps) / 5;
const fontSizeBtnText = buttonWidth * 0.12;
const calculatedLineHeight = buttonWidth * 0.12 + 0.1
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
  controlsBoxBtnText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: fontSizeBtnText,
    lineHeight: calculatedLineHeight,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#ED7635',
    marginBottom: 4,
  },
  controlsBoxIconBtn: {
    width: ImgWidth,
    height: ImgWidth,
    marginBottom: '5%',
  },
})

const FunctionsIconSmall = {
  humRoomTarget: HumidityActiveIcon,
  fanSpeedPTarget: SpeedActiveIcon,
  res: ModeIcon,
  ZagrFiltr: TimerIcon,
  tempChannel: Microphone,
};

const keyForRenderSmall = ['humRoomTarget', 'fanSpeedPTarget', 'res', 'ZagrFiltr', 'tempChannel'];

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
        <TouchableOpacity
          style={[
            styles.controlsBoxBtn,
          ]}
          onPress={() => openModalHandler(item[0])}
        >
          <Image source={imageSrc} style={styles.controlsBoxIconBtn} />

          {(item[0] === 'humRoomTarget') && <Text style={styles.controlsBoxBtnText}>Влажность</Text>}
          {(item[0] === 'fanSpeedPTarget') && <Text style={styles.controlsBoxBtnText}>Скорость вращения</Text>}
          {(item[0] === 'res') && <Text style={styles.controlsBoxBtnText}>Режим</Text>}
          {(item[0] === 'ZagrFiltr') && <Text style={styles.controlsBoxBtnText}>Автозапуск</Text>}
          {(item[0] === 'tempChannel') && <Text style={styles.controlsBoxBtnText}>Голосовые ассистенты</Text>}

        </TouchableOpacity>
      </View>
    )
  };

  const renderButtonPower = () => (
    <View style={styles.controlsBox}>
      <TouchableOpacity style={styles.controlsBoxBtn} onPress={sendParamsOff}>
        <Image source={PowerBtnActiveIcon} style={styles.controlsBoxIconBtn} />
        <Text style={styles.controlsBoxBtnText}>Выключить</Text>
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
