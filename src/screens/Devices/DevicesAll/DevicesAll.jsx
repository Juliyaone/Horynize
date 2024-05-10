/* eslint-disable camelcase */
import React, { useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';

import NotImgUnits from '../../../img/not-img-units.png';
import PlusIconSmall from '../../../img/icons/plusSmall';

import { styles } from '../DevicesStyle';

export function DevicesAll({
  navigation, userId, devices,
}) {
  const onClickDevices = (item) => {
    if (!userId) {
      navigation.navigate('Start');
    } else {
      navigation.navigate('DevicesStack', {
        screen: 'DevicesAdd',
        params: { clickedIdModel: String(item.id_model), customName: String(item.name) },
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={{
      width: '46%', height: '100%', marginRight: '2%', marginLeft: '2%',
    }}
    >

      <TouchableOpacity
        style={styles.containerCardDevices}
        onPress={() => onClickDevices(item)}
      >
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
              {item.name.replace(/-/g, '\u00A0-\u00A0')}
            </Text>
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
    </View>
  );
  return (
    <>

      <View style={styles.deviceBoxHoryzontal}>
        <Text style={styles.headerText}>Выберите устройство</Text>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={devices?.models}
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
