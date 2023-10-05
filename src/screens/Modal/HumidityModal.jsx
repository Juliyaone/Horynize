import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, PanResponder, Switch, Image } from 'react-native';
import Slider from '@react-native-community/slider';

import { LinearGradient } from 'expo-linear-gradient';
import mockAllFunctionsDevices from "../../redux/mockAllFunctionsDevices.json"

import HumidityDeactivateIcon from "../../img/humidity-deactive.png";
import Co2DeactiveIcon from "../../img/co2-deactive.png";
import VavDectiveIcon from "../../img/vav-deactive.png";

import HumidityActiveIcon from "../../img/humidity-active.png";
import Co2ActiveIcon from "../../img/co2-active.png";
import VavActiveIcon from "../../img/vav-active.png";

import HumidityBtnIcon from "../../img/icons/btnHumidity";

function HumidityModal({ modalVisible, setModalVisible, sendParamsHum, humTarget, setHumTarget, unitParams }) {

  // console.log('unitParams', unitParams);
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [valueSliderHumidity, setValueSliderHumidity] = useState(unitParams?.data[0].humRoomTarget);

  const [activeItems, setActiveItems] = useState([]);

  useEffect(() => {
    if (unitParams?.data[0]?.humRoomTarget) {
      setValueSliderHumidity(unitParams.data[0].humRoomTarget);
    }
  }, [unitParams]);

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

  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ];

  const iconSelector = (imageKeyIcon, active) => {
    if (active) {
      switch (imageKeyIcon) {
        case 'humidity':
          return HumidityActiveIcon;
        case 'Vav':
          return VavActiveIcon;
        case 'Co2':
          return Co2ActiveIcon;
        default:
          return null;
      }
    } else {
      switch (imageKeyIcon) {
        case 'humidity':
          return HumidityDeactivateIcon;
        case 'Vav':
          return VavDectiveIcon;
        case 'Co2':
          return Co2DeactiveIcon;
        default:
          return null;
      }
    }
  };

  // const handlePress = (itemId) => {
  //   if (activeItems.includes(itemId)) {
  //     setActiveItems(activeItems.filter((item) => item !== itemId));
  //   } else {
  //     setActiveItems([...activeItems, itemId]);
  //   }
  // };




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

          <Text style={styles.modalText}>Установка влажности</Text>

          <View style={styles.sliderBox}>

            <View style={styles.sliderBoxText}>
              <Text style={styles.sliderText}>25%</Text>
              <View style={styles.sliderValueBox}>
                <Text style={styles.sliderValueText}>{valueSliderHumidity}%</Text>
              </View>
              <Text style={styles.sliderText}>95%</Text>
            </View>
            <View style={styles.boxDays}>
              <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={25}
                maximumValue={95}
                step={1}
                minimumTrackTintColor="#ED7635"
                maximumTrackTintColor="#787880"
                onValueChange={setValueSliderHumidity}
                thumbTintColor={'#ED7635'}
                value={valueSliderHumidity}
                onSlidingComplete={(value) => setHumTarget(value.toString())}
              />
            </View>
          </View>

          {/* <View style={styles.boxAutoRun}>
            <Text style={styles.autoRunHeader}>Автоматический режим</Text>
              <Switch
                trackColor={{false: '#F7F7F7', true: '#34C759'}}
                thumbColor={isEnabled ? '#ffffff' : '#ffffff'}
                ios_backgroundColor="#F7F7F7"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
          </View>

          {isEnabled && (
            <View style={styles.boxAutoMode}>
              {mockAllFunctionsDevices.mockAllFunctionsDevices.map((item, index) => {
                const keyForRender = ['Vav', 'Влажность', 'Co2'];
                if (!keyForRender.includes(item.name)) {
                  return null;
                }
                return (
                  <TouchableOpacity
                    style={[
                      styles.boxAutoModeItem,
                      activeItems.includes(item.id) ? styles.boxAutoModeItemActive : null,
                    ]}
                    key={item.id}
                    onPress={() => handlePress(item.id)}
                  >
                    <Image
                      source={iconSelector(item.imageKeyIcon, activeItems.includes(item.id))}
                      style={{ width: 32, height: 32 }}
                    />
                    {item.name && (
                      <Text
                        style={[
                          styles.boxAutoModeText,
                          activeItems.includes(item.id) ? styles.boxAutoModeTextActive : null,
                        ]}
                      >
                        {item.name}
                      </Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          )} */}



          <TouchableOpacity activeOpacity={0.8} style={styles.button}
            onPress={sendParamsHum}>
            <LinearGradient
              colors={['#FEB84A', '#FF5204']}
              style={styles.gradientBackground}>
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
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: "#212121",
    marginBottom: 15
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
  boxDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25
  },
  sliderBox: {
    marginBottom: 25
  },
  boxAutoMode: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 23
  },
  boxAutoModeItem: {
    width: 79,
    heigh: 76,
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
    padding: 10
  },
  boxAutoModeText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    textAlign: "center",
    letterSpacing: 0.374,
    color: "#787880"
  },
  boxAutoModeItemActive: {
    borderColor: '#ED7635',
    borderWidth: 1,
  },
  boxAutoModeTextActive: {
    color: '#ED7635'
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
    padding: 10
  },
  sliderValueText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.374,
    color: "#787880"
  },
  sliderText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 0.374,
    color: "#787880"
  }

});

export default HumidityModal;
