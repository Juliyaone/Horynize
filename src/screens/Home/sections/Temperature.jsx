import React, { memo } from 'react';
import {
  View, Text,
} from 'react-native';
import DefaultRadialSlider from '../../../components/DefaultRadialSlider';
// import TimeIcon from '../../../img/icons/time';

import { styles } from '../HomePlayScreenStyle';

function TemperatureImp(props) {
  const {
    params, id, sendParamsData, changeParams, setIsScrollEnabled, temperature,
  } = props;

  const isDisabled = Number(params.res) === 1;

  return (
    <>
      {/* <View style={isDisabled ? styles.disabledContainer : styles.btnSchedule}>
        <TimeIcon style={styles.btnScheduleIcon} />
        <Text style={styles.btnScheduleText}>Часы работы</Text>
      </View> */}
      <View style={isDisabled ? styles.disabledContainer : null}>
        <DefaultRadialSlider
          sendParamsData={sendParamsData}
          changeParams={changeParams}
          id={id}
          temperature={temperature}
          setIsScrollEnabled={setIsScrollEnabled}
        />
      </View>
    </>
  );
}

export const Temperature = memo(TemperatureImp);
