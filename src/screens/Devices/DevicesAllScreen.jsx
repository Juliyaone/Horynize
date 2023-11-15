/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../../components/providers/AuthContext';
import { DevicesAll } from './DevicesAll/DevicesAll';
import {
  useGetUnitsAllQuery,
} from '../../redux/usersApi';
import GoBackComponent from '../../components/GoBack';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesAllScreen({ navigation }) {
  console.log('страница DevicesAllScreen');

  const { userId } = useContext(AuthContext);

  // ВСЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ
  const { data: modelsAll, isLoading: modelsAllIsLoading } = useGetUnitsAllQuery();

  if (modelsAllIsLoading) {
    return <Loader />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoBackComponent navigation={navigation} />
      <View style={styles.container}>

        <DevicesAll
          navigation={navigation}
          userId={userId}
          devices={modelsAll}
        />
      </View>
    </SafeAreaView>
  )
}

export default DevicesAllScreen;
