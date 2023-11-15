import React, { useState } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';

import ArrowLeft from '../../img/icons/ArrowLeft';
import ApplyIcon from '../../img/icons/apply';

// import { useGetTimersUnitQuery } from '../../redux/usersApi';

// import Loader from '../../components/Loader';

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  btnBack: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  headerTextSettings: {
    fontFamily: 'SFProDisplayBold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.38,
    color: '#222222',
    marginBottom: 25,
  },
  cardUserBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15,
  },
  cardUserBtnBox: {
    width: '100%',
    marginTop: 25,
  },
  headerText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 10,
  },
})

export default function HomeScheduleScreen({ navigation, route }) {
  const { clickedControllerId } = route.params;

  const currentContoller = useSelector((state) => state.currentContoller);
  const timersDayState = useSelector((state) => state.timersDay);
  const daysTimerState = useSelector((state) => state.daysTimer);

  console.log('daysTimerState', daysTimerState);
  console.log('timersDayStateHomeScheduleScreen', timersDayState);
  const firstTimer = daysTimerState.timers[0];
  const days = ['monday', 'tuesday', 'wednesday', 'thusday', 'friday', 'saturday', 'sunday'];

  const firstDayWithOne = days.find((day) => firstTimer[day] === '1');

  const dayMapping = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thusday: 4,
    friday: 5,
    saturday: 6,
  };
  console.log('Первый день недели с 1:', dayMapping[firstDayWithOne]);

  // const {
  //   data: timersForWeek,
  // } = useGetTimersUnitQuery({ controllerId: clickedControllerId, day: dayMapping[firstDayWithOne] });

  // console.log('timersForWeek', timersForWeek);

  const changeScheduleHandler = () => {
    if (currentContoller?.params?.enabled === '1') {
      navigation.navigate('HomeStack', {
        screen: 'HomePlay',
        params: { clickedControllerId, fromHomeSchedule: true },
      })
    } else {
      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedControllerId },
      })
    }
  }

  return (
    <>
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
      <View style={styles.container}>

        {/* <Text>График работы установки на сегодня </Text>
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
      )} */}
        <Text style={styles.headerTextSettings}>График работы установки</Text>
        {/* { daysTimerState.timers[0] &&  */}
        <View style={styles.cardUserBox}>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginRight: 20 }}>
              <Text style={styles.headerText}>Понедельник</Text>
              <Text style={styles.headerText}>Вторник</Text>
              <Text style={styles.headerText}>Среда</Text>
              <Text style={styles.headerText}>Четверг</Text>
              <Text style={styles.headerText}>Пятница</Text>
              <Text style={styles.headerText}>Суббота</Text>
              <Text style={styles.headerText}>Воскресенье</Text>
            </View>

            {/* <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].monday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    {' '}
                    до
                    {' '}
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].tuesday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    {' '}
                    до
                    {' '}
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].wednesday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    {' '}
                    до
                    {' '}
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].thusday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    {' '}
                    {' '}
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].friday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    {' '}
                    до
                    {' '}
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].saturday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    до
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
              <Text style={styles.headerText}>
                {daysTimerState.timers[0].sunday === '1' ? (
                  <Text style={styles.controlsInfoBtnText}>
                    {timersDayState?.timers[0].time}
                    {' '}
                    до
                    {' '}
                    {timersDayState?.timers[1].time}
                  </Text>
                ) : 'Нет'}

              </Text>
            </View> */}

          </View>
          {/* <View style={styles.cardUserBtnBox}>
            <CustomButton text="Изменить график" IconComponent={ApplyIcon} onPress={changeScheduleHandler} />
          </View> */}
        </View>

      </View>
    </>
  )
}
