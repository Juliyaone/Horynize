import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default function ModalError({
  errorText, visible, onDismiss, navigation, screenName,
}) {
  const handleDismiss = () => {
    onDismiss();
    if (navigation && screenName) {
      navigation.navigate(screenName);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <TouchableOpacity style={styles.centeredView} onPress={handleDismiss}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{errorText}</Text>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
