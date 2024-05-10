/* eslint-disable camelcase */
import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DevicesAllNotRegister } from './DevicesAll/DevicesAllNotRegister';
import {
  useGetUnitsAllQuery,
} from '../../redux/usersApi';
import GoBackComponent from '../../components/GoBack';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesAllScreenNotRegister({ navigation }) {
  const { data: modelsAll, isLoading: modelsAllIsLoading, error: errorModelsAll } = useGetUnitsAllQuery();

  if (modelsAllIsLoading) {
    return <Loader />
  }

  if (errorModelsAll) {
    return <Text style={{ marginTop: 100 }}>Сервер не отвечает, попробуйте войти позже</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackComponent navigation={navigation} />
      <View style={styles.container}>

        <DevicesAllNotRegister
          navigation={navigation}
          devices={modelsAll}
        />
      </View>
    </SafeAreaView>
  )
}

export default DevicesAllScreenNotRegister;
