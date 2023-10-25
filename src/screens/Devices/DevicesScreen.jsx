/* eslint-disable camelcase */
import React, {
  useEffect, useState, useContext,
} from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../../components/providers/AuthContext';
import { Devices } from './Devices';
import {
  useGetUnitsUserMutation,
  useGetUnitsAllQuery,
  useGetParamsModelsOfUserMutation,
} from '../../redux/usersApi';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesScreen({ navigation }) {
  const { userId } = useContext(AuthContext);

  const [userModels, setUserModels] = useState(null);
  const [paramsModelsData, setParamsModelsData] = useState([]);
  const [sortedModels, setSortedModels] = useState(null);

  // ВСЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ
  const { data: modelsAll, isLoading: modelsAllIsLoading } = useGetUnitsAllQuery();
  const [getUnitsUser, { isLoading: unitsUserIsLoading }] = useGetUnitsUserMutation();
  const [getParamsModelsOfUser, { isLoading: isLoadingParamsModelsOfUser }] = useGetParamsModelsOfUserMutation();

  // ВСЕ УСТАНОВКИ ЮЗЕРА
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const [userModelsDataResponse] = await Promise.all([
            getUnitsUser({ userId, status: '1' }),
          ]);

          if (userModelsDataResponse?.data?.['vent-units']) {
            const userModelsResult = userModelsDataResponse?.data['vent-units'];
            const allIdControllers = userModelsResult.map((model) => model.id_controller);
            setUserModels(allIdControllers);
          }
        } catch (error) {
          console.log(' userModels error:', error);
        }
      };

      fetchData();
    }
  }, [getUnitsUser, userId]);

  // ПАРАМЕТРЫ ВСЕХ УСТАНОВОК ЮЗЕРА
  useEffect(() => {
    const fetchData = async () => {
      if (userId && userModels) {
        const allParamsModels = await Promise.all(
          userModels.map(async (unitId) => {
            const paramsAllModelsUser = await getParamsModelsOfUser({ controllerId: String(unitId) });
            return paramsAllModelsUser;
          }),
        );
        setParamsModelsData(allParamsModels);
      }
    };
    fetchData();
  }, [userId, userModels, getParamsModelsOfUser]);

  // ОТСОРТИРОВАННЫЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ ПО НАЛИЧИЮ У ЮЗЕРА

  useEffect(() => {
    if (modelsAll && modelsAll.models && userModels) {
      const sorted = [...modelsAll.models].sort((a, b) => {
        const aIsUserModel = userModels.includes(a.id_model);
        const bIsUserModel = userModels.includes(b.id_model);

        if (aIsUserModel && !bIsUserModel) {
          return -1;
        }
        if (!aIsUserModel && bIsUserModel) {
          return 1;
        }

        return 0;
      });

      setSortedModels(sorted);
    }
  }, [modelsAll, userModels]);

  if (modelsAllIsLoading || unitsUserIsLoading || isLoadingParamsModelsOfUser) {
    return <Loader />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {sortedModels && userModels && paramsModelsData ? (

          <Devices
            navigation={navigation}
            userId={userId}
            devices={sortedModels}
            userModels={userModels}
            paramsModelsData={paramsModelsData}
          />
        ) : (
          <Loader />
        )}
      </View>
    </SafeAreaView>
  )
}

export default DevicesScreen;
