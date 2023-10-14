import React, { memo, useCallback } from 'react';
import {
  View, Text,
} from 'react-native';
import DefaultRadialSlider from '../../../components/DefaultRadialSlider';
import TimeIcon from '../../../img/icons/time';

import { styles } from '../HomePlayScreenStyle';

function TemperatureImp(props) {
  const {
    params, id, sendParams, changeParams,
  } = props;

  const sendParamsTemperature = useCallback(async (newTemperature) => {
    try {
      if (!newTemperature.isNaN && typeof newTemperature === 'number' && id) {
        const data = {
          controllerId: String(id),
          tempTarget: String(newTemperature),
        }
        changeParams({ tempTarget: newTemperature });
        await sendParams(data);
      }
    } catch (error) { /* empty */ }
  }, [changeParams, id, sendParams])

  const isDisabled = Number(params.res) === 1;

  return (
    <>
      <View style={isDisabled ? styles.disabledContainer : styles.btnSchedule}>
        <TimeIcon style={styles.btnScheduleIcon} />
        <Text style={styles.btnScheduleText}>Часы работы</Text>
      </View>
      <View style={isDisabled ? styles.disabledContainer : null}>
        <DefaultRadialSlider
          temperature={params?.tempTarget}
          onComplete={sendParamsTemperature}
        />
      </View>
    </>
  );
}

export const Temperature = memo(TemperatureImp);
