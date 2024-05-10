import React, {
  useReducer, useRef, useState, useCallback,
} from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

import ApplyIcon from '../../img/icons/apply';
import BtnScheduleIcon from '../../img/icons/btnSchedule';

import BtnPlusIcon from '../../img/icons/BtnPlusIcon'
import BtnMinusIcon from '../../img/icons/BtnMinusIcon'

import StartTimeModal from './StartTimeModal';
import FinishTimeModal from './FinishTimeModal';
import DefaultRadialSliderSchedul from '../../components/DefaultRadialSliderSchedul';
import SpeedModalShedule from './SpeedModalShedule';
import ModalError from '../../components/ModalError';

import Loader from '../../components/Loader';

import { changeTimersAllDays } from '../../redux/slices/timersAllDaysSlice';

import { useSendDayTimersMutation, useSendTimersMutation } from '../../redux/usersApi';

import { styles } from './styles/ScheduleModalStyle';

// Исходное состояние
const initialState = {
  modalVisibleStartTime: false,
  modalVisibleFinishTime: false,
  modalVisibleStartTime2: false,
  modalVisibleFinishTime2: false,
  modalVisibleTemperature: false,
  modalVisibleTemperature2: false,
  modalVisibleSpeed: false,
  modalVisibleSpeed2: false,
  modalVisibleSchedule: false,
  visibilityAdditionalTimers: false,

  isLoading: false,

  selectedDays: [],

  startTime: new Date().getTime(), // Текущее время в миллисекундах
  finishTime: new Date().getTime(), // Текущее время в миллисекундах
  startTime2: new Date().getTime(), // Текущее время в миллисекундах
  finishTime2: new Date().getTime(), // Текущее время в миллисекундах

  speed: '255',
  speed2: '255',
  temperature: '15',
  temperature2: '15',

  isSchangedSpeed: false,
  isSchangedSpeed2: false,

  isSchangedTemperature: false,
  isSchangedTemperature2: false,

  isSchangedStartTime: false,
  isSchangedStartTime2: false,

  isSchangedFinishTime: false,
  isSchangedFinishTime2: false,

};

// Редьюсер
function scheduleReducer(state, action) {
  switch (action.type) {
    case 'SET_MODAL_VISIBLE_START_TIME':
      return { ...state, modalVisibleStartTime: action.payload };
    case 'SET_MODAL_VISIBLE_START_TIME_2':
      return { ...state, modalVisibleStartTime2: action.payload };
    case 'SET_MODAL_VISIBLE_FINISH_TIME':
      return { ...state, modalVisibleFinishTime: action.payload };
    case 'SET_MODAL_VISIBLE_FINISH_TIME_2':
      return { ...state, modalVisibleFinishTime2: action.payload };
    case 'SET_MODAL_VISIBLE_TEMPERATURE':
      return { ...state, modalVisibleTemperature: action.payload };
    case 'SET_MODAL_VISIBLE_SPEED':
      return { ...state, modalVisibleSpeed: action.payload };
    case 'SET_MODAL_VISIBLE_TEMPERATURE_2':
      return { ...state, modalVisibleTemperature2: action.payload };
    case 'SET_MODAL_VISIBLE_SPEED_2':
      return { ...state, modalVisibleSpeed2: action.payload };
    case 'SET_MODAL_VISIBLE_ScHEDULE':
      return { ...state, modalVisibleSchedule: action.payload };
    case 'REMOVE_VISIBLE_TIMER':
      // Проверяем, если visibilityAdditionalTimers устанавливается в false
      if (!action.payload) {
        // Сбрасываем startTime2 и finishTime2
        const resetTime = new Date();
        resetTime.setHours(0, 0, 0, 0); // Устанавливаем '00:00' текущего дня
        return {
          ...state,
          visibilityAdditionalTimers: action.payload,
          startTime2: resetTime.getTime(), // Сброс в '00:00' в миллисекундах
          finishTime2: resetTime.getTime(), // Сброс в '00:00' в миллисекундах
          speed2: '255',
          temperature2: '15',
        };
      }
      return { ...state, visibilityAdditionalTimers: action.payload };
    case 'OPEN_VISIBLE_TIMER':
      return { ...state, visibilityAdditionalTimers: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESET_STATE_CHANGED':
      return {
        ...state,
        isSchangedSpeed: false,
        isSchangedSpeed2: false,

        isSchangedTemperature: false,
        isSchangedTemperature2: false,

        isSchangedStartTime: false,
        isSchangedStartTime2: false,

        isSchangedFinishTime: false,
        isSchangedFinishTime2: false,

      };
    case 'TOGGLE_DAY':
      const { day } = action.payload;
      const isSelected = state.selectedDays.includes(day);
      return {
        ...state,
        selectedDays: isSelected
          ? state.selectedDays.filter((d) => d !== day)
          : [...state.selectedDays, day],
      };
    case 'SET_START_TIME':
      return {
        ...state,
        startTime: action.payload.time,
        isSchangedStartTime: true,
      };
    case 'SET_FINISH_TIME':
      return {
        ...state,
        finishTime: action.payload.time,
        isSchangedFinishTime: true,

      };
    case 'SET_START_TIME_2':
      return {
        ...state,
        startTime2: action.payload.time,
        isSchangedStartTime2: true,
      };
    case 'SET_FINISH_TIME_2':
      return {
        ...state,
        finishTime2: action.payload.time,
        isSchangedFinishTime2: true,
      };
    case 'SET_SPEED':
      return {
        ...state,
        speed: action.payload.speed,
        isSchangedSpeed: true,
      };
    case 'SET_TEMPERATURE':
      return {
        ...state,
        temperature: action.payload.temperature,
        isSchangedTemperature: true,
      };
    case 'SET_SPEED_2':
      return {
        ...state,
        speed2: action.payload.speed,
        isSchangedSpeed2: true,
      };
    case 'SET_TEMPERATURE_2':
      return {
        ...state,
        temperature2: action.payload.temperature,
        isSchangedTemperature2: true,
      };
    default:
      return state;
  }
}

function TimerEditor({
  modalVisibleTimerEditor,
  setModalVisibleTimerEditor,
  unitId,
}) {
  const [state, localDispatch] = useReducer(scheduleReducer, initialState);
  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const [isWarningModalVisible, setWarningModalVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const dispatch = useDispatch();

  const [sendDayTimers, { isLoading: isDayTimersLoading }] = useSendDayTimersMutation();
  const [sendTimers, { isLoading: isTimersLoading }] = useSendTimersMutation();

  const changeTimersAllDaysHandler = useCallback((params) => dispatch(changeTimersAllDays(params)), [dispatch]);

  // Закрываем модальное окно жестом вниз
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisibleTimerEditor(false);
        }
      },
    }),
  ).current;

  // Конвертируем время в формат для сервера
  const convertTime = (milliseconds) => {
    const date = new Date(milliseconds);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Словарь для преобразования дней недели в строку для сервера
  const serverDay = {
    Вс: '0000001',
    Пн: '0000010',
    Вт: '0000100',
    Ср: '0001000',
    Чт: '0010000',
    Пт: '0100000',
    Сб: '1000000',
  };

  // Словарь для преобразования дней недели в число для сервера для отпарвки таймеров
  const serverDayForTimer = {
    Вс: 0,
    Пн: 1,
    Вт: 2,
    Ср: 3,
    Чт: 4,
    Пт: 5,
    Сб: 6,
  };

  // Функция для получения строки для сервера из выбранных дней
  const getDaysStringForServer = (selectedDays) => {
    // Результатирующая строка, начинаем с "ничего не выбрано"
    let resultString = '0000000';

    // Перебираем каждый выбранный день
    selectedDays.forEach((day) => {
      // Получаем строку для текущего дня
      const dayString = serverDay[day];
      // Обновляем результатирующую строку
      for (let i = 0; i < 7; i++) {
        if (dayString[i] === '1') {
          resultString = `${resultString.substring(0, i)}1${resultString.substring(i + 1)}`;
        }
      }
    });

    return resultString;
  };

  // Функция валидации
  const getMissingChangesMessage = () => {
    const messages = [];

    if (!state.isSchangedSpeed) messages.push('Скорость');
    if (!state.isSchangedTemperature) messages.push('Температура');
    if (!state.isSchangedStartTime) messages.push('Время начала');
    if (!state.isSchangedFinishTime) messages.push('Время окончания');
    if (state.selectedDays.length === 0) messages.push('Нужно выбрать дни недели');

    // Добавляем проверку на дополнительные таймеры
    if (state.visibilityAdditionalTimers) {
      if (!state.isSchangedSpeed2) messages.push('Скорость для 2 таймера');
      if (!state.isSchangedTemperature2) messages.push('Температура для 2 таймера');
      if (!state.isSchangedStartTime2) messages.push('Время начала для 2 таймера');
      if (!state.isSchangedFinishTime2) messages.push('Время окончания для 2 таймера');
    }

    return messages.length > 0 ? `Необходимо заполнить:\n${messages.join(',\n')}.` : '';
  };

  // отправка данных в стейт для позитивного обновления
  const sendTimersForSelectedDaysInState = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const day of state.selectedDays) {
      const dayNumber = serverDayForTimer[day];

      const timersForState = [
        {
          fanSpeed: state.speed, num: 1, tempTarget: state.temperature, time: convertTime(state.startTime),
        }, {
          fanSpeed: state.speed, num: 2, tempTarget: state.temperature, time: convertTime(state.finishTime),
        },
      ];

      if (state.visibilityAdditionalTimers) {
        timersForState.push({
          fanSpeed: state.speed2,
          num: 3,
          tempTarget: state.temperature2,
          time: convertTime(state.startTime2),
        });
        timersForState.push({
          fanSpeed: state.speed2,
          num: 4,
          tempTarget: state.temperature2,
          time: convertTime(state.finishTime2),
        });
      }

      const timersArrForState = {
        ventUnit: [{ day: String(dayNumber) }],
        timers: timersForState,
      };

      changeTimersAllDaysHandler(timersArrForState);
    }

    setModalVisibleTimerEditor(false); // Закрытие модального окна после отправки данных в стейт
  };

  // отправка данных на сервер
  const sendTimersForSelectedDays = async () => {
    try {
    // eslint-disable-next-line no-restricted-syntax
      for (const [index, day] of state.selectedDays.entries()) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * index));

        const dayNumber = serverDayForTimer[day];

        const timersPayload = {
          controllerId: unitId,
          day: dayNumber,
          timers: {
            num1: { time: String(convertTime(state.startTime)), tempTarget: String(state.temperature), fanSpeed: String(state.speed) },

            num2: { time: String(convertTime(state.finishTime)), tempTarget: String(state.temperature), fanSpeed: String(state.speed) },

            num3: {
              time: state.visibilityAdditionalTimers
                ? String(convertTime(state.startTime2))
                : '00:00',
              tempTarget: state.visibilityAdditionalTimers ? String(state.temperature2) : '15',
              fanSpeed: state.visibilityAdditionalTimers ? String(state.speed2) : '255',
            },

            num4: {
              time: state.visibilityAdditionalTimers
                ? String(convertTime(state.finishTime2))
                : '00:00',
              tempTarget: state.visibilityAdditionalTimers ? String(state.temperature2) : '15',
              fanSpeed: state.visibilityAdditionalTimers ? String(state.speed2) : '255',
            },
          },
        };

        await sendTimers(timersPayload).unwrap();
      }
    } catch (error) {
      console.error('Ошибка при отправке данных для дня: ', error);
      setWarningMessage('Ошибка при отправке данных для дня.');
      setWarningModalVisible(true);
    }
  };

  const sendDayTimersData = async () => {
    try {
      // Конвертируем выбранные дни в требуемый формат, например, "1000001"
      const daysStringForServer = getDaysStringForServer(state.selectedDays);

      const dayTimersPayload = {
        controllerId: unitId,
        days: daysStringForServer,
      };

      // Отправляем настройки выбранных дней
      await sendDayTimers(dayTimersPayload);

      // Отправляем настройки таймеров на день
      await sendTimersForSelectedDays();
    } catch (error) {
      console.error('Ошибка при отправке данных для дня: ', error);
      setWarningMessage('Ошибка при отправке данных для дня.');
      setWarningModalVisible(true);
    }
  }

  // Валидация на заполнение всех необходимых данных перед отправкой
  const handleApplyChanges = async () => {
    // Проверка наличия обязательных изменений для первого набора параметров
    let requiredChangesMade = state.isSchangedSpeed && state.isSchangedTemperature
      && state.isSchangedStartTime && state.isSchangedFinishTime && state.selectedDays.length > 0;

    // Если дополнительные таймеры активны, проверяем изменения для второго набора параметров
    if (state.visibilityAdditionalTimers) {
      requiredChangesMade = requiredChangesMade && state.isSchangedSpeed2 && state.isSchangedTemperature2
        && state.isSchangedStartTime2 && state.isSchangedFinishTime2;
    }

    if (!requiredChangesMade) {
      const message = getMissingChangesMessage();
      setWarningMessage(message);
      setWarningModalVisible(true);
    } else {
      await sendTimersForSelectedDaysInState();
      sendDayTimersData();
    }
  };

  // отправка данных в стейт для позитивного обновления
  const sendResetDayTimersDataInState = async () => {
    const daysOfWeekData = [0, 1, 2, 3, 4, 5, 6];

    // eslint-disable-next-line no-restricted-syntax
    for (const dayNumber of daysOfWeekData) {
      const timersForState = [
        {
          fanSpeed: '255', num: 1, tempTarget: '15', time: '00:00',
        },
        {
          fanSpeed: '255', num: 2, tempTarget: '15', time: '00:00',
        },
        {
          fanSpeed: '255', num: 3, tempTarget: '15', time: '00:00',
        },
        {
          fanSpeed: '255', num: 4, tempTarget: '15', time: '00:00',
        },
      ]

      const timersArrForState = {
        ventUnit: [{ day: dayNumber }],
        timers: timersForState,
      };

      changeTimersAllDaysHandler(timersArrForState);
    }
    setModalVisibleTimerEditor(false);
  }

  const sendResetDayTimersData = async () => {
    const daysOfWeekData = [0, 1, 2, 3, 4, 5, 6];

    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const dayNumber of daysOfWeekData) {
        await sendResetDayTimersDataInState();

        const dayTimersPayload = {
          controllerId: unitId,
          days: '0000000',
        };

        // Отправляем настройки выбранных дней
        await sendDayTimers(dayTimersPayload);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const timersPayloadData = {
          controllerId: unitId,
          day: dayNumber,
          timers: {
            num1: { time: '00:00', tempTarget: '15', fanSpeed: '255' },
            num2: { time: '00:00', tempTarget: '15', fanSpeed: '255' },
            num3: { time: '00:00', tempTarget: '15', fanSpeed: '255' },
            num4: { time: '00:00', tempTarget: '15', fanSpeed: '255' },
          },
        };

        // Сброс таймеров
        await sendTimers(timersPayloadData).unwrap();
      }
    } catch (error) {
      console.error('Ошибка при сбросе таймеров:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisibleTimerEditor}
      onRequestClose={() => {
        setModalVisibleTimerEditor(!modalVisibleTimerEditor);
      }}
    >

      <ModalError
        visible={isWarningModalVisible}
        onDismiss={() => setWarningModalVisible(false)}
        errorText={warningMessage}
      />

      <StartTimeModal
        modalVisibleStartTime={state.modalVisibleStartTime}
        setModalVisibleStartTime={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_START_TIME', payload: isVisible })}
        startTime={state.startTime}
        setStartTime={(time) => localDispatch({ type: 'SET_START_TIME', payload: { time } })}
      />

      <StartTimeModal
        modalVisibleStartTime={state.modalVisibleStartTime2}
        setModalVisibleStartTime={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_START_TIME_2', payload: isVisible })}
        startTime={state.startTime2}
        setStartTime={(time) => localDispatch({ type: 'SET_START_TIME_2', payload: { time } })}
      />

      <FinishTimeModal
        modalVisibleFinishTime={state.modalVisibleFinishTime}
        setModalVisibleFinishTime={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_FINISH_TIME', payload: isVisible })}
        finishTime={state.finishTime}
        setFinishTime={(time) => localDispatch({ type: 'SET_FINISH_TIME', payload: { time } })}
      />

      <FinishTimeModal
        modalVisibleFinishTime={state.modalVisibleFinishTime2}
        setModalVisibleFinishTime={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_FINISH_TIME_2', payload: isVisible })}
        finishTime={state.finishTime2}
        setFinishTime={(time) => localDispatch({ type: 'SET_FINISH_TIME_2', payload: { time } })}
      />

      <SpeedModalShedule
        modalVisibleSpeed={state.modalVisibleSpeed}
        seModalVisibleSpeed={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_SPEED', payload: isVisible })}
        speedSchedule={state.speed}
        setSpeedSchedule={(speed) => localDispatch({ type: 'SET_SPEED', payload: { speed } })}
      />

      <SpeedModalShedule
        modalVisibleSpeed={state.modalVisibleSpeed2}
        seModalVisibleSpeed={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_SPEED_2', payload: isVisible })}
        speedSchedule={state.speed2}
        setSpeedSchedule={(speed) => localDispatch({ type: 'SET_SPEED_2', payload: { speed } })}
      />

      <DefaultRadialSliderSchedul
        modalVisibleTemperature={state.modalVisibleTemperature}
        temperatureSchedule={state.temperature}
        setTemperatureSchedule={(temperature) => localDispatch({ type: 'SET_TEMPERATURE', payload: { temperature } })}
        setModalVisibleTemperature={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_TEMPERATURE', payload: isVisible })}
      />

      <DefaultRadialSliderSchedul
        modalVisibleTemperature={state.modalVisibleTemperature2}
        temperatureSchedule={state.temperature2}
        setTemperatureSchedule={(temperature) => localDispatch({ type: 'SET_TEMPERATURE_2', payload: { temperature } })}
        setModalVisibleTemperature={(isVisible) => localDispatch({ type: 'SET_MODAL_VISIBLE_TEMPERATURE_2', payload: isVisible })}
      />

      <View style={styles.centeredView}>

        {state.isLoading && <Loader />}

        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Редактирование таймеров</Text>

          <View style={styles.boxBtnSchedule}>

            <View style={styles.boxBtnLabelSchedule}>
              <Text style={styles.labelSchedule}>Старт</Text>
              <TouchableOpacity
                onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_START_TIME', payload: true })}
                style={styles.btnTimeSchedule}
              >
                <Text style={styles.textBtnSchedule}>
                  {new Date(state.startTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
                <BtnScheduleIcon />
              </TouchableOpacity>
            </View>

            <View style={styles.boxBtnLabelSchedule}>
              <Text style={styles.labelSchedule}>Стоп</Text>
              <TouchableOpacity
                onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_FINISH_TIME', payload: true })}
                style={styles.btnTimeSchedule}
              >
                <Text style={styles.textBtnSchedule}>
                  {new Date(state.finishTime).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  })}
                </Text>
                <BtnScheduleIcon />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.labelSchedule}> </Text>

              <TouchableOpacity
                onPress={() => localDispatch({ type: 'OPEN_VISIBLE_TIMER', payload: true })}
                style={styles.btnPlusTimeSchedule}
              >
                <BtnPlusIcon style={styles.textBtnSchedule} />
              </TouchableOpacity>
            </View>
          </View>

          {state.visibilityAdditionalTimers
            && (
              <View style={styles.boxBtnSchedule}>

                <View style={styles.boxBtnLabelSchedule}>
                  <Text style={styles.labelSchedule}>Старт</Text>
                  <TouchableOpacity
                    onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_START_TIME_2', payload: true })}
                    style={styles.btnTimeSchedule}
                  >
                    <Text style={styles.textBtnSchedule}>
                      {new Date(state.startTime2).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </Text>
                    <BtnScheduleIcon />
                  </TouchableOpacity>
                </View>

                <View style={styles.boxBtnLabelSchedule}>
                  <Text style={styles.labelSchedule}>Стоп</Text>
                  <TouchableOpacity
                    onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_FINISH_TIME_2', payload: true })}
                    style={styles.btnTimeSchedule}
                  >
                    <Text style={styles.textBtnSchedule}>
                      {new Date(state.finishTime2).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      })}
                    </Text>
                    <BtnScheduleIcon />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text style={styles.labelSchedule}> </Text>

                  <TouchableOpacity
                    onPress={() => localDispatch({ type: 'REMOVE_VISIBLE_TIMER', payload: false })}
                    style={styles.btnMinusTimeSchedule}
                  >
                    <BtnMinusIcon />
                  </TouchableOpacity>
                </View>

              </View>
            )}

          <View style={styles.boxDaysContainers}>
            <Text style={styles.boxDaysHeader}>Дни недели</Text>
            <View style={styles.boxDays}>
              {daysOfWeek.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    { backgroundColor: state.selectedDays.includes(day) ? '#ED7635' : '#ffffff' },
                  ]}
                  onPress={() => localDispatch({ type: 'TOGGLE_DAY', payload: { day } })}
                >
                  <Text style={[
                    state.selectedDays.includes(day) ? styles.dayTextActive : styles.dayTextInactive,
                  ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.boxAutoRunContainer}>

            <TouchableOpacity
              onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_SPEED', payload: true })}
              style={styles.boxAutoRun}
            >
              <Text style={styles.autoRunHeader}>Выбрать скорость</Text>
              <Text style={styles.autoRunHeaderValue}>
                {state.speed === '255' ? 'Не выбрано' : state.speed}
              </Text>
              <BtnScheduleIcon />
            </TouchableOpacity>

          </View>
          {state.visibilityAdditionalTimers
            && (
              <View style={styles.boxAutoRunContainer}>

                <TouchableOpacity
                  onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_SPEED_2', payload: true })}
                  style={styles.boxAutoRun}
                >
                  <Text style={styles.autoRunHeader}>Выбрать скорость 2 таймера</Text>
                  <Text style={styles.autoRunHeaderValue}>
                    {state.speed2 === '255' ? 'Не выбрано' : state.speed2}
                  </Text>
                  <BtnScheduleIcon />
                </TouchableOpacity>

              </View>
            )}

          <View style={styles.boxAutoRunContainer}>
            <TouchableOpacity
              onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_TEMPERATURE', payload: true })}
              style={styles.boxAutoRun}
            >
              <Text style={styles.autoRunHeader}>Выбрать температуру</Text>
              <Text style={styles.autoRunHeaderValue}>
                {state.temperature}
                °
              </Text>
              <BtnScheduleIcon />
            </TouchableOpacity>
          </View>

          {state.visibilityAdditionalTimers
            && (
              <View style={styles.boxAutoRunContainer}>
                <TouchableOpacity
                  onPress={() => localDispatch({ type: 'SET_MODAL_VISIBLE_TEMPERATURE_2', payload: true })}
                  style={styles.boxAutoRun}
                >
                  <Text style={styles.autoRunHeader}>Выбрать температуру 2 таймера</Text>
                  <Text style={styles.autoRunHeaderValue}>
                    {state.temperature2}
                    °
                  </Text>
                  <BtnScheduleIcon />
                </TouchableOpacity>
              </View>
            )}

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleApplyChanges}>
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

          <TouchableOpacity activeOpacity={0.8} style={styles.content} onPress={sendResetDayTimersData}>
            <Text style={styles.labelSchedule}>Сбросить все таймеры</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default TimerEditor;
