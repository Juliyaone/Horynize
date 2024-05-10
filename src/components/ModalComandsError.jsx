import React, { useRef } from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity, PanResponder,
} from 'react-native';

import { responsiveFontSize } from 'react-native-responsive-dimensions';
import ErrorComponent from '../img/icons/error';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: responsiveFontSize(2.8),
    color: '#212121',
    marginBottom: 24,
  },
  boxBtnSchedule: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  btnTimeSchedule: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textBtnSchedule: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    color: '#212121',
  },
  boxBtnLabelSchedule: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  labelSchedule: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.8),
    color: '#787880',
    marginBottom: 7,
  },
  boxDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxDaysHeader: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.8),
    color: '#787880',
    marginBottom: 25,
  },
  dayText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.8),
    color: '#787880',
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  autoRunHeader: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(1.8),
    color: '#787880',
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
  text: {
    color: 'white',
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
  },
});

function ModalComandsError({ visible, onClose, text }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          onClose();
        }
      },
    }),
  ).current;

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >

      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>{text}</Text>
          <TouchableOpacity onPress={onClose}>
            <ErrorComponent />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModalComandsError;