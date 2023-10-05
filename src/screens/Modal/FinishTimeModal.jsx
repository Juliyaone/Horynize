import React, { useRef } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Platform } from 'react-native';

import TimePicker from '../../components/TimePicker';
import { LinearGradient } from 'expo-linear-gradient';
import ApplyIcon from '../../img/icons/apply';

function FinishTimeModal({ modalVisibleFinishTime, setModalVisibleFinishTime, setFinishTime }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisibleFinishTime(false);
        }
      },
    })
  ).current;

  const isAndroid = Platform.OS === 'android';


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibleFinishTime}
      onRequestClose={() => {
        setModalVisibleFinishTime(!modalVisibleFinishTime);
      }}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, isAndroid ? styles.modalViewTransparent : null]} {...panResponder.panHandlers}>
          {!isAndroid && <Text style={styles.modalText}>Завершение работы</Text>}

          <TimePicker closeModal={setModalVisibleFinishTime} setTime={setFinishTime} />

          {!isAndroid && (

            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => { setModalVisibleFinishTime(!modalVisibleFinishTime) }}>
              <LinearGradient
                colors={['#FEB84A', '#FF5204']}
                style={styles.gradientBackground}>
                <View style={styles.content}>
                  <ApplyIcon style={styles.icon} />
                  <Text style={styles.text}>Применить</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    position: 'relative',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1
  },
  modalView: {
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalViewTransparent: {
    backgroundColor: 'transparent',
    padding: 0,
    shadowColor: 'transparent',
    elevation: 0,
  },
  modalText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: "#212121",
    marginBottom: 10
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

export default FinishTimeModal;
