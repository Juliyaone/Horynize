import React, {
  useContext, useCallback, useRef, useState,
} from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Switch,
} from 'react-native';

import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import BtnScheduleIcon from '../../img/icons/btnSchedule';
import ApplyIcon from '../../img/icons/apply';

import DefaultRadialSliderSchedul from '../../components/DefaultRadialSliderSchedul';

import StartTimeModal from './StartTimeModal';
import FinishTimeModal from './FinishTimeModal';
import Loader from '../../components/Loader';
import { useSendDayTimersMutation, useSendTimersMutation, useGetTimersUnitQuery } from '../../redux/usersApi';
import { UserContext } from '../../components/providers/UserContext';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    minHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
    marginBottom: 24,
  },
  boxBtnSchedule: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  btnTimeSchedule: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textBtnSchedule: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0.374,
    color: '#212121',
  },
  boxBtnLabelSchedule: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  labelSchedule: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 7,
  },
  boxDaysContainers: {
    width: '100%',
    marginBottom: 10,
  },
  boxDays: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxDaysHeader: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 15,
  },

  dayTextInactive: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
  },
  dayTextActive: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#FFFFFF',
  },
  dayButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ED7635',
  },
  boxAutoRunContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  autoRunHeader: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
  },
  autoRunHeaderValue: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#ED7635',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 10,
  },
  gradientBackground: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderBox: {
    flexDirection: 'column',
  },
});

function ScheduleModal({
  modalVisible,
  setModalVisible,
  unitId,
}) {
  const dayMapping = {
    Пн: 1,
    Вт: 2,
    Ср: 3,
    Чт: 4,
    Пт: 5,
    Сб: 6,
    Вс: 0,
  };
  const { currentDayOfWeek } = useContext(UserContext);
  const [modalVisibleStartTime, setModalVisibleStartTime] = useState(false);
  const [modalVisibleFinishTime, setModalVisibleFinishTime] = useState(false);
  const [modalVisibleTemperature, setModalVisibleTemperature] = useState(false);

  const [selectedDay, setSelectedDay] = useState(null);
  // const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  // const [week, setWeek] = useState('0000000');
  const [selectedDays, setSelectedDays] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());
  const [fanTargetSchedule, setFanTargetSchedule] = useState(0);
  const [temperatureSchedule, setTemperatureSchedule] = useState(15);

  const [sendDayTimers, { isLoadingSetDayTimers }] = useSendDayTimersMutation();
  const [sendTimers, { isLoadingSetTimers }] = useSendTimersMutation();

  const [isEnabledSpeed, setIsEnabledSpeed] = useState(false);
  const toggleSwitchSpeed = () => setIsEnabledSpeed((previousState) => !previousState);

  const [isEnabledTemp, setIsEnabledTemp] = useState(false);
  const toggleSwitchTemp = () => {
    openModalTemperature((previousState) => !previousState);
    setIsEnabledTemp((previousState) => !previousState);
  };

  const [valueSliderSpeed, setValueSliderSpeed] = useState(0);

  const startTimeDate = new Date(startTime);
  const finishTimeDate = new Date(finishTime);

  const startHours = startTimeDate.getHours();
  const startMinutes = startTimeDate.getMinutes();
  const finishHours = finishTimeDate.getHours();
  const finishMinutes = finishTimeDate.getMinutes();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisible(false);
        }
      },
    }),
  ).current;

  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];

  const displayDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const serverDaysOrder = ['Сб', 'Пт', 'Чт', 'Ср', 'Вт', 'Пн', 'Вс'];
  const serverDay = {
    0: '0000001',
    1: '0000010',
    2: '0000100',
    3: '0001000',
    4: '0010000',
    5: '0100000',
    6: '1000000',
  }

  const openModalStartTime = () => {
    setModalVisibleStartTime(true);
  };

  const openModalFinishTime = () => {
    setModalVisibleFinishTime(true);
  };

  const openModalTemperature = () => {
    setModalVisibleTemperature(true);
  };

  const handleDayPressDay = (day) => {
    setSelectedDay(dayMapping[day]);
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([day]);
    }
  };

  // const getWeekString = () => serverDaysOrder.map((day) => (selectedDays.includes(day) ? '1' : '0')).join('');

  // const sendDayTimersData = async () => {
  //   const weekString = getWeekString();
  //   console.log('weekString', weekString);

  //   setModalVisible(!modalVisible);

  //   const data = {
  //     controllerId: controllers,
  //     days: weekString,
  //   };

  //   try {
  //     const answerSendDayTimers = await sendDayTimers(data);
  //     console.log('answerSendDayTimers', answerSendDayTimers);

  //     console.log('selectedDays', selectedDays);

  //     const promises = Object.keys(dayMapping).map((day, index) => {
  //       console.log('Object.keys(dayMapping)', Object.keys(dayMapping));
  //       const dayNumber = dayMapping[day];
  //       console.log('dayNumber', dayNumber);

  //       const isSelectedDay = selectedDays.includes(day);
  //       console.log('isSelectedDay', isSelectedDay);

  //       const timers = isSelectedDay
  //         ? {
  //           controllerId: unitId,
  //           day: dayNumber,
  //           timers: {
  //             num1: { // часы старт
  //               time: String(`${startHours}:${startMinutes}`),
  //               tempTarget: String(temperatureSchedule),
  //               fanSpeed: String(fanTargetSchedule),
  //             },
  //             // num2: { // минуты старт
  //             //   time: String(startMinutes),
  //             //   tempTarget: String(temperatureSchedule),
  //             //   fanSpeed: String(fanTargetSchedule),
  //             // },
  //             // num3: { // часы финиш
  //             //   time: String(finishHours),
  //             //   tempTarget: String(temperatureSchedule),
  //             //   fanSpeed: String(fanTargetSchedule),
  //             // },
  //             // num4: { // минуты финиш
  //             //   time: String(finishMinutes),
  //             //   tempTarget: String(temperatureSchedule),
  //             //   fanSpeed: String(fanTargetSchedule),
  //             // },
  //           },
  //         } : null;

  //         if (timers) {
  //           return sendTimers(timers); // Возвращаем промис для каждого дня
  //         }
  //     });

  //     const answersSendTimers = await Promise.all(promises);
  //     console.log('answersSendTimers', answersSendTimers);
  //   } catch (error) {
  //     console.log('error', error);
  //     let errorMessage;
  //     if (error.data) {
  //       if (error.data.message) {
  //         errorMessage = error.data.message;
  //       } else {
  //         errorMessage = JSON.stringify(error.data);
  //       }
  //     } else if (error.message) {
  //       errorMessage = error.message;
  //     } else {
  //       errorMessage = JSON.stringify(error);
  //     }
  //   }
  // };

  const sendDayTimersData = async () => {
    setModalVisible(false);

    const data = {
      controllerId: unitId,
      day: selectedDay,
      timers: {
        num1: {
          time: String(`${startHours}:${startMinutes}`),
          tempTarget: String(temperatureSchedule),
          fanSpeed: String(fanTargetSchedule),
        },
        num2: {
          time: String(`${finishHours}:${finishMinutes}`),
          tempTarget: String(temperatureSchedule),
          fanSpeed: String(fanTargetSchedule),
        },
        num3: {
          time: '0',
          tempTarget: '0',
          fanSpeed: '255',
        },
        num4: {
          time: '0',
          tempTarget: '0',
          fanSpeed: '255',
        },
      },
    }
    try {
      if (data && selectedDay) {
        await sendTimers(data);
        await sendDayTimers({
          controllerId: unitId,
          days: serverDay[selectedDay],
        });
        setSelectedDay(null);
      }
    } catch (error) {
      console.log('error', error);
      let errorMessage;
      if (error.data) {
        if (error.data.message) {
          errorMessage = error.data.message;
        } else {
          errorMessage = JSON.stringify(error.data);
        }
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = JSON.stringify(error);
      }
    }
  };

  if (isLoadingSetDayTimers || isLoadingSetTimers) {
    return <Loader />;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <StartTimeModal
        modalVisibleStartTime={modalVisibleStartTime}
        setModalVisibleStartTime={setModalVisibleStartTime}
        setStartTime={setStartTime}
      />

      <FinishTimeModal
        modalVisibleFinishTime={modalVisibleFinishTime}
        setModalVisibleFinishTime={setModalVisibleFinishTime}
        setFinishTime={setFinishTime}
      />

      <DefaultRadialSliderSchedul
        temperatureSchedule={temperatureSchedule}
        setTemperatureSchedule={setTemperatureSchedule}
        modalVisible={modalVisibleTemperature}
        setModalVisible={setModalVisibleTemperature}
        setIsEnabledTemp={setIsEnabledTemp}
      />

      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>График работы</Text>

          <View style={styles.boxBtnSchedule}>

            <View style={styles.boxBtnLabelSchedule}>
              <Text style={styles.labelSchedule}>Начало работы</Text>
              <TouchableOpacity
                onPress={() => openModalStartTime()}
                style={styles.btnTimeSchedule}
              >
                <Text style={styles.textBtnSchedule}>
                  {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <BtnScheduleIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.boxBtnLabelSchedule}>
              <Text style={styles.labelSchedule}>Завершение работы</Text>
              <TouchableOpacity
                onPress={() => openModalFinishTime()}
                style={styles.btnTimeSchedule}
              >
                <Text style={styles.textBtnSchedule}>
                  {finishTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <BtnScheduleIcon />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.boxDaysContainers}>
            <Text style={styles.boxDaysHeader}>Дни недели</Text>

            <View style={styles.boxDays}>

              {displayDays.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    { backgroundColor: selectedDays.includes(day) ? '#ED7635' : '#ffffff' },
                  ]}
                  onPress={() => handleDayPressDay(day)}
                >
                  <Text style={[
                    selectedDays.includes(day) ? styles.dayTextActive : styles.dayTextInactive,
                  ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.boxAutoRunContainer}>
            <View style={styles.boxAutoRun}>
              <Text style={styles.autoRunHeader}>Выбрать скорость</Text>
              <Text style={styles.autoRunHeaderValue}>{fanTargetSchedule}</Text>

              <Switch
                trackColor={{ false: '#F7F7F7', true: '#34C759' }}
                thumbColor={isEnabledSpeed ? '#ffffff' : '#ffffff'}
                ios_backgroundColor="#F7F7F7"
                onValueChange={toggleSwitchSpeed}
                value={isEnabledSpeed}
              />
            </View>

            {isEnabledSpeed
              && (
              <View>
                <View style={styles.boxDays}>
                  {numbers.map((item, index) => <Text key={index} style={styles.dayText}>{item}</Text>)}
                </View>

                <View style={styles.boxDays}>
                  <Slider
                    style={{ width: '100%', height: 40 }}
                    minimumValue={0}
                    maximumValue={10}
                    step={1}
                    minimumTrackTintColor="#ED7635"
                    maximumTrackTintColor="#787880"
                    thumbTintColor="#ED7635"
                    onValueChange={setValueSliderSpeed}
                    value={valueSliderSpeed}
                    onSlidingComplete={(value) => setFanTargetSchedule(value.toString())}
                  />
                </View>
              </View>
              )}
          </View>

          <View style={styles.boxAutoRunContainer}>

            <View style={styles.boxAutoRun}>

              <Text style={styles.autoRunHeader}>Выбрать температуру</Text>
              <Text style={styles.autoRunHeaderValue}>
                {temperatureSchedule}
                °
              </Text>

              <Switch
                trackColor={{ false: '#F7F7F7', true: '#34C759' }}
                thumbColor={isEnabledTemp ? '#ffffff' : '#ffffff'}
                ios_backgroundColor="#F7F7F7"
                onValueChange={toggleSwitchTemp}
                value={isEnabledTemp}
              />
            </View>

          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={sendDayTimersData}>
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}
            >
              <View style={styles.content}>
                <ApplyIcon style={styles.icon} />
                <Text style={styles.text}>Применить</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

export default ScheduleModal;
