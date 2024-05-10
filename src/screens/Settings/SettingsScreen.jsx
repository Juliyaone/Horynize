import React, { useContext } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
} from 'react-native';
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
  const {
    signOut, userName, userControllers, userToken,
  } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
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
              <TouchableOpacity style={styles.btnDevices} onPress={() => navigation.navigate('DevicesStack', { screen: 'DevicesUser' })}>
                {userControllers && userControllers.length > 0
                  ? (
                    <Text style={styles.cardUserNumberOfDevicesText}>
                      {userControllers.length}
                      {' '}
                      {getDeviceWordForm(userControllers.length)}
                    </Text>
                  )
                  : (<Text style={styles.textOff}> Нет устройств</Text>)}

                <ArrowRightSmallIcon />
              </TouchableOpacity>
            </View>
            <View style={styles.cardUserBtnBox}>
              <CustomButton text="Выйти" IconComponent={ExitIcon} onPress={handleLogout} />
            </View>
          </View>
          <PersonalData navigation={navigation} />
        </>
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
