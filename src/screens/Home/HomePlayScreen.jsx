import React, {
  useState, useContext, useCallback, useEffect, useRef,
} from 'react';
import {
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector, useDispatch } from 'react-redux';
import {
  useSendParamsMutation, useUnitsGetDayTimersQuery, useGetTimersUnitQuery, useGetParamsQuery,
} from '../../redux/usersApi';

import { changeParams } from '../../redux/slices/currentControllerSlice';
import { changeTimersDay } from '../../redux/slices/timersDaySlice';
import { changeDaysTimer } from '../../redux/slices/daysTimerSlice';

import Loader from '../../components/Loader';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSuccess';
import ModalConnection from '../../components/ModalConnection';
import ModalNotControllers from '../../components/ModalNotControllers';

import { UserContext } from '../../components/providers/UserContext';

import HumidityModal from '../Modal/HumidityModal';
import ScheduleModal from '../Modal/ScheduleModal';
import SpeedModal from '../Modal/SpeedModal';
import AlisaModal from '../Modal/AlisaModal';

import ModeModal from '../Modal/ModeModal';
import DetailedInfoActive from './sections/DetailedInfoActive';
import { Temperature } from './sections/Temperature';
import { Controls } from './sections/Controls';
import ControlsInfo from './sections/ControlsInfo';

import { styles } from './HomePlayScreenStyle';

const dayMapping = {
  Пн: 1,
  Вт: 2,
  Ср: 3,
  Чт: 4,
  Пт: 5,
  Сб: 6,
  Вс: 0,
};

function HomePlayScreen({ navigation, route }) {
  const clickedControllerId = route?.params?.clickedControllerId ?? undefined;
  const { currentDayOfWeek } = useContext(UserContext);

  const {
    isLoading: isCurrentControllerParamsLoading,
  } = useGetParamsQuery({ controllerId: clickedControllerId });

  // const {
  //   data: timers,
  // } = useGetTimersUnitQuery({ controllerId: clickedControllerId, day: dayMapping[currentDayOfWeek] });

  // const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  // const timers = days.map(day =>
  //   useGetTimersUnitQuery({ controllerId: clickedControllerId, day: dayMapping[day] })
  // );

  if (!clickedControllerId || isCurrentControllerParamsLoading) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {(clickedControllerId !== undefined) ? (
        <HomePlayScreenActive
          navigation={navigation}
          clickedControllerId={clickedControllerId}
          // timers={timers}
          route={route}
        />
      ) : (
        <ModalNotControllers
          text="Вы не выбрали установку"
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
}

function HomePlayScreenActive({
  navigation, clickedControllerId, route,
}) {
  const flatListRef = useRef(null);

  const [index, setIndex] = useState(0);

  const [modalVisibleHumidity, setModalVisibleHumidity] = useState(false);
  const [modalVisibleSchedule, setModalVisibleSchedule] = useState(false);
  const [modalVisibleMode, setModalVisibleMode] = useState(false);
  const [modalVisibleSpeed, setModalVisibleSpeed] = useState(false);
  const [modalVisibleAlisa, setModalVisibleAlisa] = useState(false);

  const [statusError, setStatusError] = useState(false);
  const [speedSuccess, setSpeedSuccess] = useState(false);
  const [isConnection, setIsConnection] = useState(false);

  const [humTarget, setHumTarget] = useState(false);
  const [temperature, setTemperature] = useState(false);
  const [fanTarget, setFanTarget] = useState(false);
  const [resMode, setResMode] = useState(false);

  const [filteredEntries, setFilteredEntries] = useState()

  const [errorText, setErrorText] = useState('');
  const [connectionText, setConnectionText] = useState('');

  const [sendParams] = useSendParamsMutation();

  const dispatch = useDispatch();

  const { data: dayTimers } = useUnitsGetDayTimersQuery({ controllerId: clickedControllerId });

  const currentContoller = useSelector((state) => state.currentContoller);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Проверяем параметр fromHomeSchedule
      if (route.params?.fromHomeSchedule) {
        setModalVisibleSchedule(true);
      }
    });

    return unsubscribe;
  }, [navigation, route]);

  useEffect(() => {
    if (currentContoller?.params) {
      setHumTarget(currentContoller?.params?.humRoomTarget);
      setTemperature(currentContoller?.params?.tempTarget);
      setFanTarget(currentContoller?.params?.fanSpeedPTarget);
      setResMode(currentContoller.params?.res === 2057 ? 1 : currentContoller.params?.res);

      const entriesUnitParams = Object.entries(currentContoller?.params);

      const keyForRender = ['tempTarget', 'humRoomTarget', 'fanSpeedPTarget', 'res', 'ZagrFiltr', 'tempChannel'];

      const filteredEntriesData = entriesUnitParams.filter(([key]) => keyForRender.includes(key));

      setFilteredEntries(filteredEntriesData);
    }
  }, [currentContoller]);

  const scrollToIndex = (idx) => {
    if (idx === undefined || idx < 0 || idx >= filteredEntries?.length) {
      console.log(`Invalid index: ${idx}`);
      return;
    }
    if (flatListRef.current) {
      flatListRef.current?.scrollToIndex({ index: idx, animated: true });
      setIndex(idx)
    } else {
      console.log('FlatList ref is not defined yet.');
    }
  };

  const changeParamsHandler = useCallback((params) => dispatch(changeParams(params)), [dispatch]);
  const changeTimersDayHandler = useCallback((params) => dispatch(changeTimersDay(params)), [dispatch]);
  const changeDaysTimerHandler = useCallback((params) => dispatch(changeDaysTimer(params)), [dispatch]);

  const openModal = useCallback((itemName) => {
    if (itemName === 'humRoomTarget') {
      setModalVisibleHumidity(true);
    }
    if (itemName === 'res') {
      setModalVisibleMode(true);
    }
    if (itemName === 'fanSpeedPTarget') {
      setModalVisibleSpeed(true);
    }
    if (itemName === 'ZagrFiltr') {
      setModalVisibleSchedule(true);
    }

    if (itemName === 'tempChannel') {
      setModalVisibleAlisa(true);
    }
  }, []);

  const sendParamsOff = async () => {
    const params = {
      controllerId: clickedControllerId,
      start: '0',
    }
    try {
      await sendParams(params)
      setConnectionText('Устройство отключено');
      setIsConnection(true);

      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedControllerId },
      });
    } catch (error) {
      let errorMessage;
      if (error.data || error.data.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error) {
        errorMessage = error;
      }
      setErrorText(errorMessage);
      setStatusError(true);
    }
  }

  const sendParamsData = useCallback(async (params) => {
    try {
      await sendParams(params);
    } catch (error) {
      let errorMessage;
      if (error.data || error.data.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error) {
        errorMessage = error;
      }
      setErrorText(errorMessage);
      setStatusError(true);
    }
  }, [sendParams])

  return (
    <>
      {statusError
          && (
            <ModalError
              errorText={errorText}
              visible={!!statusError}
              onDismiss={() => setStatusError(null)}
            />
          )}

      {speedSuccess
          && (
            <ModalSuccess
              visible={!!speedSuccess}
              onDismiss={() => setSpeedSuccess(null)}
            />
          )}

      {isConnection
          && (
            <ModalConnection
              connectionText={connectionText}
              visible={!!isConnection}
              onDismiss={() => setIsConnection(null)}
            />
          )}
      {modalVisibleAlisa && (
        <AlisaModal
          modalVisible={modalVisibleAlisa}
          setModalVisible={setModalVisibleAlisa}
          scrollToIndex={scrollToIndex}
        />
      )}
      {modalVisibleSchedule && (
      <ScheduleModal
        modalVisible={modalVisibleSchedule}
        setModalVisible={setModalVisibleSchedule}
        unitId={clickedControllerId}
        dayTimers={dayTimers}
        scrollToIndex={scrollToIndex}
        changeTimersDayHandler={changeTimersDayHandler}
        changeDaysTimerHandler={changeDaysTimerHandler}
      />
      ) }
      {modalVisibleHumidity && (
      <HumidityModal
        modalVisible={modalVisibleHumidity}
        setModalVisible={setModalVisibleHumidity}
        sendParamsData={sendParamsData}
        // humTarget={currentContoller?.params?.humRoomTarget}
        humTarget={humTarget}
        unitId={clickedControllerId}
        changeParams={changeParamsHandler}
        scrollToIndex={scrollToIndex}
      />
      )}
      {modalVisibleMode && (
      <ModeModal
        modalVisible={modalVisibleMode}
        setModalVisible={setModalVisibleMode}
        sendParamsData={sendParamsData}
        // resMode={currentContoller?.params?.res}
        resMode={resMode}
        changeParams={changeParamsHandler}
        unitId={clickedControllerId}
        scrollToIndex={scrollToIndex}
      />
      )}

      {modalVisibleSpeed && (
      <SpeedModal
        // fanTarget={currentContoller?.params?.fanSpeedP}
        fanTarget={fanTarget}
        setModalVisibleSpeed={setModalVisibleSpeed}
        modalVisibleSpeed={modalVisibleSpeed}
        unitId={clickedControllerId}
        sendParamsData={sendParamsData}
        changeParams={changeParamsHandler}
        scrollToIndex={scrollToIndex}
      />
      )}
      <View style={styles.container}>
        <View style={styles.homePlayScreenActiveContainer}>
          {currentContoller?.params && (
          <>
              {filteredEntries?.length && (
              <>
                <View style={styles.flatListContainerHome}>
                  <Controls
                    {...currentContoller}
                    entriesUnitParams={filteredEntries}
                    openModal={openModal}
                    sendParamsOff={sendParamsOff}
                  />
                </View>
                <View style={styles.flatListContainerHome}>
                  <ControlsInfo
                    {...currentContoller}
                    temperature={temperature}
                    filteredEntries={filteredEntries}
                    // timers={timers}
                    navigation={navigation}
                    flatListRef={flatListRef}
                    indexActive={index}
                  />
                </View>
              </>
              )}
            <Temperature
              style={{ flexGrow: 1 }}
              {...currentContoller}
              temperature={temperature}
              sendParamsData={sendParamsData}
              changeParams={changeParamsHandler}
              scrollToIndex={scrollToIndex}
            />

            <DetailedInfoActive currentContoller={currentContoller} style={{ marginTop: 'auto' }} />
          </>
          )}
        </View>
      </View>
    </>
  );
}

export default HomePlayScreen;
