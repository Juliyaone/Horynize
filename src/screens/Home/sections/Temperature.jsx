import React, { memo } from 'react';
import {
  View,
} from 'react-native';
import DefaultRadialSlider from '../../../components/DefaultRadialSlider';
// import TimeIcon from '../../../img/icons/time';

import { styles } from '../HomePlayScreenStyle';

function TemperatureImp(props) {
  const {
    params, id, sendParamsData, changeParams, temperature, scrollToIndex,
  } = props;

  const isDisabled = Number(params.res) === 1;
  // <View style={{ width: '100%', height: '100%' }}>

  return (
    <View style={[isDisabled ? styles.disabledContainer : null, styles.fullSize]}>
      <DefaultRadialSlider
        sendParamsData={sendParamsData}
        changeParams={changeParams}
        id={id}
        temperature={temperature}
        scrollToIndex={scrollToIndex}
      />
    </View>
  );
}

export const Temperature = memo(TemperatureImp);
