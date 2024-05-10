/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';

import CustomButton from '../../../components/CustomButton';
import NotImgUnits from '../../../img/not-img-units.png';
import { useBindMutation } from '../../../redux/usersApi';
import Loader from '../../../components/Loader';
import { getDeviceWordForm } from '../../../utils';
import EditComponent from '../../../img/icons/edit';
import EditModal from '../../Modal/EditModal';
import { styles } from '../DevicesStyle';

export function DevicesUser({
  navigation, userId, userModels, paramsModelsData, modelsAll,
}) {
  const onClickAddDevices = () => navigation.navigate('DevicesAll');
  const [bind, { isLoading: isLoadingBind }] = useBindMutation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);

  // binding: 0 - отвязка, 1 - привязка, 2 - редактирование customName
  if (isLoadingBind) {
    return <Loader />
  }

  const devicesUserNewArr = [];

  if (paramsModelsData.length > 0) {
    paramsModelsData.forEach((param) => {
      const ventUnitId = param.data['vent-unit'][0]['id_vent-unit']; // Получаем ID контроллера из paramsModelsData
      const controller = userModels.find((c) => c.id_controller.toString() === ventUnitId); // Ищем контроллер по id_controller
      if (controller) {
        const model = modelsAll.models.find((m) => m.id_model === controller.id_model); // Ищем модель для получения изображения
        if (model) {
          devicesUserNewArr.push({
            id_controller: controller.id_controller,
            id_model: controller.id_model,
            name_model: controller.name, // Имя из userModels
            img: model.img, // Изображение из modelsAll
            isEnabled: param.data.data[0].enabled, // Используем данные состояния устройства
          });
        }
      }
    });
  }

  const onClickDevices = (item) => {
    if (!userId) {
      navigation.navigate('Start');
    }
    if (item.isEnabled === '0') {
      navigation.navigate('HomeStack', {
        screen: 'Home',
        params: { clickedControllerId: String(item.id_controller) },
      });
    }
    if (item.isEnabled === '1') {
      navigation.navigate('HomeStack', {
        screen: 'HomePlay',
        params: { clickedControllerId: String(item.id_controller), name: item.name_model },
      });
    }
  };

  const onClickEdit = async (item) => {
    setSelectedDevice(item)
    setModalVisible(true);
  }

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', width: '46%' }}>
      <TouchableOpacity
        style={styles.containerCardDevices}
        onPress={() => onClickDevices(item)}
      >

        <TouchableOpacity
          onPress={() => onClickEdit(item)}
          style={{
            flexDirection: 'row', justifyContent: 'flex-end', width: '100%', height: 15,
          }}
        >
          <EditComponent style={{
            flexDirection: 'row', justifyContent: 'flex-end', width: 20, height: 15,
          }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, width: '100%' }}>
          <View style={{ flex: 1, width: '100%' }}>
            {(item.img !== '')
              ? <Image source={{ uri: item.img }} style={styles.deviceImage} resizeMode="contain" />

              : (
                <View style={styles.deviceNotImageBox}>
                  <Image source={NotImgUnits} style={styles.deviceNotImage} resizeMode="contain" />
                </View>
              )}
            <Text style={styles.textNameCard}>
              {' '}
              {item.name_model.replace(/-/g, '\u00A0-\u00A0')}
            </Text>

            <View />
          </View>
        </View>
        {item.isEnabled === '1' ? <Text style={styles.textOn}>Включено</Text>
          : <Text style={styles.textOff}>Выключено</Text>}
      </TouchableOpacity>
    </View>
  );

  return (
    <>

      {modalVisible && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedDevice={selectedDevice}
          bind={bind}
          userId={userId}
        />
      )}

      <View style={styles.deviceBoxHoryzontal}>
        <Text style={styles.headerText}>Выберите устройство</Text>
      </View>

      {userModels && userModels.length === 0 ? (
        <Text style={styles.textOff}>У вас нет привязанных устройств</Text>
      ) : (
        <>
          <Text style={styles.textLightGrey}>
            {userModels?.length || 0}
            {' '}
            {getDeviceWordForm(userModels?.length || 0)}
          </Text>
          <View style={styles.flatListContainer}>
            <FlatList
              data={devicesUserNewArr}
              keyExtractor={(item) => item.id_model.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              estimatedItemSize={33}
              numColumns={2}
            />
          </View>
        </>
      )}
      <View style={{ marginTop: 'auto' }}>
        <CustomButton text="Добавить устройство" style={{ width: '100%' }} onPress={onClickAddDevices} />
      </View>
    </>
  );
}
