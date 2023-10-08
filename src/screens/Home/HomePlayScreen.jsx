import React, {
  useEffect, useState, useContext, useCallback, useMemo,
} from 'react';
import {
  View, Text, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector } from 'react-redux';
import {
  useSendParamsMutation, useUnitsGetDayTimersQuery, useGetTimersUnitQuery, useGetParamsQuery,
} from '../../redux/usersApi';

import Loader from '../../components/Loader';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSuccess';
import ModalConnection from '../../components/ModalConnection';

import { UserContext } from '../../components/providers/UserContext';

import HumidityModal from '../Modal/HumidityModal';
import ScheduleModal from '../Modal/ScheduleModal';
import SpeedModal from '../Modal/SpeedModal';

import ModeModal from '../Modal/ModeModal';
import { DetailedInfo } from './sections/DetailedInfo';
import { Temperature } from './sections/Temperature';
import { Controls } from './sections/Controls';
import { ControlsInfo } from './sections/ControlsInfo';

import { styles } from './HomePlayScreenStyle';

function HomePlayScreen({ navigation, route }) {
  const clickedControllerId = route?.params?.clickedControllerId ?? undefined;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {clickedControllerId !== undefined && clickedControllerId !== null ? (
          <HomePlayScreenActive
            navigation={navigation}
            clickedControllerId={clickedControllerId}
          />
        ) : <Text>Вы не выбрали установку</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

function HomePlayScreenActive({ navigation, clickedControllerId }) {
  const { currentDayOfWeek } = useContext(UserContext);

  const [modalVisibleHumidity, setModalVisibleHumidity] = useState(false);
  const [modalVisibleSchedule, setModalVisibleSchedule] = useState(false);
  const [modalVisibleMode, setModalVisibleMode] = useState(false);
  const [modalVisibleSpeed, setModalVisibleSpeed] = useState(false);

  const [humTarget, setHumTarget] = useState(0);
  const [temperature, setTemperature] = useState();
  const [fanTarget, setFanTarget] = useState();
  const [resMode, setResMode] = useState();

  const [statusError, setStatusError] = useState(false);
  const [speedSuccess, setSpeedSuccess] = useState(false);
  const [isConnection, setIsConnection] = useState(false);

  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [connectionText, setConnectionText] = useState('');
  const [sendParams] = useSendParamsMutation();
  const dayMapping = {
    Пн: 1,
    Вт: 2,
    Ср: 3,
    Чт: 4,
    Пт: 5,
    Сб: 6,
    Вс: 0,
  };
  const { data: dayTimers } = useUnitsGetDayTimersQuery({ controllerId: clickedControllerId });
  const {
    data: timers,
  } = useGetTimersUnitQuery({ controllerId: clickedControllerId, day: dayMapping?.[currentDayOfWeek] });

  const {
    isLoading: isCurrentControllerParamsLoading,
    refetch,
  } = useGetParamsQuery({ controllerId: clickedControllerId });

  const currentContoller = useSelector((state) => state.currentContoller);

  const entriesUnitParams = useMemo(() => Object.entries(currentContoller?.params ?? {}), [currentContoller]);

  useEffect(() => {
    if (currentContoller?.params) {
      setHumTarget(currentContoller?.params?.humRoomTarget);
      setTemperature(currentContoller?.params?.tempTarget);
      setFanTarget(currentContoller?.params?.fanSpeedP);
      setResMode(currentContoller.params?.res);
    }
  }, [currentContoller])

  const openModal = useCallback((itemName) => {
    if (itemName === 'humRoomTarget') {
      setModalVisibleHumidity(true);
    }
    if (itemName === 'res') {
      setModalVisibleMode(true);
    }
    if (itemName === 'fanSpeedP') {
      setModalVisibleSpeed(true);
    }
    if (itemName === 'ZagrFiltr') {
      setModalVisibleSchedule(true);
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
      await refetch();
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
  }, [refetch, sendParams])

  if (isCurrentControllerParamsLoading) {
    return <Loader />;
  }

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
              successText={successText}
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
        humTarget={humTarget}
        unitId={clickedControllerId}
      />
      )}
      {modalVisibleMode && (
      <ModeModal
        modalVisible={modalVisibleMode}
        setModalVisible={setModalVisibleMode}
        sendParamsData={sendParamsData}
        resMode={resMode}
        setResMode={setResMode}
        unitId={clickedControllerId}
      />
      )}

      {modalVisibleSpeed && (
      <SpeedModal
        fanTarget={fanTarget}
        setModalVisibleSpeed={setModalVisibleSpeed}
        modalVisibleSpeed={modalVisibleSpeed}
        unitId={clickedControllerId}
        sendParamsData={sendParamsData}
      />
      )}
      <View style={styles.container}>
        {currentContoller.params && (
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
                    entriesUnitParams={entriesUnitParams}
                    timers={timers}
                    navigation={navigation}
                    humTarget={humTarget}
                    temperature={temperature}
                    fanTarget={fanTarget}
                    resMode={resMode}
                  />
                </View>
              </>
            )}
            <Temperature
              {...currentContoller}
              sendParams={sendParams}
              setTemperature={setTemperature}
              temperature={temperature}
            />
            <DetailedInfo {...currentContoller} />
          </>
        )}
      </View>
    </>
  );
}

export default HomePlayScreen;
