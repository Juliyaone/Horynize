import React, { useState } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux';

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
  const { clickedControllerId } = route.params;
  const currentContoller = useSelector((state) => state.currentContoller);

  // const [dayTimers, setDayTimers] = useState(null);

  // const { data,
  //   isLoading: isLoadingGetDayTimers
  // } = useUnitsGetDayTimersQuery({ controllerId: clickedControllerId });
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
        onPress={() => {
          if (currentContoller?.params?.enabled === '1') {
            navigation.navigate('HomeStack', {
              screen: 'HomePlay',
              params: { clickedControllerId },
            })
          } else {
            navigation.navigate('HomeStack', {
              screen: 'Home',
              params: { clickedControllerId },
            })
          }
        }}
      >
        <ArrowLeft />
        <Text>Назад</Text>
      </TouchableOpacity>

      <Text>График работы установки</Text>
    </View>
  )
}
