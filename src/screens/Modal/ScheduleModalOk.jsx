import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Switch } from 'react-native';

import BtnOkIcon from '../../img/icons/btnOk';
import { LinearGradient } from 'expo-linear-gradient';

function ScheduleModalOk({ modalVisible, setModalVisible }) {


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisible(false);
        }
      },
    })
  ).current;


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >

      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>График работы установлен</Text>

          <View style={styles.boxBtnSchedule}>


          </View>


          <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => { setModalVisible(!modalVisible) }}>
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}>
              <View style={styles.content}>
                <BtnOkIcon style={styles.icon} />
                <Text style={styles.text}>Хорошо</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>


        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: "#212121",
    marginBottom: 24
  },
  boxBtnSchedule: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  btnTimeSchedule: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  textBtnSchedule: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0.374,
    color: "#212121"
  },
  boxBtnLabelSchedule: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  labelSchedule: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: "#787880",
    marginBottom: 7
  },
  boxDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  boxDaysHeader: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: "#787880",
    marginBottom: 25
  },
  dayText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: "#787880"
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25
  },
  autoRunHeader: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: "#787880",
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 10
  },
  gradientBackground: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScheduleModalOk;