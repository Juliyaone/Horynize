/* eslint-disable camelcase */
import React from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';

import NotImgUnits from '../../../img/not-img-units.png';
import PlusIcon from '../../../img/icons/plus';
import PlusIconSmall from '../../../img/icons/plusSmall';

import { styles } from '../DevicesStyle';
import { images } from '../images';

export function DevicesAll({
  navigation, userId, devices,
}) {
  const onClickDevices = (item) => {
    if (!userId) {
      navigation.navigate('Start');
    } else {
      navigation.navigate('DevicesStack', {
        screen: 'DevicesAdd',
        params: { clickedControllerId: String(item.id_model), customName: String(item.name) },
      });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.containerCardDevices}
      onPress={() => onClickDevices(item)}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.opacity50}>
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
      <TouchableOpacity style={styles.textAddBox} onPress={() => onClickDevices(item)}>
        <Text style={styles.textAdd}>Добавить</Text>
        <View style={styles.iconPlusBgSmall}>
          <PlusIconSmall />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
  return (
    <>

      <View style={styles.deviceBoxHoryzontal}>
        <Text style={styles.headerText}>Выберите устройство</Text>
        <TouchableOpacity style={styles.iconPlusBg} onPress={onClickDevices}>
          <PlusIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={devices.models}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={33}
          numColumns={2}
        />
      </View>
    </>
  );
}
