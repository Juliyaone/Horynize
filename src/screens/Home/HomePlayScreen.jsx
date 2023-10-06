import React, {
  useEffect, useState, useContext, useCallback,
} from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import {
  useSendParamsMutation, useUnitsGetDayTimersQuery, useGetTimersUnitQuery, useGetParamsQuery,
} from '../../redux/usersApi';

import PowerBtnActiveIcon from '../../img/icons/powerBtnActive';
import Loader from '../../components/Loader';
import ModalError from '../../components/ModalError';
import ModalSuccess from '../../components/ModalSuccess';
import ModalConnection from '../../components/ModalConnection';

import DefaultRadialSlider from '../../components/DefaultRadialSlider';

import TemperatureIcon from '../../img/temperature.png';
import HumidityIcon from '../../img/humidity.png';
import SpeedIcon from '../../img/speed.png';
import ModeIcon from '../../img/mode.png';
import TimerIcon from '../../img/timer.png';
import SettingsIcon from '../../img/icons/settings';

import TemperatureActiveIcon from '../../img/temperature-active.png';
import HumidityActiveIcon from '../../img/humidity-active.png';
import SpeedActiveIcon from '../../img/speed-active.png';
import ModeActiveIcon from '../../img/modeActive.png';
import TimerActiveIcon from '../../img/timerActive.png';

import { UserContext } from '../../components/providers/UserContext';
import { AuthContext } from '../../components/providers/AuthContext';

import TimeIcon from '../../img/icons/time';

import HumidityModal from '../Modal/HumidityModal';
import ScheduleModal from '../Modal/ScheduleModal';
import SpeedModal from '../Modal/SpeedModal';

import ModeModal from '../Modal/ModeModal';

import { styles } from './HomePlayScreenStyle';

function HomePlayScreen({ navigation, route }) {
  const { clickedDevice } = route.params;
  const { currentDayOfWeek } = useContext(UserContext);

  const { unitId } = useContext(AuthContext);

  const [modalVisibleHumidity, setModalVisibleHumidity] = useState(false);
  const [modalVisibleSchedule, setModalVisibleSchedule] = useState(false);
  const [modalVisibleMode, setModalVisibleMode] = useState(false);
  const [modalVisibleSpeed, setModalVisibleSpeed] = useState(false);

  const [humTarget, setHumTarget] = useState('');
  const [temperature, setTemperature] = useState();
  const [fanTarget, setFanTarget] = useState();
  const [resMode, setResMode] = useState('0');

  const [statusError, setStatusError] = useState(false);
  const [speedSuccess, setSpeedSuccess] = useState(false);
  const [isConnection, setIsConnection] = useState(false);

  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [connectionText, setConnectionText] = useState('');

  const [refresh, setRefresh] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [entriesUnitParams, setEntriesUnitParams] = useState();
  const [sendParams, { isLoading }] = useSendParamsMutation();
  const dayMapping = {
    Пн: 1,
    Вт: 2,
    Ср: 3,
    Чт: 4,
    Пт: 5,
    Сб: 6,
    Вс: 0,
  };
  const { data: dayTimers } = useUnitsGetDayTimersQuery({ controllerId: unitId });
  const {
    data: timers,
  } = useGetTimersUnitQuery({ controllerId: unitId, day: dayMapping[currentDayOfWeek] });

  const {
    data: unitParams,
    error: errorunitParamsDevices,
    refetch: refetchUnitParams,
  } = useGetParamsQuery({ controllerId: unitId });

  const handleDisabled = (res) => {
    if (res == '1') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }

  useEffect(() => {
    setHumTarget(unitParams?.data[0].humRoomTarget);
    setTemperature(unitParams?.data[0].tempTarget);
    setFanTarget(unitParams?.data[0].fanSpeedP);
    setResMode(unitParams?.data[0].res);
    handleDisabled(resMode);

    setEntriesUnitParams(Object.entries(unitParams?.data[0]));
  }, [resMode, unitParams])

  const FunctionsIconSmall = {
    tempTarget: TemperatureActiveIcon,
    humRoomTarget: HumidityActiveIcon,
    fanSpeedP: SpeedActiveIcon,
    res: ModeIcon,
    ZagrFiltr: TimerIcon,
  };

  const FunctionsIcon = {
    tempTarget: TemperatureIcon,
    humRoomTarget: HumidityIcon,
    fanSpeedP: SpeedIcon,
    res: ModeActiveIcon,
    ZagrFiltr: TimerActiveIcon,
  };

  const openModal = (itemName) => {
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
  };

  const renderItemSmall = ({ item, index }) => {
    const keyForRenderSmall = ['tempTarget', 'humRoomTarget', 'fanSpeedP', 'res', 'ZagrFiltr'];
    if (!keyForRenderSmall.includes(item[0])) {
      return null;
    }

    const imageSrc = FunctionsIconSmall[item[0]];

    return (
      <TouchableOpacity
        style={[
          styles.boxFunctionDevicesSmall,
          index !== Object.entries(unitParams?.data[0]).length - 1 && styles.itemMargin,
        ]}
        onPress={() => openModal(item[0])}
      >
        <Image source={imageSrc} style={{ width: 30, height: 30 }} />
        {(item[0] === 'tempTarget') && <Text style={styles.boxPowerBtnTextNameSmall}>Температура</Text>}
        {(item[0] === 'humRoomTarget') && <Text style={styles.boxPowerBtnTextNameSmall}>Влажность</Text>}
        {(item[0] === 'fanSpeedP') && <Text style={styles.boxPowerBtnTextNameSmall}>Скорость вращения</Text>}
        {(item[0] === 'res') && <Text style={styles.boxPowerBtnTextNameSmall}>Режим</Text>}
        {(item[0] === 'ZagrFiltr') && <Text style={styles.boxPowerBtnTextNameSmall}>Автозапуск</Text>}
      </TouchableOpacity>
    )
  };
  const handleSettings = () => {
    if (unitId) {
      navigation.navigate('HomeStack', { screen: 'HomeSchedule', params: { unitId } });
    }
  };

  const renderItem = ({ item, index }) => {
    const keyForRender = ['tempTarget', 'humRoomTarget', 'fanSpeedP', 'res', 'ZagrFiltr'];

    if (!keyForRender.includes(item[0])) {
      return null;
    }
    const imageSrc = FunctionsIcon[item[0]];

    const resNames = {
      0: 'Не установлен',
      1: 'Вентиляция',
      2: 'Нагрев',
      3: 'Охлаждение',
      4: 'Климат-контроль',
    };

    return (
      <View
        style={[
          styles.boxFunctionDevices,
          index !== Object.entries(unitParams?.data[0]).length - 1 && styles.itemMargin,
        ]}
      >
        <View style={styles.boxIconSettings}>
          <LinearGradient
            colors={['#FEB84A', '#FF5204']}
            style={{
              borderRadius: 8, width: 40, height: 40, marginBottom: 5, alignItems: 'center', justifyContent: 'center',
            }}
          >
            <View style={styles.functionDevicesBtn}>
              <Image source={imageSrc} style={{ width: 30, height: 30 }} />
            </View>
          </LinearGradient>

          {item[0] === 'ZagrFiltr'
          && (
          <TouchableOpacity onPress={handleSettings}>
            <SettingsIcon />
          </TouchableOpacity>
          )}
        </View>

        {(item[0] === 'tempTarget') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Температура</Text>
            <Text style={styles.boxPowerBtnText}>
              {temperature}
              °
            </Text>
          </>
        )}

        {(item[0] === 'humRoomTarget') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Влажность</Text>
            <Text style={styles.boxPowerBtnText}>
              {humTarget}
              %
            </Text>
          </>
        )}

        {(item[0] === 'fanSpeedP') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Скорость</Text>
            <Text style={styles.boxPowerBtnText}>{fanTarget}</Text>
          </>
        )}

        {(item[0] === 'res') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Режим</Text>
            <Text style={styles.boxPowerBtnText}>{(resMode != '0') ? resNames[resMode] : 'Не выбрано'}</Text>
          </>
        )}

        {(item[0] === 'ZagrFiltr') && (
          <>
            <Text style={styles.boxPowerBtnTextName}>Автозапуск</Text>

            {timers?.timers && (
              <>
                <View style={styles.boxPowerBtnTextBox}>
                  <Text style={styles.boxPowerBtnText}>{timers?.timers[0].time}</Text>
                </View>
                {timers?.timers[1].fanSpeed === '255' && (
                  <>
                    <Text style={styles.boxPowerBtnText}>до</Text>
                    <View style={styles.boxPowerBtnTextBox}>
                      <Text style={styles.boxPowerBtnText}>{timers?.timers[1].time}</Text>
                    </View>

                  </>
                )}
              </>
            )}
          </>
        )}

      </View>
    )
  };

  // const sendParamsHum = async () => {
  //   setModalVisibleHumidity(false);

  //   const data = {
  //     controllerId: unitId,
  //     CO2Target: '0',
  //     HumTarget: humTarget,
  //   }
  //   try {
  //     const answerHum = await sendParams(data);
  //     await refetchUnitParams();
  //     setRefresh(!refresh);

  //     if (answerHum.data && answerHum.data[0]) {
  //       setHumTarget(answerHum.data)
  //     }
  //     setModalVisibleHumidity(false);
  //     setSuccessText('Данные изменены');
  //     setSpeedSuccess(true);
  //   } catch (error) {
  //     // console.log('error', error);
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
  //     setErrorText(errorMessage);
  //     setStatusError(true);
  //   }
  // }

  const sendParamsOff = async () => {
    // refetchUnitParams();

    const params = {
      controllerId: unitId,
      start: '0',
    }
    try {
      const answer = await sendParams(params)
      // console.log('answerHomePlay', answer);

      setConnectionText('Устройство отключено');
      setIsConnection(true);
      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedDevice: unitId },
      });
    } catch (error) {
      console.log('error', error);
      let errorMessage;
      if (error.data || error.data.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.data) {
        errorMessage = error.data;
      } else if (error) {
        errorMessage = error;
      }
      setErrorText(errorMessage);
      setStatusError(true);
    }
  }

  const sendParamsTemperature = async (newTemperature) => {
    const data = {
      controllerId: unitId,
      tempTarget: String(newTemperature),
    }
    try {
      const answerTemperature = await sendParams(data);
      // console.log('answerTemperature', answerTemperature);
      await refetchUnitParams();
      // setRefresh(!refresh); // Обновляем состояние только после выполнения refetch

      // if (answerTemperature.data && answerTemperature.data.data[0]) {
      //   setTemperature(answerTemperature.data.data[0].tempTarget);
      // }

      // setSuccessText('Данные изменены');
      // setSpeedSuccess(true);
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

      // setErrorText(errorMessage);

      // setStatusError(true);
    }
  }

  const sendParamsData = useCallback(async (params) => {
    try {
      console.log(params, 'params')
      await sendParams(params);
      await refetchUnitParams();
    } catch (error) {
      let errorMessage;
      if (error.data || error.data.message) {
        errorMessage = error.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      } else if (error.data) {
        errorMessage = error.data;
      } else if (error) {
        errorMessage = error;
      }
      setErrorText(errorMessage);
      setStatusError(true);
    }
  }, [refetchUnitParams, sendParams])

  const renderBoxPowerBtn = () => (
    <View style={styles.boxPowerBtnBoxSmall}>
      <TouchableOpacity style={styles.powerBtnSmall} onPress={sendParamsOff}>
        <PowerBtnActiveIcon />
        <Text style={styles.boxPowerBtnTextSmall}>Питание</Text>
      </TouchableOpacity>
    </View>
  )

  if (errorunitParamsDevices) {
    console.log(errorunitParamsDevices, errorunitParamsDevices);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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

        <ScheduleModal
          modalVisible={modalVisibleSchedule}
          setModalVisible={setModalVisibleSchedule}
          unitId={unitId}
          dayTimers={dayTimers}
        />

        <HumidityModal
          modalVisible={modalVisibleHumidity}
          setModalVisible={setModalVisibleHumidity}
          sendParamsData={sendParamsData}
          humTarget={humTarget}
          unitId={unitId}
        />

        <ModeModal
          modalVisible={modalVisibleMode}
          setModalVisible={setModalVisibleMode}
          sendParamsData={sendParamsData}
          unitParams={unitParams}
          resMode={resMode}
          setResMode={setResMode}
          unitId={unitId}
        />

        {modalVisibleSpeed && (
          <SpeedModal
            fanTarget={fanTarget}
            setModalVisibleSpeed={setModalVisibleSpeed}
            modalVisibleSpeed={modalVisibleSpeed}
            unitId={unitId}
            sendParamsData={sendParamsData}
          />
        )}
        {clickedDevice ? (
          <View style={styles.container}>

            <View style={styles.flatListContainerHome}>
              {unitParams ? (
                <FlatList
                  data={entriesUnitParams}
                  extraData={refresh}
                  keyExtractor={(item) => item[0]}
                  renderItem={renderItemSmall}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  estimatedItemSize={33}
                  ListHeaderComponent={renderBoxPowerBtn}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View>
                  <Loader />
                </View>
              )}
            </View>

            <View style={styles.flatListContainerHome}>
              {unitParams ? (

                <FlatList
                  data={entriesUnitParams}
                  extraData={refresh}
                  keyExtractor={(item) => item[0]}
                  renderItem={renderItem}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  estimatedItemSize={33}
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <View>
                  <Loader />
                </View>
              )}
            </View>

            <View style={isDisabled ? styles.disabledContainer : styles.btnSchedule}>
              <TimeIcon style={styles.btnScheduleIcon} />
              <Text style={styles.btnScheduleText}>Часы работы</Text>
            </View>
            <View style={isDisabled ? styles.disabledContainer : null}>
              <DefaultRadialSlider
                temperature={temperature}
                setTemperature={setTemperature}
                onComplete={sendParamsTemperature}
              />
            </View>
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={{
                borderRadius: 12,
                width: '100%',
                paddingTop: 14,
                paddingBottom: 4,
                paddingLeft: 24,
                paddingRight: 24,
              }}
            >

              {unitParams && (
                <View style={styles.boxHomeDeviceFunctions}>
                  {Object.entries(unitParams?.data[0]).map((item, index) => {
                    const keyForRender = ['humRoom', 'tempChannel', 'tempRoom', 'fanSpeedP', 'co2Room'];

                    if (!keyForRender.includes(item[0])) {
                      return null;
                    }

                    return (
                      <View style={styles.boxHomeDeviceFunctionsItem} key={index}>
                        {(item[0] == 'humRoom') && <Text style={styles.boxDeviceFunctionsItemName}>Влажность</Text>}
                        {(item[0] == 'humRoom') && (
                          <Text style={styles.boxDeviceFunctionsItemText}>
                            {Math.round(item[1])}
                            %
                          </Text>
                        )}

                        {(item[0] == 'tempChannel')
                          && <Text style={styles.boxDeviceFunctionsItemName}>Температура на улице</Text>}
                        {(item[0] == 'tempChannel') && (
                          <Text style={styles.boxDeviceFunctionsItemText}>
                            {Math.round(item[1])}
                            °C
                          </Text>
                        )}

                        {(item[0] == 'tempRoom')
                          && <Text style={styles.boxDeviceFunctionsItemName}>Температура в помещении</Text>}
                        {(item[0] == 'tempRoom') && (
                          <Text style={styles.boxDeviceFunctionsItemText}>
                            {Math.round(item[1])}
                            °C
                          </Text>
                        )}

                        {(item[0] == 'fanSpeedP')
                          && <Text style={styles.boxDeviceFunctionsItemName}>Скорость вращения</Text>}
                        {(item[0] == 'fanSpeedP')
                          && <Text style={styles.boxDeviceFunctionsItemText}>{Math.round(item[1])}</Text>}

                        {(item[0] == 'co2Room')
                          && <Text style={styles.boxDeviceFunctionsItemName}>СО2</Text>}
                        {(item[0] == 'co2Room')
                          && <Text style={styles.boxDeviceFunctionsItemText}>{Math.round(item[1])}</Text>}

                      </View>
                    );
                  })}
                </View>
              )}
            </LinearGradient>

          </View>
        ) : <Text>Вы не выбрали установку</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomePlayScreen;
