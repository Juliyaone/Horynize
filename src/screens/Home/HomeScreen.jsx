/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useSendParamsMutation, useGetUnitsAllQuery } from '../../redux/usersApi';
import PowerBtnIcon from '../../img/icons/powerBtn';
import ModalError from '../../components/ModalError';

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

function HomeScreenInAcive({ navigation, clickedControllerId }) {
  const [userStartError, setUserStartError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [sendParams, { isLoading: isLoadingSendParams }] = useSendParamsMutation();

  const { isLoader: isLoaderGetUnits } = useGetUnitsAllQuery();

  const models = useSelector((state) => state.contollers.models);
  const findUnitById = (id) => {
    const model = models?.find((item) => item.id_model === id);
    return model ? { img: model.img, name: model.name } : { img: null, name: null };
  };
  const unit = findUnitById(Number(clickedControllerId));

  const localImage = images[unit?.img];

  const sendParamsData = async () => {
    const params = {
      controllerId: String(clickedControllerId),
      start: '1',
    }
    try {
      await sendParams(params);
      navigation.navigate('HomeStack', { screen: 'HomePlay', params: { clickedControllerId } });
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
