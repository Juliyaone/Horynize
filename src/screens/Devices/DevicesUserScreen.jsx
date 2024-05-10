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
  useGetUnitsUserMutation,
} from '../../redux/usersApi';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesUserScreen({ navigation }) {
  const { userId, userControllers } = useContext(AuthContext);
  const [paramsModelsData, setParamsModelsData] = useState([]);
  const [sortedModels, setSortedModels] = useState(null);

  // ВСЕ УСТАНОВКИ ПРОИЗВОДИТЕЛЯ
  const { data: modelsAll, isLoading: modelsAllIsLoading } = useGetUnitsAllQuery();

  const [getUnitsUser, { isLoading: isLoaderGetUnitsUser }] = useGetUnitsUserMutation();

  const [getParamsModelsOfUser, { isLoading: isLoadingParamsModelsOfUser }] = useGetParamsModelsOfUserMutation();

  // ПАРАМЕТРЫ ВСЕХ УСТАНОВОК ЮЗЕРА
  useEffect(() => {
    const fetchData = async () => {
      if (userId && userControllers) {
        try {
          const allParamsModels = await Promise.all(
            userControllers.map(async (unitId) => {
              try {
                const paramsAllModelsUser = await getParamsModelsOfUser({ controllerId: String(unitId.id_controller) });

                if (paramsAllModelsUser.error) {
                  console.log('paramsAllModelsUser error', paramsAllModelsUser.error);
                  throw new Error(paramsAllModelsUser.error);
                }

                return paramsAllModelsUser;
              } catch (error) {
                console.error('Error fetching params for controller', unitId.id_controller, error);
              }
            }),
          );

          setParamsModelsData(allParamsModels.filter(Boolean));
        } catch (error) {
          console.error('Error in fetching data', error);
        }
      } else {
        console.log('нет контроллеров');
      }
    };
    fetchData();
  }, [userId, userControllers, getParamsModelsOfUser]);

  // УСТАНОВКИ ПО НАЛИЧИЮ У ЮЗЕРА
  useEffect(() => {
    const fetchUnitsUser = async () => {
      try {
        const result = await getUnitsUser({
          userId,
          status: '1',
        });

        if (result.data) {
          console.log('Success:', result.data['vent-units']);
          setSortedModels(result.data['vent-units']);
        } else if (result.error) {
          console.log('Error:', result.error);
        }
      } catch (error) {
        console.error('Exception in fetching units for user', error);
      }
    };

    if (userId) {
      fetchUnitsUser();
    }
  }, [userId, getUnitsUser]);

  if (modelsAllIsLoading || isLoadingParamsModelsOfUser || isLoaderGetUnitsUser) {
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
            modelsAll={modelsAll}
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
