/* eslint-disable camelcase */
import React from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity,
} from 'react-native';

import NotImgUnits from '../../../img/not-img-units.png';

import { styles } from '../DevicesStyle';

export function DevicesAllNotRegister({ devices }) {
  const renderItem = ({ item }) => (
    <View style={{
      width: '46%', height: '100%', marginRight: '2%', marginLeft: '2%',
    }}
    >
      <TouchableOpacity
        style={styles.containerCardDevices}
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
              {item.name.replace(/-/g, '\u00A0-\u00A0')}
            </Text>
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <>

      <View style={styles.deviceBoxHoryzontal}>
        <Text style={styles.headerText}>Все установки</Text>
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
