import React, { useEffect, useState } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import ArrowLeft from '../../img/icons/ArrowLeft';
// import { useUnitsGetDayTimersQuery } from '../../redux/usersApi';

// import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 'auto',
    marginTop: 50,
  },
})

export default function HomeScheduleScreen({ navigation, route }) {
  const { unitId } = route.params;

  // const [dayTimers, setDayTimers] = useState(null);

  // const { data, isLoading: isLoadingGetDayTimers } = useUnitsGetDayTimersQuery({ controllerId: unitId });
  // console.log(data?.timers, 'data');

  // useEffect(() => {

  //   setDayTimers(data);
  // }, [data])

  // console.log(dayTimers, 'dayTimersHomeScheduleScreen');

  // if (isLoadingGetDayTimers) {
  //   return <Loader />;
  // }

  return (
    <View>

      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.navigate('HomeStack', {
          screen: 'HomePlay',
          params: { clickedDevice: unitId },
        })}
      >
        <ArrowLeft />
        <Text>Назад</Text>
      </TouchableOpacity>

      <Text>График работы установки</Text>
    </View>
  )
}
