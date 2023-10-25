/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import NotImgUnits from '../../img/not-img-units.png';
import PlusIcon from '../../img/icons/plus';
import PlusIconSmall from '../../img/icons/plusSmall';
import ModalError from '../../components/ModalError';

import { getDeviceWordForm } from '../../utils';
import { styles } from './DevicesStyle';
import { images } from './images';

// const renderEnabled = (isEnabled) => (isEnabled === '1' ? <Text style={styles.textOn}>Включено</Text>
//   : <Text style={styles.textOff}>Выключено</Text>)

export function Devices({
  navigation, userId, devices, userModels, paramsModelsData,
}) {
  const [userDevicesError, setUserDevicesError] = useState(null);
  const [errorText, setErrorText] = useState('');

  const onClickAddDevices = () => navigation.navigate('DevicesAdd');

  const paramsModelMap = {};
  paramsModelsData.forEach((paramModel) => {
    const ventUnit = paramModel.data['vent-unit'];
    ventUnit.forEach((unit) => {
      // Предполагается, что значение `enabled` теперь находится в unit.data[0].enabled
      paramsModelMap[unit.id_model] = unit?.data?.[0]?.enabled;
    });
  });

  const onClickDevices = (item) => {
    // Проверка, есть ли устройство в userModels
    const isAvailable = userModels ? userModels.includes(item.id_model) : false;
    // Проверка, включено ли устройство
    const isEnabled = paramsModelMap[item.id_model] === '1';

    if (!userId) {
      navigation.navigate('Start');
    } else if (!isAvailable) {
      // Устройство не в userModels - переходим на страницу добавления устройства
      navigation.navigate('DevicesAdd');
    } else if (!isEnabled) {
      // Устройство в userModels и включено - переходим на страницу HomePlay
      navigation.navigate('HomeStack', {
        screen: 'HomePlay',
        params: { clickedControllerId: String(item.id_model) },
      });
    } else {
      // Устройство в userModels, но выключено - переходим на страницу Home
      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedControllerId: String(item.id_model) },
      });
    }
  };

  const renderItem = ({ item }) => {
    const isAvailable = userModels ? userModels.includes(item.id_model) : false;
    const isEnabled = paramsModelMap[item.id_model] === '1';

    return (
      <TouchableOpacity
        style={styles.containerCardDevices}
        onPress={() => onClickDevices(item)}
      >
        <View style={{ flex: 1 }}>
          <View style={isAvailable ? null : styles.opacity50}>
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
        {isAvailable

          ? (isEnabled
            ? <Text style={styles.textOff}>Выключено</Text>
            : <Text style={styles.textOn}>Включено</Text>)
          : (
            <TouchableOpacity style={styles.textAddBox} onPress={() => onClickDevices(item)}>
              <Text style={styles.textAdd}>Добавить</Text>
              <View style={styles.iconPlusBgSmall}>
                <PlusIconSmall />
              </View>
            </TouchableOpacity>
          )}
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
        <TouchableOpacity style={styles.iconPlusBg} onPress={onClickAddDevices}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <Text style={styles.textLightGrey}>
        {devices?.length || 0}
        {' '}
        {getDeviceWordForm(devices?.length || 0)}
      </Text>
      <>
        <View style={styles.flatListContainer}>
          <FlatList
            data={devices}
            keyExtractor={(_, index) => index.toString()}
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
