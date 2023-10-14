import React, { memo, useMemo, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, Image,
} from 'react-native';
import TemperatureActiveIcon from '../../../img/temperature-active.png';
import HumidityActiveIcon from '../../../img/humidity-active.png';
import SpeedActiveIcon from '../../../img/speed-active.png';
import TimerIcon from '../../../img/timer.png';

import ModeIcon from '../../../img/mode.png';
import PowerBtnActiveIcon from '../../../img/icons/powerBtnActive';

import { styles } from '../HomePlayScreenStyle';

const FunctionsIconSmall = {
  tempTarget: TemperatureActiveIcon,
  humRoomTarget: HumidityActiveIcon,
  fanSpeedP: SpeedActiveIcon,
  res: ModeIcon,
  ZagrFiltr: TimerIcon,
};

function ControlsImp(props) {
  const {
    params, entriesUnitParams, openModal, sendParamsOff,
  } = props;
  const keyForRenderSmall = useMemo(() => ['tempTarget', 'humRoomTarget', 'fanSpeedP', 'res', 'ZagrFiltr'], []);

  const openModalHandler = useCallback((itemName) => {
    openModal(itemName)
  }, [openModal]);

  const renderItemSmall = ({ item, index }) => {
    if (!keyForRenderSmall.includes(item[0])) {
      return null;
    }
    const imageSrc = FunctionsIconSmall[item[0]];
    return (
      <TouchableOpacity
        style={[
          styles.boxFunctionDevicesSmall,
          index !== Object.entries(params).length - 1 && styles.itemMargin,
        ]}
        onPress={() => openModalHandler(item[0])}
      >
        <Image source={imageSrc} style={{ width: 30, height: 30 }} />
        {(item[0] === 'tempTarget') && <Text style={styles.boxPowerBtnTextNameSmall}>Температура</Text>}
        {(item[0] === 'humRoomTarget') && <Text style={styles.boxPowerBtnTextNameSmall}>Влажность</Text>}
        {(item[0] === 'fanSpeedP') && <Text style={styles.boxPowerBtnTextNameSmall}>Скорость вращения</Text>}
        {(item[0] === 'res') && <Text style={styles.boxPowerBtnTextNameSmall}>Режим</Text>}
        {(item[0] === 'ZagrFiltr') && <Text style={styles.boxPowerBtnTextNameSmall}>Автозапуск</Text>}
      </TouchableOpacity>
    )
  };

  const renderButtonPower = () => (
    <View style={styles.boxPowerBtnBoxSmall}>
      <TouchableOpacity style={styles.powerBtnSmall} onPress={sendParamsOff}>
        <PowerBtnActiveIcon />
        <Text style={styles.boxPowerBtnTextSmall}>Питание</Text>
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
