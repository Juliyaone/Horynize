import React from 'react';
import {
  View, Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { useGetContactsQuery } from '../../redux/usersApi';
import Loader from '../../components/Loader';
import { styles } from './SettingsStyle';
import ChatIcon from '../../img/icons/chat';

export function Contacts() {
  const { isLoading } = useGetContactsQuery();

  const contacts = useSelector((state) => state.contacts.info);

  if (isLoading) {
    <Loader />
  }

  return (
    <View style={styles.cardUserBox}>
      <Text style={styles.cardUserDataHeaderText}>Наши контакты</Text>
      <View style={styles.cardUserDataBox}>
        <Text style={styles.cardUserText}>Телефон</Text>
        <Text style={styles.cardUserText}>{contacts?.phone ?? ''}</Text>
      </View>
      <View style={styles.cardUserDataBox}>
        <Text style={styles.cardUserText}>Адрес эл. почты</Text>
        <Text style={styles.cardUserText}>{contacts?.email ?? ''}</Text>
      </View>
      <View style={styles.cardUserBtnBox}>
        <CustomButton text="Обратиться в сервис" IconComponent={ChatIcon} />
      </View>
    </View>
  );
}
