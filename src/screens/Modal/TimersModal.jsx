import React, { useReducer, useRef } from 'react';
import {
  View, Text, Modal, TouchableOpacity, PanResponder, Image,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import ApplyIcon from '../../img/icons/apply';
import Loader from '../../components/Loader';
import SpeedActiveIcon from '../../img/fan.png';

import TimerEditor from './TimerEditor';
import { styles } from './styles/ScheduleModalStyle';

// Исходное состояние
const initialStateLocal = {
  modalVisibleTimerEditor: false,
  selectedDays: [],
};

// Редьюсер
function scheduleReducer(stateLocal, action) {
  switch (action.type) {
    case 'SET_MODAL_TIMER_EDITOR':
      return { ...stateLocal, modalVisibleTimerEditor: action.payload };
    default:
      return stateLocal;
  }
}

function TimersModal({
  modalVisible,
  setModalVisible,
  unitId,
}) {
  const [stateLocal, dispatch] = useReducer(scheduleReducer, initialStateLocal);

  const timersAllDaysState = useSelector((state) => state.timersAllDays.timersAllDays);

  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  // Закрываем модальное окно жестом вниз
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

  if (!timersAllDaysState) {
    return <Loader />;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      {stateLocal.modalVisibleTimerEditor && (
        <TimerEditor
          modalVisibleTimerEditor={stateLocal.modalVisibleTimerEditor}
          setModalVisibleTimerEditor={(isVisible) => dispatch({ type: 'SET_MODAL_TIMER_EDITOR', payload: isVisible })}
          unitId={unitId}
        />
      )}

      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Установленные таймеры</Text>

          <View style={styles.boxDaysContainers}>
            {daysOfWeek.map((day, index) => {
              const timersForDay = timersAllDaysState[index] || [];

              // Фильтруем таймеры, чтобы исключить те, у которых время с '00:00' до '00:00'
              const filteredTimers = timersForDay.filter((timer) => timer.time !== '00:00');

              // Если после фильтрации таймеров не осталось, не отображаем этот день
              if (filteredTimers.length === 0) {
                return (
                  <View key={`${day}${index}`} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10 }}>
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold' }}>{day} </Text>
                    <Text style={styles.autoRunHeader}> Нет таймеров</Text>
                  </View>
                );
              }

              // Объединяем таймеры в пары для отображения
              const timerPairs = [];
              for (let i = 0; i < timersForDay.length; i += 2) {
                const startTimer = timersForDay[i];
                const endTimer = timersForDay[i + 1];
                if (startTimer && endTimer) {
                  timerPairs.push({ start: startTimer, end: endTimer });
                }
              }

              return (
                <View
                  key={day}
                  style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
                  }}
                >
                  <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: 'bold', flex: 1 }}>{day}</Text>
                  <View style={{ flex: 4, flexDirection: 'column', justifyContent: 'center' }}>
                    {/* Если нет пар таймеров, отображаем сообщение "Нет таймеров" */}
                    {timerPairs.length === 0 && <Text style={{ textAlign: 'center' }}>Нет таймеров</Text>}

                    {/* Отображение пар таймеров */}
                    {timerPairs.map((pair, idx) => (
                      <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                        <Text style={{ textAlign: 'center', flex: 2 }}>
                          {pair.start.time !== '00:00' || pair.end.time !== '00:00' ? `с: ${pair.start.time} до: ${pair.end.time}` : 'Нет таймеров'}
                        </Text>

                        <Text style={{ textAlign: 'center', flex: 1 }}>
                          {pair.start.tempTarget}
                          °C
                        </Text>

                        <View style={{
                          flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1,
                        }}
                        >
                          <Image source={SpeedActiveIcon} style={{ width: 20, height: 20 }} />
                          <Text style={{ marginLeft: 5 }}>
                            {pair.end.fanSpeed === 255 ? 'OFF' : pair.end.fanSpeed}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              );
            })}
          </View>

          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => dispatch({ type: 'SET_MODAL_TIMER_EDITOR', payload: true })}>
            <LinearGradient colors={['#FEB84A', '#FF5204']} style={styles.gradientBackground}>
              <View style={styles.content}>
                <ApplyIcon style={styles.icon} />
                <Text style={styles.text}>Редактировать</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default TimersModal;
