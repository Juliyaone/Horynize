import React, {
  useState, useContext, useCallback, useMemo, useEffect,
} from 'react';
import {
  View, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector, useDispatch } from 'react-redux';
import {
  useSendParamsMutation, useUnitsGetDayTimersQuery, useGetTimersUnitQuery, useGetParamsQuery,
} from '../../redux/usersApi';

import { changeParams } from '../../redux/slices/currentControllerSlice';

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
// import { DetailedInfo } from './sections/DetailedInfo';
import { Temperature } from './sections/Temperature';
import { Controls } from './sections/Controls';
import { ControlsInfo } from './sections/ControlsInfo';

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
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);
  const clickedControllerId = route?.params?.clickedControllerId ?? undefined;
  // console.log('clickedControllerId', clickedControllerId);
  console.log('isScrollEnabled', isScrollEnabled);

  if (!clickedControllerId) {
    return <Loader />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView scrollEnabled={isScrollEnabled}>
        {clickedControllerId !== undefined && clickedControllerId !== null ? (
          <HomePlayScreenActive
            navigation={navigation}
            clickedControllerId={clickedControllerId}
            setIsScrollEnabled={setIsScrollEnabled}
          />
        ) : (
          <ModalNotControllers
            text="Вы не выбрали установку"
            navigation={navigation}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function HomePlayScreenActive({ navigation, clickedControllerId, setIsScrollEnabled }) {
  const { currentDayOfWeek } = useContext(UserContext);

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

  const [errorText, setErrorText] = useState('');
  const [connectionText, setConnectionText] = useState('');
  const [sendParams] = useSendParamsMutation();

  const dispatch = useDispatch();

  const { data: dayTimers } = useUnitsGetDayTimersQuery({ controllerId: clickedControllerId });
  const {
    data: timers,
  } = useGetTimersUnitQuery({ controllerId: clickedControllerId, day: dayMapping?.[currentDayOfWeek] });

  const {
    isLoading: isCurrentControllerParamsLoading,
  } = useGetParamsQuery({ controllerId: clickedControllerId });

  const currentContoller = useSelector((state) => state.currentContoller);

  const entriesUnitParams = useMemo(() => Object.entries(currentContoller?.params ?? {}), [currentContoller]);

  useEffect(() => {
    if (currentContoller?.params) {
      setHumTarget(currentContoller?.params?.humRoomTarget);
      setTemperature(currentContoller?.params?.tempTarget);
      setFanTarget(currentContoller?.params?.fanSpeedPTarget);
      setResMode(currentContoller.params?.res);
    }
  }, [currentContoller]);

  const changeParamsHandler = useCallback((params) => dispatch(changeParams(params)), [dispatch]);

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
      // await sendParams(params)
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
        />
      )}
      {modalVisibleSchedule && (
      <ScheduleModal
        modalVisible={modalVisibleSchedule}
        setModalVisible={setModalVisibleSchedule}
        unitId={clickedControllerId}
        dayTimers={dayTimers}
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
      />
      )}
      <View style={styles.container}>
        {currentContoller?.params && (
          <>
            {entriesUnitParams?.length && (
              <>
                <View style={styles.flatListContainerHome}>
                  <Controls
                    {...currentContoller}
                    entriesUnitParams={entriesUnitParams}
                    openModal={openModal}
                    sendParamsOff={sendParamsOff}
                  />
                </View>
                <View style={styles.flatListContainerHome}>
                  <ControlsInfo
                    {...currentContoller}
                    temperature={temperature}
                    entriesUnitParams={entriesUnitParams}
                    timers={timers}
                    navigation={navigation}
                  />
                </View>
              </>
            )}
            <Temperature
              {...currentContoller}
              temperature={temperature}
              sendParamsData={sendParamsData}
              changeParams={changeParamsHandler}
              setIsScrollEnabled={setIsScrollEnabled}
            />
            {/* <DetailedInfo {...currentContoller} /> */}
          </>
        )}
      </View>
    </>
  );
}

export default HomePlayScreen;
