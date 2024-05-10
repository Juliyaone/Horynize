import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import GoBackComponent from '../../components/GoBack';
import CustomButton from '../../components/CustomButton';
import ExitIcon from '../../img/icons/exit';
import { Contacts } from './Contacts';
import { styles } from './SettingsStyle';

function SettingsScreen({ navigation }) {
  const handleLogin = () => {
    navigation.navigate('Start');
  }

  return (
    <>
      <GoBackComponent navigation={navigation} />

      <View style={styles.container}>

        <Text style={styles.headerTextSettings}> </Text>

        <Contacts />

        <View style={styles.btnBoxNotRegister}>
          <CustomButton text="Войти" IconComponent={ExitIcon} onPress={handleLogin} />
        </View>

      </View>
    </>
  );
}

export default SettingsScreen;
