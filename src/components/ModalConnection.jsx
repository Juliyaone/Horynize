import React from 'react';
import {
  View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ConnectionIcon from '../img/icons/connectionIcon';
import GoodIcon from '../img/icons/goodIcon';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: screenHeight * 0.5,
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 10,
  },
  gradientBackground: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  iconConnection: {
    marginBottom: 30,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function ModalConnection({ connectionText, visible, onDismiss }) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
    >
      <TouchableOpacity style={styles.centeredView} onPress={onDismiss}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{connectionText}</Text>
          <View style={styles.iconConnection}>
            <ConnectionIcon />
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={onDismiss}>
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}
            >
              <View style={styles.content}>
                <GoodIcon style={styles.icon} />
                <Text style={styles.text}>Хорошо</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
