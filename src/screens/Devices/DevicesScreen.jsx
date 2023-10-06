/* eslint-disable camelcase */
/* eslint-disable global-require */
import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet, View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserContext } from '../../components/providers/UserContext';
import { AuthContext } from '../../components/providers/AuthContext';

import { useGetParamsQuery, useGetUnitsAllQuery } from '../../redux/usersApi';

import CustomButton from '../../components/CustomButton';
import NotImgUnits from '../../img/not-img-units.png';
import PlusIcon from '../../img/icons/plus';
import PlusIconSmall from '../../img/icons/plusSmall';
import ModalError from '../../components/ModalError';

import Loader from '../../components/Loader';

import { getDeviceWordForm } from '../../utils';

const styles = StyleSheet.create({
  deviceBoxHoryzontal: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
  },
  textLightGrey: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#686868',
    marginBottom: 24,
  },
  iconPlusBg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 26,
    height: 26,
    borderRadius: 50,
    backgroundColor: '#EB7535',
  },
  iconPlusBgSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 16,
    height: 16,
    borderRadius: 50,
    backgroundColor: '#EB7535',
  },
  borderHighlight: {
    borderWidth: 2,
    borderColor: '#EB7535',
  },
  container: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  containerCardDevices: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '46%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: '4%',
    marginLeft: '2%',
    marginRight: '2%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1, // для Android
  },
  textNameCard: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 19,
    letterSpacing: 0.374,
    color: '#212121',
    marginBottom: 12,
  },
  textDescriptionCard: {
    fontFamily: 'SFProDisplayLight',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#212121',
  },
  button: {
    backgroundColor: '#EB7535',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textOff: {
    fontFamily: 'SFProDisplayLight',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
    paddingTop: 15,
    paddingBottom: 20,
  },
  textOn: {
    fontFamily: 'SFProDisplayLight',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#2BC944',
    paddingTop: 15,
    paddingBottom: 20,
  },
  textAddBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: 20,
  },
  textAdd: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#ED7635',
    marginRight: 5,
  },
  opacity50: {
    opacity: 0.5,
  },
  deviceImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 10,
  },
  deviceNotImageBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deviceNotImage: {
    minWidth: '30%',
    minHeight: '30%',
    aspectRatio: 1,
    marginBottom: 10,
  },
});

function DevicesScreen({ navigation }) {
  const { userId, userData } = useContext(UserContext);

  const { unitId, allControllers } = useContext(AuthContext);

  const [ventUnitsAll, setVentUnitsAll] = useState([]);

  const [userDevicesError, setUserDevicesError] = useState();

  const [errorText, setErrorText] = useState('');

  const [clickedDevice, setClickedDevice] = useState(unitId);

  // TODO: add to toolkit
  const allControllersOfUser = allControllers?.map(({ id_controller }) => id_controller);

  const {
    data: unitParamsDevices,
    error: errorunitParamsDevices,
    isLoading: isLoadingUnitParams,
    refetch: refetchunitParamsDevices,
  } = useGetParamsQuery({ controllerId: unitId });

  const { data: unitsAll, error: errorUnitsAll, isLoader: isLoaderGetUnits } = useGetUnitsAllQuery();

  useEffect(() => {
    if (unitsAll && unitsAll?.models) {
      setVentUnitsAll(unitsAll.models);
    }
  }, [unitsAll]);

  console.log(unitsAll, 'unitsAll')

  const sortedVentUnitsAll = unitsAll && unitsAll.models
    ? [...unitsAll.models].sort((a, _) => {
      if (allControllersOfUser?.includes(a.id_model)) {
        return -1; // Добавленная установка пользователя идет первой
      }
      return 1;
    })
    : [];

  const images = {
    'http://95.142.39.79/images/models/Horynize.CF-500.png': require('../../img/devices/Horynize.CF-500.png'),
    'http://95.142.39.79/images/models/Horynize.CF-700.png': require('../../img/devices/Horynize.CF-700.png'),
    'http://95.142.39.79/images/models/Horynize.CF-1100.png': require('../../img/devices/Horynize.CF-1100.png'),
    'http://95.142.39.79/images/models/Horynize.WF-1200.png': require('../../img/devices/Horynize.WF-1200.png'),
    'http://95.142.39.79/images/models/Horynize.WF-800.png': require('../../img/devices/Horynize.WF-800.png'),
    'http://95.142.39.79/images/models/Horynize.EF-450.png': require('../../img/devices/Horynize.EF-450.png'),
    'http://95.142.39.79/images/models/Horynize.EF-700.png': require('../../img/devices/Horynize.EF-700.png'),
    '': require('../../img/vav-active.png'),
  };

  const onClickDevices = (item, isSelected) => {
    if (!unitId) {
      navigation.navigate('Start');
    } else if (!item.id_model || !isSelected) {
      console.log('DevicesAdd');
      navigation.navigate('DevicesStack', {
        screen: 'DevicesAdd',
      });
    } else {
      const { id_model } = item;
      const setDeviceAsyncStorage = async () => {
        await AsyncStorage.setItem('clickedDeviceAsyncStorage', id_model.toString())
      }
      setDeviceAsyncStorage();
      setClickedDevice(item.id_model);
      // Получаем значение "enabled" из первого объекта в массиве
      const enabled = unitParamsDevices.data && unitParamsDevices.data[0] && unitParamsDevices.data[0].enabled;
      if (enabled === '1') {
        navigation.navigate('HomeStack', {
          screen: 'HomePlay',
          params: { clickedDevice: id_model },
        });
      } else {
        navigation.navigate('HomeStack', {
          screen: 'Home',
          params: { clickedDevice: id_model },
        });
      }
    }
  };

  const renderItem = ({ item }) => {
    // TODO
    const isSelectedUnit = allControllersOfUser?.includes(item.id_model);
    const isEnabled = unitParamsDevices?.['vent-unit'][0]['id_vent-unit']
    == item.id_model
      ? unitParamsDevices.data[0].enabled == '1'
      : false;

    const renderEnabled = isEnabled ? <Text style={styles.textOn}>Включено</Text>
      : <Text style={styles.textOff}>Выключено</Text>

    return (
      <TouchableOpacity
        style={styles.containerCardDevices}
        onPress={() => onClickDevices(item, isSelectedUnit)}
      >

        <View style={{ flex: 1 }}>
          <View style={isSelectedUnit ? null : styles.opacity50}>

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

        {allControllersOfUser?.includes(item.id_model) ? renderEnabled : (
          <TouchableOpacity style={styles.textAddBox}>
            <Text style={styles.textAdd}>Добавить</Text>
            <View style={styles.iconPlusBgSmall}>
              <PlusIconSmall />
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const onClickAddDevices = () => {
    // if (userId === '') {
    //   setUserDevicesError(true)
    //   setErrorText('Зарегистрируйте вашу установку или войдите в личный кабинет');
    // }

    navigation.navigate('DevicesAdd')
  }

  if (isLoaderGetUnits || isLoadingUnitParams) {
    return <Loader />;
  }

  if (errorUnitsAll) {
    console.log('errorUnitsAll', errorUnitsAll);
  }

  if (errorunitParamsDevices) {
    console.log('errorunitParamsDevices', errorunitParamsDevices);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

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
          {ventUnitsAll?.length || 0}
          {' '}
          {getDeviceWordForm(ventUnitsAll?.length || 0)}
        </Text>
        {unitId
          ? (
            <>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={sortedVentUnitsAll}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  estimatedItemSize={33}
                  numColumns={2}
                />
              </View>
              <CustomButton text="Добавить устройство" style={{ width: '100%' }} onPress={onClickAddDevices} />
            </>
          ) : (
            <>
              <View style={styles.flatListContainer}>
                <FlatList
                  data={unitsAll?.models}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  estimatedItemSize={33}
                  numColumns={2}
                />
              </View>
              <CustomButton text="Добавить устройство" style={{ width: '100%' }} onPress={onClickAddDevices} />
            </>
          )}
      </View>
    </SafeAreaView>
  );
}

export default DevicesScreen;
