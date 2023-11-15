/* eslint-disable camelcase */
import React, {
  useEffect, useState, useContext,
} from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../../components/providers/AuthContext';
import { DevicesUser } from './DevicesUser/DevicesUser';
import {
  useGetUnitsAllQuery,
  useGetParamsModelsOfUserMutation,
} from '../../redux/usersApi';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesUserScreen({ navigation }) {
  const { userId, userControllers } = useContext(AuthContext);
  const [paramsModelsData, setParamsModelsData] = useState([]);
  const [sortedModels, setSortedModels] = useState(null);

  // ВСЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ
  const { data: modelsAll, isLoading: modelsAllIsLoading } = useGetUnitsAllQuery();

  const [getParamsModelsOfUser, { isLoading: isLoadingParamsModelsOfUser }] = useGetParamsModelsOfUserMutation();

  // ПАРАМЕТРЫ ВСЕХ УСТАНОВОК ЮЗЕРА
  useEffect(() => {
    const fetchData = async () => {
      if (userId && userControllers) {
        const allParamsModels = await Promise.all(
          userControllers.map(async (unitId) => {
            const paramsAllModelsUser = await getParamsModelsOfUser({ controllerId: String(unitId.id_controller) });
            return paramsAllModelsUser;
          }),
        );
        setParamsModelsData(allParamsModels);
      }
    };
    fetchData();
  }, [userId, userControllers, getParamsModelsOfUser]);

  // ОТСОРТИРОВАННЫЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ ПО НАЛИЧИЮ У ЮЗЕРА

  useEffect(() => {
    if (modelsAll && modelsAll.models && userControllers) {
      const sorted = [...modelsAll.models].sort((a, b) => {
        const aIsUserModel = userControllers.includes(a.id_model);
        const bIsUserModel = userControllers.includes(b.id_model);

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
  }, [modelsAll, userControllers]);

  if (modelsAllIsLoading || isLoadingParamsModelsOfUser) {
    return <Loader />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {sortedModels && userControllers && paramsModelsData ? (
          <DevicesUser
            navigation={navigation}
            userId={userId}
            devices={sortedModels}
            userModels={userControllers}
            paramsModelsData={paramsModelsData}
          />
        ) : (
          <Loader />
        )}
      </View>
    </SafeAreaView>
  )
}

export default DevicesUserScreen;
