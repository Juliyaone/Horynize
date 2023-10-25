import React from 'react';
import {
  View, Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import SettingsIcon from '../../img/icons/settings';

import { styles } from './SettingsStyle';
import LockIcon from '../../img/icons/lock';

export function PersonalData({ navigation }) {
  const auth = useSelector((state) => state.auth);

  const onChangePassword = () => {
    navigation.navigate('ChangeUserData');
  }

  return (
    <View style={styles.cardUserBox}>
      <View style={styles.cardUserDataBox}>
        <Text style={styles.cardUserDataHeaderText}>Личные данные</Text>
        <SettingsIcon />
      </View>
      <View style={styles.cardUserDataBox}>
        <Text style={styles.cardUserText}>Адрес эл. почты</Text>
        <Text style={styles.cardUserText}>{auth?.user?.email ?? ''}</Text>
      </View>
      <View style={styles.cardUserBtnBox}>
        <CustomButton text="Изменить данные" IconComponent={LockIcon} onPress={onChangePassword} />
      </View>
    </View>
  );
}
