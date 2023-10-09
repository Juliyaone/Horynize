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

const renderEnabled = (isEnabled) => (isEnabled === '1' ? <Text style={styles.textOn}>Включено</Text>
  : <Text style={styles.textOff}>Выключено</Text>)

export function Devices({ navigation, userId, devices }) {
  const [userDevicesError, setUserDevicesError] = useState(null);
  const [errorText, setErrorText] = useState('');

  const onClickAddDevices = () => navigation.navigate('DevicesAdd');

  const onClickDevices = (item) => {
    if (!userId) {
      navigation.navigate('Start');
    } else if (!item?.id_model || !item.isAvailable) {
      navigation.navigate('DevicesAdd');
    } else if (item.isEnabled === '1') {
      navigation.navigate('HomeStack', {
        screen: 'HomePlay',
        params: { clickedControllerId: String(item.id_model) },
      });
    } else {
      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedControllerId: String(item.id_model) },
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.containerCardDevices}
      onPress={() => onClickDevices(item)}
    >
      <View style={{ flex: 1 }}>
        <View style={item.isAvailable ? null : styles.opacity50}>
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
      {item.isAvailable ? renderEnabled(item.isEnabled) : (
        <TouchableOpacity style={styles.textAddBox} onPress={() => onClickDevices(item)}>
          <Text style={styles.textAdd}>Добавить</Text>
          <View style={styles.iconPlusBgSmall}>
            <PlusIconSmall />
          </View>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

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
