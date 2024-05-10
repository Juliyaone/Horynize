/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../../components/providers/AuthContext';
import { DevicesAll } from './DevicesAll/DevicesAll';
import {
  useGetUnitsAllQuery,
} from '../../redux/usersApi';
// import GoBackComponent from '../../components/GoBack';
import ArrowLeft from '../../img/icons/ArrowLeft';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesAllScreen({ navigation }) {
  const { userId } = useContext(AuthContext);

  // ВСЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ
  const { data: modelsAll, isLoading: modelsAllIsLoading, error: errorModelsAll } = useGetUnitsAllQuery();

  if (modelsAllIsLoading) {
    return <Loader />
  }

  // console.log('modelsAll', modelsAll);

  if (errorModelsAll) {
    return <Text style={{ marginTop: 100 }}>Сервер не отвечает, попробуйте войти позже</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.navigate('DevicesStack', {
          screen: 'DevicesUser',
        })}
      >
        <ArrowLeft />
        <Text>Назад</Text>
      </TouchableOpacity>

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
