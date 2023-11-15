/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';

import { useBindMutation } from '../../../redux/usersApi';

import CustomButton from '../../../components/CustomButton';
import NotImgUnits from '../../../img/not-img-units.png';
import ModalError from '../../../components/ModalError';
import MinusSmallIcon from '../../../img/icons/MinusSmallIcon';

import { getDeviceWordForm } from '../../../utils';
import { styles } from '../DevicesStyle';
import { images } from '../images';

export function DevicesUser({
  navigation, userId, devices, userModels, paramsModelsData,
}) {
  const [userDevicesError, setUserDevicesError] = useState(null);
  const [errorText, setErrorText] = useState('');

  const [bind, { isLoading: isLoadingBind }] = useBindMutation();

  const onClickAddDevices = () => navigation.navigate('DevicesAll');

  const paramsModelMap = {};
  paramsModelsData.forEach((param) => {
    const ventUnitId = param.data['vent-unit']?.[0]?.['id_vent-unit'];
    const isEnabled = param.data.data?.[0]?.enabled;
    if (ventUnitId) {
      paramsModelMap[ventUnitId] = isEnabled === '1';
    }
  });

  const userDevices = devices.filter((device) => userModels.some((model) => model.id_model === device.id_model));

  // console.log('userModels', userModels);
  // console.log('userDevices', userDevices);
  // console.log('paramsModelMap:', paramsModelMap);

  const onClickDevices = (item) => {
    // Find if the clicked device exists in userModels
    const correspondingModel = userModels.find((model) => model.id_model === item.id_model);
    const idController = correspondingModel ? correspondingModel.id_controller : null;

    // Check if the device is available in userModels
    const isAvailable = idController !== null;

    // Check if the device is enabled
    const isEnabled = paramsModelMap[item.id_model] === true;
    // console.log('Device Clicked:', item.id_model, 'Is Available:', isAvailable, 'Is Enabled:', isEnabled);

    if (!userId) {
      navigation.navigate('Start');
    } else if (isEnabled) {
      // Device in userModels and enabled - navigate to HomePlay screen
      navigation.navigate('HomeStack', {
        screen: 'HomePlay',
        params: { clickedControllerId: String(idController) },
      });
    } else {
      // Device in userModels but disabled - navigate to Home screen
      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedControllerId: String(idController) },
      });
    }
  };

  const onClickDevicesMinus = async (values, actions) => {
    // const bindData = {
    //   userid: values.userid,
    //   controllerid: values.controllerid,
    //   customName: values.customName,
    //   binding: values.binding,
    //   id: values.id,
    //   key: values.key,
    //   id_model: values.id_model,
    // };

    // try {
    //   await bind(bindData);
    //   actions.resetForm();
    // } catch (error) {
    //   console.error('Ошибка привязки:', error);
    // }
    console.log('hjgkjglhljh');
  }

  const renderItem = ({ item }) => {
    const isEnabled = paramsModelMap[item.id_model];

    return (
      <TouchableOpacity
        style={styles.containerCardDevices}
        onPress={() => onClickDevices(item)}
      >
        <View style={{ flex: 1 }}>
          <View>
            {(item.img !== '')
              ? <Image source={images[item.img]} style={styles.deviceImage} resizeMode="contain" />
              : (
                <View style={styles.deviceNotImageBox}>
                  <Image source={NotImgUnits} style={styles.deviceNotImage} resizeMode="contain" />
                </View>
              )}
            <Text style={styles.textNameCard}>{item.name}</Text>
            <Text style={styles.textNameCard}>{item.id_model}</Text>
            <View style={{ flex: 1 }} />
          </View>
        </View>
        {isEnabled && <Text style={styles.textOn}>Включено</Text>}
        {!isEnabled && (<Text style={styles.textOff}>Выключено</Text>)}
      </TouchableOpacity>
    );
  };
  return (
    <>
      {userDevicesError
          && (
          <ModalError
            errorText={errorText}
            visible={!!userDevicesError}
            onDismiss={() => setUserDevicesError(null)}
            navigation={navigation}
            screenName="Start"
          />
          )}

      <View style={styles.deviceBoxHoryzontal}>
        <Text style={styles.headerText}>Выберите устройство</Text>
        <TouchableOpacity style={styles.iconPlusBg} onPress={onClickDevicesMinus}>
          <MinusSmallIcon />
        </TouchableOpacity>
      </View>

      <Text style={styles.textLightGrey}>
        {userModels?.length || 0}
        {' '}
        {getDeviceWordForm(userModels?.length || 0)}
      </Text>
      <>
        <View style={styles.flatListContainer}>
          <FlatList
            data={userDevices}
            keyExtractor={(item) => item.id_model.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={33}
            numColumns={2}
          />
        </View>
        <CustomButton text="Добавить устройство" style={{ width: '100%' }} onPress={onClickAddDevices} />
      </>
    </>
  );
}
