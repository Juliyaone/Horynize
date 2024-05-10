import React, { useContext, useState } from 'react';
import {
  StyleSheet, TouchableOpacity, Text, Modal, View,
} from 'react-native';

import { useDeleteUserMutation } from '../redux/usersApi';
import Loader from './Loader';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { AuthContext } from './providers/AuthContext';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: 'center',
  },
  deleteText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: responsiveFontSize(2.1),


    color: '#787880',
    marginBottom: 20,
    textAlign: 'center',
  },
  deleteTextBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: '#787880',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function DeleteUser({ navigation }) {
  const { userId, signOut } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [deleteUser, { isLoading: isLoaderDeleteUser }] = useDeleteUserMutation();

  const onClickBtnDeleteUser = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    const userData = {
      user_id: userId,
    };
    deleteUser(userData);
    signOut();
    navigation.navigate('Start');

    setModalVisible(false);
  };

  if (isLoaderDeleteUser) {
    return <Loader />;
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.deleteText}>Вы действительно хотите удалить учетную запись?</Text>
            <View style={styles.btnBox}>
              <TouchableOpacity
                onPress={handleDelete}
              >
                <Text style={styles.textStyle}>Удалить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Отмена</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={onClickBtnDeleteUser} style={styles.deleteTextBox}>
        <Text style={styles.deleteText}>
          Удалить учетную запись
        </Text>
      </TouchableOpacity>
    </>
  );
}

export default DeleteUser;
