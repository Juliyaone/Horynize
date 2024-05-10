import React, { useContext } from 'react';
import {
  View, Text,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import SettingsIcon from '../../img/icons/settings';

import { AuthContext } from '../../components/providers/AuthContext';

import { styles } from './SettingsStyle';
import LockIcon from '../../img/icons/lock';

export function PersonalData({ navigation }) {
  const {
    userEmail,
  } = useContext(AuthContext);

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
        <Text style={styles.cardUserText}>Почта</Text>
        <Text style={styles.cardUserText}>{userEmail ?? ''}</Text>
      </View>
      <View style={styles.cardUserBtnBox}>
        <CustomButton text="Изменить данные" IconComponent={LockIcon} onPress={onChangePassword} />
      </View>
    </View>
  );
}
