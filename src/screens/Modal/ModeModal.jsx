import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Image,
} from 'react-native';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';


import { LinearGradient } from 'expo-linear-gradient';

import CoolingActiveIcon from '../../img/cooling.png';
import CoolingDeactiveIcon from '../../img/cooling-grey.png';

import TempActiveIcon from '../../img/temp.png';
import TempDeactiveIcon from '../../img/temp-grey.png';

import VentActiveIcon from '../../img/fan.png';
import VentDeactiveIcon from '../../img/fan-grey.png';

import HumidityBtnIcon from '../../img/icons/btnHumidity';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    minHeight: '50%',
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
    fontSize: responsiveFontSize(2.8),
    color: '#212121',
    marginBottom: 15,
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
  boxDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  sliderBox: {
    marginBottom: 25,
  },
  boxAutoMode: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 23,
  },
  boxAutoModeItem: {
    width: responsiveWidth(23), // Задает ширину как 20% от ширины экрана
    height: responsiveHeight(12), // Задает высоту как 10% от высоты экрана
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    borderColor: 'transparent',
    borderWidth: 1,
    elevation: 1,
    marginBottom: 15,
    padding: 10,
  },
  boxAutoModeItemActive: {
    borderColor: '#ED7635',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  boxAutoModeText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: responsiveFontSize(1.5),
    textAlign: 'center',
    color: '#787880',
  },
  boxAutoModeTextActive: {
    color: '#ED7635',
  },
  sliderBoxText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderValueBox: {
    width: 79,
    heigh: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15,
    padding: 10,
  },
  sliderValueText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
  },
  sliderText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: responsiveFontSize(2.1),
    color: '#787880',
  },
});

const iconSelector = (imageKeyIcon, active) => {
  if (active) {
    switch (imageKeyIcon) {
      case 'Cooling':
        return CoolingActiveIcon;
      case 'Temp':
        return TempActiveIcon;
      case 'Vent':
        return VentActiveIcon;
      case 'Auto':
        return 'auto';
      default:
        return null;
    }
  } else {
    switch (imageKeyIcon) {
      case 'Cooling':
        return CoolingDeactiveIcon;
      case 'Temp':
        return TempDeactiveIcon;
      case 'Vent':
        return VentDeactiveIcon;
      case 'Auto':
        return 'auto';
      default:
        return null;
    }
  }
};

// Функция для получения массива доступных режимов в зависимости от avalibleMode
function getAvailableModes(avalibleMode) {
  const modes = [];
  if (avalibleMode === 3) {
    // Вентиляция, нагрев, охлаждение, климат-контроль
    modes.push(
      { id: 1, name: 'Вентиляция', imageKeyIcon: 'Vent' },
      { id: 2, name: 'Hагрев', imageKeyIcon: 'Temp' },
      { id: 3, name: 'Oхлаждение', imageKeyIcon: 'Cooling' },
      { id: 4, name: 'Климат-контроль', imageKeyIcon: 'Auto' },
    );
  } else if (avalibleMode === 2) {
    // Вентиляция, нагрев
    modes.push(
      { id: 1, name: 'Вентиляция', imageKeyIcon: 'Vent' },
      { id: 2, name: 'Hагрев', imageKeyIcon: 'Temp' },
    );
  } else if (avalibleMode === 1) {
    // Вентиляция, охлаждение
    modes.push(
      { id: 1, name: 'Вентиляция', imageKeyIcon: 'Vent' },
      { id: 3, name: 'Oхлаждение', imageKeyIcon: 'Cooling' },
    );
  }
  return modes;
}

const keyForRender = ['Temp', 'Vent', 'Cooling', 'Auto'];

function ModeModal({
  modalVisible, setModalVisible, sendParamsData, unitId, resMode, avalibleMode, changeParams, scrollToIndex,
}) {
  const [activeItem, setActiveItem] = useState(Number(resMode));

  const modesData = getAvailableModes(avalibleMode);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 50) {
          setModalVisible(false);
        }
      },
    }),
  ).current;

  const handlePress = (itemId) => {
    if (activeItem === itemId) {
      setActiveItem(null);
    } else {
      setActiveItem(itemId);
    }
  };

  const onPress = useCallback(() => {
    if (activeItem) {
      sendParamsData({
        controllerId: String(unitId),
        res: String(activeItem),
      });
      changeParams({
        res: String(activeItem),
      })
    }
    scrollToIndex(0) // прокрутка к режиму
    setModalVisible(false);
  }, [activeItem, changeParams, scrollToIndex, sendParamsData, setModalVisible, unitId]);

  if (resMode === undefined || avalibleMode === undefined) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView} {...panResponder.panHandlers}>
          <Text style={styles.modalText}>Автоматический режим</Text>
          <View style={styles.boxAutoMode}>
            {modesData.map((item) => {
              const iconOrText = iconSelector(item.imageKeyIcon, activeItem === item.id);
              if (!keyForRender.includes(item.imageKeyIcon)) {
                return null;
              }
              return (
                <TouchableOpacity
                  style={[
                    styles.boxAutoModeItem,
                    activeItem === item.id ? styles.boxAutoModeItemActive : null,
                  ]}
                  key={item.id}
                  onPress={() => handlePress(item.id)}
                >
                  {typeof iconOrText === 'string' ? (
                    <Text style={{ fontSize: responsiveFontSize(2.8), color: activeItem === item.id ? '#ED7635' : '#787880' }}>
                      {iconOrText}
                    </Text>
                  ) : (
                    <Image
                      source={iconOrText}
                      style={{ width: 32, height: 32 }}
                    />
                  )}
                  {item.name && (
                    <Text
                      style={[
                        styles.boxAutoModeText,
                        activeItem === item.id ? styles.boxAutoModeTextActive : null,
                      ]}
                    >
                      {item.name}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={onPress}
          >
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}
            >
              <View style={styles.content}>
                <HumidityBtnIcon style={styles.icon} />
                <Text style={styles.text}>Применить</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default ModeModal;
