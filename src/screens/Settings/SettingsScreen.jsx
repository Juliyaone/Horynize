import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { UserContext } from '../../components/providers/UserContext';
import GoBackComponent from '../../components/GoBack';
import { AuthContext } from '../../components/providers/AuthContext';

import CustomButton from '../../components/CustomButton';

import ArrowRightSmallIcon from '../../img/icons/ArrowRightSmall';
import ExitIcon from '../../img/icons/exit';
import SettingsIcon from '../../img/icons/settings';
import { Contacts } from './Contacts';
import { PersonalData } from './PersonalData';
import { styles } from './SettingsStyle';

import { getDeviceWordForm } from '../../utils';

function SettingsScreen({ navigation }) {
  const { setUserId, setUserData } = useContext(UserContext);

  const {
    signOut, userName, allControllers, userToken,
  } = useContext(AuthContext);

  const handleLogout = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'DevicesStack' }],
      }),
    );
    signOut();
    setUserId('');
    setUserData('');
    navigation.navigate('Start');
  }
  const handleLogin = () => {
    navigation.navigate('Start');
  }

  return (
    <ScrollView>
      <GoBackComponent navigation={navigation} />

      <View style={styles.container}>

        <Text style={styles.headerTextSettings}>Настройки</Text>
        {userToken && (
        <>
          <View style={styles.cardUserBox}>
            <View style={styles.cardUserDataBox}>
              <Text style={styles.cardUserDataHeaderText}>Пользователь</Text>
              <SettingsIcon />
            </View>
            <View style={styles.cardUserDataBox}>
              <Text style={styles.cardUserText}>Логин</Text>
              <Text style={styles.cardUserText}>{userName}</Text>
            </View>
            <View style={styles.cardUserNumberOfDevicesBox}>
              <Text style={styles.cardUserNumberOfDevicesText}>
                {allControllers?.length}
                {' '}
                {getDeviceWordForm(1)}
              </Text>
              <ArrowRightSmallIcon />
            </View>
            <View style={styles.cardUserBtnBox}>
              <CustomButton text="Выйти" IconComponent={ExitIcon} onPress={handleLogout} />
            </View>
          </View>
          <PersonalData navigation={navigation} />
        </>
        ) }
        <Contacts />

        {!userToken && (
        <View style={styles.cardUserBtnBox}>
          <CustomButton text="Войти" IconComponent={ExitIcon} onPress={handleLogin} />
        </View>
        )}

      </View>
    </ScrollView>
  );
}

export default SettingsScreen;
