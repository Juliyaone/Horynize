/* eslint-disable global-require */
import React, { useState, useContext } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useSendParamsMutation, useGetUnitsAllQuery } from '../../redux/usersApi';
import PowerBtnIcon from '../../img/icons/powerBtn';
import { UserContext } from '../../components/providers/UserContext';
import ModalError from '../../components/ModalError';
import ModalConnection from '../../components/ModalConnection';

import Loader from '../../components/Loader';

import { styles } from './HomeScreenStyle';

function HomeScreen({ navigation, route }) {
  const clickedControllerId = route?.params?.clickedControllerId;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {clickedControllerId !== undefined ? (
          <HomeScreenInAcive
            navigation={navigation}
            clickedControllerId={clickedControllerId}
          />
        ) : <Text>Вы не выбрали установку</Text>}
      </ScrollView>
    </SafeAreaView>
  );
}

function HomeScreenInAcive({ navigation, clickedControllerId }) {
  const [userStartError, setUserStartError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [connectionText, setConnectionText] = useState('Устройство отключено');

  const [start, setStart] = useState('1');

  const [sendParams, { isLoading: isLoadingSendParams }] = useSendParamsMutation();

  const { isLoader: isLoaderGetUnits } = useGetUnitsAllQuery();

  const models = useSelector((state) => state.contollers.models);

  const { isConnection, setIsConnection, unitId } = useContext(UserContext);

  const findUnitById = (id) => {
    const model = models?.find((item) => item.id_model == id);
    return model ? { img: model.img, name: model.name } : { img: null, name: null };
  };
  const unit = findUnitById(clickedControllerId);

  const images = {
    'http://95.142.39.79/images/models/Horynize.CF-500.png': require('../../img/devices/Horynize.CF-500.png'),
    'http://95.142.39.79/images/models/Horynize.CF-700.png': require('../../img/devices/Horynize.CF-700.png'),
    'http://95.142.39.79/images/models/Horynize.CF-1100.png': require('../../img/devices/Horynize.CF-1100.png'),
    'http://95.142.39.79/images/models/Horynize.WF-1200.png': require('../../img/devices/Horynize.WF-1200.png'),
    'http://95.142.39.79/images/models/Horynize.WF-800.png': require('../../img/devices/Horynize.WF-800.png'),
    'http://95.142.39.79/images/models/Horynize.EF-450.png': require('../../img/devices/Horynize.EF-450.png'),
    'http://95.142.39.79/images/models/Horynize.EF-700.png': require('../../img/devices/Horynize.EF-700.png'),
    '': require('../../img/vav-active.png'),
  };

  const localImage = images[unit?.img];

  const sendParamsData = async () => {
    setStart('1');

    const params = {
      controllerId: unitId,
      start,
    }
    try {
      await sendParams(params);
      navigation.navigate('HomeStack', { screen: 'HomePlay', params: { clickedControllerId: unitId } });
    } catch (error) {
      setErrorText(error.data.message);
      setUserStartError(true);
    }
  }

  if (isLoadingSendParams || isLoaderGetUnits) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {userStartError
          && (
          <ModalError
            errorText={errorText}
            visible={!!userStartError}
            onDismiss={() => setUserStartError(null)}
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
        <View style={styles.container}>
          <View style={styles.boxPowerBtnBox}>
            <TouchableOpacity style={styles.boxPowerBtn} onPress={sendParamsData}>
              <PowerBtnIcon />
              <Text style={styles.boxPowerBtnText}>Питание</Text>
            </TouchableOpacity>
          </View>
          <Image source={localImage} />
          <Text>{unit?.name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
