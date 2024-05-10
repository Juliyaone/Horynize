import React, {
  useState, useContext, useCallback, useEffect, useRef,
} from 'react';
import {
  View, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useSelector, useDispatch } from 'react-redux';
import {
  useSendParamsMutation, useGetTimersUnitAllMutation, useGetParamsQuery, useGetUserTokensQuery,
} from '../../redux/usersApi';

import { changeParams } from '../../redux/slices/currentControllerSlice';

import Loader from '../../components/Loader';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSuccess';
import ModalConnection from '../../components/ModalConnection';
import ModalLoader from '../../components/ModalLoader';

import ModalNotControllers from '../../components/ModalNotControllers';
import DefaultRadialSlider from '../../components/DefaultRadialSlider';
import HumidityModal from '../Modal/HumidityModal';
import SpeedModal from '../Modal/SpeedModal';
import AlisaModal from '../Modal/AlisaModal';
import DeleteUnitModal from '../Modal/DeleteUnitModal';
import TimersModal from '../Modal/TimersModal';
import TurningOnModal from '../Modal/TurningOnModal';
import ModalComandsError from '../../components/ModalComandsError';

import ModeModal from '../Modal/ModeModal';

import DetailedInfoActive from './sections/DetailedInfoActive';
import { Controls } from './sections/Controls';
import ControlsInfo from './sections/ControlsInfo';

import { styles } from './HomePlayScreenStyle';
import { AuthContext } from '../../components/providers/AuthContext';

function HomePlayScreen({ navigation, route }) {
  const clickedControllerId = route?.params?.clickedControllerId ?? undefined;
  const name = route?.params?.name ?? undefined;

  console.log('name', name);

  const dispatch = useDispatch();

  const { userId, userControllers } = useContext(AuthContext);

  const [getTimersUnitAll, { isLoading: isLoaderGetTimersUnitAll }] = useGetTimersUnitAllMutation();

  const { data: tokensForAssistants, isLoading: isLoadingtokensForAssistants, refetch: refetchTokensForAssistants } = useGetUserTokensQuery({ userId: String(userId) });

  useEffect(() => {
    refetchTokensForAssistants();
  }, [refetchTokensForAssistants])

  useEffect(() => {
    getTimersUnitAll({ controllerId: clickedControllerId, day: 0 });
    getTimersUnitAll({ controllerId: clickedControllerId, day: 1 });
    getTimersUnitAll({ controllerId: clickedControllerId, day: 2 });
    getTimersUnitAll({ controllerId: clickedControllerId, day: 3 });
    getTimersUnitAll({ controllerId: clickedControllerId, day: 4 });
    getTimersUnitAll({ controllerId: clickedControllerId, day: 5 });
    getTimersUnitAll({ controllerId: clickedControllerId, day: 6 });
  }, [clickedControllerId, getTimersUnitAll])

  if (!clickedControllerId || isLoadingtokensForAssistants || isLoaderGetTimersUnitAll) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {(clickedControllerId !== undefined && userControllers.length > 0) ? (
        <HomePlayScreenActive
          navigation={navigation}
          tokensForAssistants={tokensForAssistants}
          clickedControllerId={clickedControllerId}
          route={route}
          name={name}
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
  navigation, clickedControllerId, tokensForAssistants, route, name,
}) {
  const flatListRef = useRef(null);

  console.log('route', route);

  const [index, setIndex] = useState(0);
  const [showTurningOnModal, setShowTurningOnModal] = useState(false);

  const [modalVisibleHumidity, setModalVisibleHumidity] = useState(false);
  const [modalVisibleTimers, setModalVisibleTimers] = useState(false);
  const [modalVisibleMode, setModalVisibleMode] = useState(false);
  const [modalVisibleSpeed, setModalVisibleSpeed] = useState(false);
  const [modalVisibleAlisa, setModalVisibleAlisa] = useState(false);
  const [modalVisibleDeleteUnit, setModalVisibleDeleteUnit] = useState(false);

  const [statusError, setStatusError] = useState(false);
  const [statusErrorCommands, setStatusErrorCommands] = useState(false);

  const [speedSuccess, setSpeedSuccess] = useState(false);
  const [isConnection, setIsConnection] = useState(false);

  const [humTarget, setHumTarget] = useState(false);
  const [temperature, setTemperature] = useState(false);
  const [fanTarget, setFanTarget] = useState(false);
  const [resMode, setResMode] = useState(false);
  const [avalibleMode, setAvalibleMode] = useState(false);
  const [currentContollerData, serCurrentContollerData] = useState();

  const [filteredEntries, setFilteredEntries] = useState()

  const [errorText, setErrorText] = useState('');
  const [connectionText, setConnectionText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    data: currentParams,
    refetch: refetchCurrentParams,
  } = useGetParamsQuery({ controllerId: clickedControllerId });

  // console.log('currentParams', currentParams);

  const [sendParams] = useSendParamsMutation();

  const dispatch = useDispatch();

  const currentContoller = useSelector((state) => state.currentContoller);

  useEffect(() => {
    if (currentContoller?.params) {
      setHumTarget(currentContoller?.params?.humRoomTarget);
      setTemperature(currentContoller?.params?.tempTarget);
      setFanTarget(currentContoller?.params?.fanSpeedPTarget);
      setResMode(currentContoller.params?.res === 2057 ? 1 : currentContoller.params?.res);
      setAvalibleMode(currentContoller.params?.avalibleMode === 2057 ? 1 : currentContoller.params?.avalibleMode);
      serCurrentContollerData(currentContoller.id);

      const entriesUnitParams = Object.entries(currentContoller?.params);

      const keyForRender = ['tempTarget', 'humRoomTarget', 'fanSpeedPTarget', 'res', 'ZagrFiltr', 'tempChannel', 'co2RoomTarget'];

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
      setModalVisibleTimers(true);
    }
    if (itemName === 'tempChannel') {
      setModalVisibleAlisa(true);
    }
    if (itemName === 'co2RoomTarget') {
      setModalVisibleDeleteUnit(true);
    }
  }, []);

  // Функция для отправки команды "Выключить"

  const sendParamsOff = async () => {
    const params = {
      controllerId: clickedControllerId,
      start: '0',
    }
    try {
      const resOff = await sendParams(params);

      if (resOff.data && resOff.data.error) {
        setStatusErrorCommands(true);
        await refetchCurrentParams();
        return
      }
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('HomeStack', { screen: 'Home', params: { clickedControllerId } });
      }, 7000);
    } catch (error) {
      setStatusErrorCommands(true);
      await refetchCurrentParams();
    }
  };

  const sendParamsData = useCallback(async (params) => {
    try {
      const res = await sendParams(params);
      if (res.data && res.data.error) {
        setStatusErrorCommands(true);
        await refetchCurrentParams();
      }
    } catch (error) {
      setStatusErrorCommands(true);
      await refetchCurrentParams();
    }
  }, [refetchCurrentParams, sendParams]);

  const isDisabled = Number(currentContoller?.params?.res) === 1;

  return (
    <>
      <ModalLoader
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        text="Выключаю..."
      />

      <TurningOnModal
        visible={showTurningOnModal}
        onClose={() => setShowTurningOnModal(false)}
        text="Выключаю..."
      />

      <ModalComandsError
        visible={statusErrorCommands}
        onClose={() => setStatusErrorCommands(false)}
        text="Команда не доставлена, попробуйте еще раз"
      />

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
            setStatusErrorCommands={setStatusErrorCommands}

          />
        )}
      {modalVisibleAlisa && (
        <AlisaModal
          modalVisible={modalVisibleAlisa}
          setModalVisible={setModalVisibleAlisa}
          scrollToIndex={scrollToIndex}
        />
      )}

      {modalVisibleTimers && (
        <TimersModal
          modalVisible={modalVisibleTimers}
          setModalVisible={setModalVisibleTimers}
          unitId={clickedControllerId}
          scrollToIndex={scrollToIndex}
        />
      )}

      {modalVisibleHumidity && (
        <HumidityModal
          modalVisible={modalVisibleHumidity}
          setModalVisible={setModalVisibleHumidity}
          sendParamsData={sendParamsData}
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
          resMode={resMode}
          avalibleMode={avalibleMode}
          changeParams={changeParamsHandler}
          unitId={clickedControllerId}
          scrollToIndex={scrollToIndex}
        />
      )}

      {modalVisibleSpeed && (
        <SpeedModal
          fanTarget={fanTarget}
          setModalVisibleSpeed={setModalVisibleSpeed}
          modalVisibleSpeed={modalVisibleSpeed}
          unitId={clickedControllerId}
          sendParamsData={sendParamsData}
          changeParams={changeParamsHandler}
          scrollToIndex={scrollToIndex}
        />
      )}
      {modalVisibleDeleteUnit && (
        <DeleteUnitModal
          navigation={navigation}
          modalVisible={modalVisibleDeleteUnit}
          setModalVisible={setModalVisibleDeleteUnit}
          sendParamsData={sendParamsData}
          humTarget={humTarget}
          unitId={clickedControllerId}
          changeParams={changeParamsHandler}
          scrollToIndex={scrollToIndex}
        />
      )}
      <View style={styles.container}>
        <View style={styles.homePlayScreenActiveContainer}>
          <Text>
            {name}
          </Text>
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
                      tokensForAssistants={tokensForAssistants}
                      filteredEntries={filteredEntries}
                      navigation={navigation}
                      flatListRef={flatListRef}
                      indexActive={index}
                    />
                  </View>
                </>
              )}
              <View style={{ width: '100%', height: '40%' }}>
                <View style={[isDisabled ? styles.disabledContainer : null, styles.fullSize]}>
                  <DefaultRadialSlider
                    style={{ flexGrow: 1 }}
                    sendParamsData={sendParamsData}
                    changeParams={changeParamsHandler}
                    currentContollerData={currentContollerData}
                    temperature={temperature}
                    scrollToIndex={scrollToIndex}
                    currentParams={currentParams}
                  />
                </View>
              </View>

              <DetailedInfoActive currentContoller={currentContoller} style={{ marginTop: 'auto' }} />
            </>
          )}
        </View>
      </View>
    </>
  );
}

export default HomePlayScreen;
