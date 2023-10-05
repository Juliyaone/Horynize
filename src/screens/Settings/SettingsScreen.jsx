import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { UserContext } from '../../components/providers/UserContext';
import GoBackComponent from '../../components/GoBack';
import { AuthContext } from "../../components/providers/AuthContext";

import CustomButton from '../../components/CustomButton';
import Loader from '../../components/Loader';

import ArrowRightSmallIcon from '../../img/icons/ArrowRightSmall';
import ExitIcon from '../../img/icons/exit';
import SettingsIcon from '../../img/icons/settings';
import LockIcon from '../../img/icons/lock';
import ChatIcon from '../../img/icons/chat';

import { useGetContactsQuery } from '../../redux/usersApi';

function SettingsScreen({ navigation }) {

  const { userId, setUserId, userData, setUserData } = useContext(UserContext);
  const { data: contacts, isLoading: isLoadingContacts } = useGetContactsQuery();

  const { signOut, emailAuthContext, userName, allControllers } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  useEffect(() => {
    if (contacts && contacts.contacts && contacts.contacts.length > 0) {
      console.log('contacts', contacts);

      console.log('emailAuthContext', emailAuthContext);
      console.log('userNameAuthContext', userName);
      console.log('allControllersAuthContext', allControllers);

      
      
      setEmail(contacts.contacts[0].email);
      setTel(contacts.contacts[0].phone);
    }
  }, [contacts])

  if (isLoadingContacts) {
    return <Loader />
  }

  const handleLogout = () => {
    signOut();
    setUserId('');
    setUserData('');
    navigation.navigate('Start');
  }


  function getDeviceWordForm(num) {
    const lastDigit = num % 10;
    const lastTwoDigits = num % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return 'устройство';
    } else if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 10 || lastTwoDigits > 20)) {
      return 'устройства';
    } else {
      return 'устройств';
    }
  }


  const onChangePassword = () => {
    navigation.navigate('ChangeUserData');
  }


  return (
    <ScrollView>
      <GoBackComponent navigation={navigation} />

      <View style={styles.container}>

        <Text style={styles.headerTextSettings}>Настройки</Text>
        {/* {(userData.username !== '') && */}
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
              <Text style={styles.cardUserNumberOfDevicesText}>{allControllers.length} {getDeviceWordForm(1)}</Text>
              <ArrowRightSmallIcon />
            </View>
            <View style={styles.cardUserBtnBox}>
              <CustomButton text={'Выйти'} IconComponent={ExitIcon} onPress={handleLogout} />
            </View>
          </View>

          <View style={styles.cardUserBox}>
            <View style={styles.cardUserDataBox}>
              <Text style={styles.cardUserDataHeaderText}>Личные данные</Text>
              <SettingsIcon />
            </View>
            <View style={styles.cardUserDataBox}>
              <Text style={styles.cardUserText}>Адрес эл. почты</Text>
              <Text style={styles.cardUserText}>{emailAuthContext}</Text>
            </View>
            <View style={styles.cardUserBtnBox}>
              <CustomButton text={'Изменить данные'} IconComponent={LockIcon} onPress={onChangePassword} />
            </View>
          </View>
        </>



        {/* } */}
        <View style={styles.cardUserBox}>
          <Text style={styles.cardUserDataHeaderText}>Наши контакты</Text>
          <View style={styles.cardUserDataBox}>
            <Text style={styles.cardUserText}>Телефон</Text>
            <Text style={styles.cardUserText}>{tel}</Text>
          </View>
          <View style={styles.cardUserDataBox}>
            <Text style={styles.cardUserText}>Адрес эл. почты</Text>
            <Text style={styles.cardUserText}>{email}</Text>
          </View>
          <View style={styles.cardUserBtnBox}>
            <CustomButton text={'Обратиться в сервис'} IconComponent={ChatIcon} />
          </View>
        </View>


      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  headerTextSettings: {
    flexGrow: 1,
    fontFamily: 'SFProDisplayBold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.38,
    color: '#222222',
    marginBottom: 25
  },
  cardUserDataHeaderText: {
    fontFamily: 'SFProDisplayBold',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    alignItems: 'center',
    letterSpacing: 0.38,
    color: '#222222',
    marginBottom: 15
  },
  cardUserBox: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15
  },
  cardUserNumberOfDevicesBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22
  },
  cardUserBtnBox: {
    width: '100%',
    marginTop: 25
  },
  cardUserName: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    alignItems: "center",
    letterSpacing: 0.35,
    color: "#212121",
    marginBottom: 12
  },
  cardUserOrganization: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 28,
    alignItems: "center",
    letterSpacing: 0.35,
    color: "#212121",
    marginBottom: 8
  },
  cardUserNumberOfDevicesText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 16,
    alignItems: "center",
    letterSpacing: 0.35,
    color: "#212121"
  },
  cardUserDataBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },

});

export default SettingsScreen;
