import React, {
  useRef, useState,
} from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder, Switch,
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
// import { UserContext } from '../../components/providers/UserContext';

import { styles } from './styles/ScheduleModalStyle';

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
  // const { currentDayOfWeek } = useContext(UserContext);
  const [modalVisibleStartTime, setModalVisibleStartTime] = useState(false);
  const [modalVisibleFinishTime, setModalVisibleFinishTime] = useState(false);
  const [modalVisibleTemperature, setModalVisibleTemperature] = useState(false);

  const [selectedDays, setSelectedDays] = useState([]);

  const [startTime, setStartTime] = useState(new Date());
  const [finishTime, setFinishTime] = useState(new Date());
  const [fanTargetSchedule, setFanTargetSchedule] = useState(0);
  const [temperatureSchedule, setTemperatureSchedule] = useState(15);

  const [sendDayTimers, { isLoadingSetDayTimers }] = useSendDayTimersMutation();
  const [sendTimers, { isLoadingSetTimers }] = useSendTimersMutation();

  const [isEnabledSpeed, setIsEnabledSpeed] = useState(false);
  const toggleSwitchSpeed = () => setIsEnabledSpeed((previousState) => !previousState);

  const openModalStartTime = () => {
    setModalVisibleStartTime(true);
  };

  const openModalFinishTime = () => {
    setModalVisibleFinishTime(true);
  };

  const openModalTemperature = () => {
    setModalVisibleTemperature(true);
  };

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

  // const daysOrder = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const serverDaysOrder = ['Сб', 'Пт', 'Чт', 'Ср', 'Вт', 'Пн', 'Вс'];
  const getWeekString = () => serverDaysOrder.map((day) => (selectedDays.includes(day) ? '1' : '0'));

  const displayDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  // const serverDay = {
  //   0: '0000001',
  //   1: '0000010',
  //   2: '0000100',
  //   3: '0001000',
  //   4: '0010000',
  //   5: '0100000',
  //   6: '1000000',
  // }

  const handleDayPressDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  const data = {
    num1: {
      time: '00:00',
      tempTarget: '10',
      fanSpeed: '255',
    },
    num2: {
      time: '00:00',
      tempTarget: '10',
      fanSpeed: '255',
    },
    num3: {
      time: '00:00',
      tempTarget: '10',
      fanSpeed: '255',
    },
    num4: {
      time: '00:00',
      tempTarget: '10',
      fanSpeed: '255',
    },
  }

  const dataSelected = {
    num1: {
      time: String(`${startHours}:${startMinutes}`),
      tempTarget: String(temperatureSchedule),
      fanSpeed: '255', // поменяла местами скорость num2
    },
    num2: {
      time: String(`${finishHours}:${finishMinutes}`),
      tempTarget: String(temperatureSchedule),
      fanSpeed: String(fanTargetSchedule), // поменяла местами скорость num1
    },
    num3: {
      time: '00:00',
      tempTarget: '10',
      fanSpeed: '255',
    },
    num4: {
      time: '00:00',
      tempTarget: '10',
      fanSpeed: '255',
    },
  }

  const sendDayTimersData = async () => {
    setModalVisible(false);
    try {
      if (selectedDays?.length) {
        const days = getWeekString().join('');

        const responseDayTimers = await sendDayTimers({
          controllerId: unitId,
          days,
        });

        if (responseDayTimers.data.message === ' command send ') {
          const delay = 500; // 1 секунда
          for (const day of Object.keys(dayMapping)) {
            let result = data;
            if (selectedDays.includes(day)) {
              result = dataSelected;
            }

            // Используем setTimeout для задержки
            await new Promise(resolve => setTimeout(resolve, delay));

            const response = await sendTimers({
              controllerId: unitId,
              day: dayMapping[day],
              timers: result,
            });

            console.log("response", JSON.stringify(response, null, 2));

            if (response.data.message === ' command send ') {
              continue;
            }
          }
        } else {
          console.log('Сервер не подтвердил отправку дней');
        }
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
                  {numbers.map((item) => <Text key={item} style={styles.dayText}>{item}</Text>)}
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
