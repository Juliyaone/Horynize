import React, { useState } from 'react'
import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';

import ArrowLeft from '../../img/icons/ArrowLeft';
import ApplyIcon from '../../img/icons/apply';


const styles = StyleSheet.create({
  container: {
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
    fontSize: responsiveFontSize(2.5),
    alignItems: 'center',
    textAlign: 'center',
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
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
    marginBottom: 10,
  },
})

export default function HomeScheduleScreen({ navigation, route }) {
  const { clickedControllerId } = route.params;

  const currentContoller = useSelector((state) => state.currentContoller);
  const timersDayState = useSelector((state) => state.timersDay);
  const daysTimerState = useSelector((state) => state.daysTimer);

  const days = ['monday', 'tuesday', 'wednesday', 'thusday', 'friday', 'saturday', 'sunday'];

  const dayMapping = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thusday: 4,
    friday: 5,
    saturday: 6,
  };

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

  const renderTimerTime = (dayIndex) => {
    // Проверка на существование данных
    if (timersDayState?.timersDay && timersDayState?.timersDay?.length > 0) {
      // Проверяем, включает ли массив дней указанный день
      if (timersDayState?.timersDay[0]?.day && timersDayState?.timersDay[0]?.day.includes(dayIndex)) {
        return (
          <Text style={styles.controlsInfoBtnText}>
            {timersDayState?.timersDay[0]?.time}
            {' '}
            до
            {' '}
            {timersDayState?.timersDay[1]?.time}
          </Text>
        );
      }
    }
    return <Text style={styles.controlsInfoBtnText}>Нет</Text>;
  };

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

        <Text style={styles.headerTextSettings}>График работы установки</Text>
        {daysTimerState.timers[0]
          && (
            <View style={styles.cardUserBox}>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-around', marginRight: 20 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                    <Text style={styles.headerText}>
                      Понедельник
                      {' '}
                      {renderTimerTime(1)}
                    </Text>
                    <Text style={styles.headerText}>
                      Вторник
                      {' '}
                      {renderTimerTime(2)}
                    </Text>
                    <Text style={styles.headerText}>
                      Среда
                      {' '}
                      {renderTimerTime(3)}
                    </Text>
                    <Text style={styles.headerText}>
                      Четверг
                      {' '}
                      {renderTimerTime(4)}
                    </Text>
                    <Text style={styles.headerText}>
                      Пятница
                      {' '}
                      {renderTimerTime(5)}
                    </Text>
                    <Text style={styles.headerText}>
                      Суббота
                      {' '}
                      {renderTimerTime(6)}
                    </Text>
                    <Text style={styles.headerText}>
                      Воскресение
                      {' '}
                      {renderTimerTime(7)}
                    </Text>
                  </View>
                </View>

              </View>
              <View style={styles.cardUserBtnBox}>
                <CustomButton text="Изменить график" IconComponent={ApplyIcon} onPress={changeScheduleHandler} />
              </View>
            </View>
          )}
      </View>
    </>
  )
}
