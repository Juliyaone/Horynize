/* eslint-disable camelcase */
import React, {
  useEffect, useMemo, useState, useContext,
} from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthContext } from '../../components/providers/AuthContext';
import { Devices } from './Devices';
import {
  useGetModelsOfUserMutation,
  useGetParamsModelsOfUserMutation,
  useGetModelsQuery,
} from '../../redux/usersApi';

import Loader from '../../components/Loader';
import { styles } from './DevicesStyle';

function DevicesScreen({ navigation }) {
  const { userId } = useContext(AuthContext);

  const [userModels, setUserModels] = useState(null);
  const [models, setModels] = useState(null);
  const [userModelsParams, setUserModelsParams] = useState(null);

  const [getModelsOfUser, { isLoading: modelsOfUserIsLoading }] = useGetModelsOfUserMutation();
  const [getParamsModelsOfUser, { isLoading: paramsModelsOfUserIsLoading }] = useGetParamsModelsOfUserMutation();
  const { data, isLoading: modelsIsLoading } = useGetModelsQuery();

  const memoModels = useMemo(() => models, [models]);
  const memoUserModelsID = useMemo(() => userModels?.map(({ id_controller }) => id_controller), [userModels]);

  console.log('memoUserModelsID', memoUserModelsID);

  const memoUserModelsParams = useMemo(() => {
    const controllerParams = {};
    userModelsParams?.forEach((params) => {
      const id = params?.data?.['vent-unit']?.[0]?.['id_vent-unit'];
      if (id) {
        controllerParams[Number(id)] = params?.data?.data[0]
      }
    })
    return controllerParams;
  }, [userModelsParams]);

  useEffect(() => {
    if (data) {
      if (userId && data) {
        const getModelsOfUserAsync = async () => {
          if (userId) {
            const modelsOfUser = await getModelsOfUser({ userId, status: 1 });
            if (modelsOfUser?.data?.['vent-units']) {
              const userModelsResult = modelsOfUser.data['vent-units'];
              setUserModels(userModelsResult);
              const promises = userModelsResult
                .map(({ id_controller }) => getParamsModelsOfUser({ controllerId: String(id_controller) }));
              const params = await Promise.all(promises);
              console.log('params', params);
              if (params) {
                setUserModelsParams(params)
              }
            }
          }
        };
        getModelsOfUserAsync();
        setModels(data.models);
      } else {
        setModels(data.models);
      }
    }
  }, [data, getModelsOfUser, getParamsModelsOfUser, userId]);

  const devices = useMemo(() => {
    const unsorted = memoModels?.map((device) => ({
      ...device,
      isAvailable: memoUserModelsID?.includes(device?.id_model),
      isEnabled: memoUserModelsParams?.[device?.id_model]?.enabled ?? undefined,
    }));

    if (unsorted) {
      return [...unsorted].sort((a, _) => (a.isAvailable ? -1 : 0))
    }
    return unsorted;
  }, [memoModels, memoUserModelsID, memoUserModelsParams]);

  if (modelsIsLoading || modelsOfUserIsLoading || paramsModelsOfUserIsLoading || !devices || !devices?.length) {
    return <Loader />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Devices navigation={navigation} userId={userId} devices={devices} />
      </View>
    </SafeAreaView>
  )
}

export default DevicesScreen;
