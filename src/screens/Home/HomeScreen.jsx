/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Dimensions, Image, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import TimeIcon from '../../img/icons/time';
import { useSendParamsMutation, useGetParamsQuery } from '../../redux/usersApi';
import PowerBtnIcon from '../../img/off.png';
import ModalError from '../../components/ModalError';
import ModalNotControllers from '../../components/ModalNotControllers';

import DetailedInfoImp from './sections/DetailedInfoImp';

import Loader from '../../components/Loader';

const screenWidth = Dimensions.get('window').width;
const gap = 10;
const totalGaps = gap * 4;
const buttonWidth = (screenWidth + totalGaps) / 5;
const fontSizeBtnText = buttonWidth * 0.12;
const calculatedLineHeight = buttonWidth * 0.12 + 0.1
const ImgWidth = buttonWidth * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 20,
  },
  boxImageHome: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatListContainerHome: {
    marginBottom: 23,
  },
  controlsBox: {
    width: buttonWidth,
    height: buttonWidth,
    marginRight: gap,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
  },
  controlsBoxBtn: {
    width: buttonWidth,
    height: buttonWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxPowerTextName: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#FFFFFF',
  },
  boxHomeDetaile: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  boxHomeDetaileItem: {
    display: 'flex',
    maxWidth: '33%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxHomeDetaileItemName: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  boxHomeDetaileItemText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#FFFFFF',
  },
  btnSchedule: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ED7635',
    padding: 7,
    marginBottom: 20,
    marginTop: 'auto',
  },
  btnScheduleText: {
    color: '#ED7635',
  },
  btnScheduleIcon: {
    marginRight: 10,
  },
  homeScreenInAciveControlsBox: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginBottom: 10,
  },
  homeScreenInAciveControlsBoxBtn: {
    width: buttonWidth,
    height: buttonWidth,
    marginRight: gap,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 10,
  },
  homeScreenInAciveControlsBoxBtnText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: fontSizeBtnText,
    lineHeight: calculatedLineHeight,
    textAlign: 'center',
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 4,
  },
  homeScreenInAciveControlsBoxIconBtn: {
    width: ImgWidth,
    height: ImgWidth,
    marginBottom: '5%',
  },
});
function HomeScreen({ navigation, route }) {
  const clickedControllerId = route?.params?.clickedControllerId ?? undefined;

  console.log('HomeScreen');

  const {
    data: paramsClickedController,
    isLoading: isCurrentControllerParamsLoading,
  } = useGetParamsQuery({ controllerId: String(clickedControllerId) });

  if (isCurrentControllerParamsLoading) {
    return <Loader />
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        { (clickedControllerId !== undefined && paramsClickedController) ? (
          <HomeScreenInAcive
            paramsClickedController={paramsClickedController}
            navigation={navigation}
            clickedControllerId={clickedControllerId}
          />
        ) : (
          <ModalNotControllers
            text="Вы не выбрали установку"
            navigation={navigation}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const images = {
  'http://95.142.39.79/images/models/Horynize.CF-500.png': require('../../img/devices/Horynize.CF-500.png'),
  'http://95.142.39.79/images/models/Horynize.CF-700.png': require('../../img/devices/Horynize.CF-700.png'),
  'http://95.142.39.79/images/models/Horynize.CF-1100.png': require('../../img/devices/Horynize.CF-1100.png'),
  'http://95.142.39.79/images/models/Horynize.WF-1200.png': require('../../img/devices/Horynize.WF-1200.png'),
  'http://95.142.39.79/images/models/Horynize.WF-800.png': require('../../img/devices/Horynize.WF-800.png'),
  'http://95.142.39.79/images/models/Horynize.EF-450.png': require('../../img/devices/Horynize.EF-450.png'),
  'http://95.142.39.79/images/models/Horynize.EF-700.png': require('../../img/devices/Horynize.EF-700.png'),
  // '': require('../../img/vav-active.png'),
};

function HomeScreenInAcive({ navigation, clickedControllerId, paramsClickedController }) {
  const [userStartError, setUserStartError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [sendParams, { isLoading: isLoadingSendParams }] = useSendParamsMutation();

  const models = useSelector((state) => state.contollers.models);
  const findUnitById = (id) => {
    const model = models?.find((item) => item.id_model === id);
    return model ? { img: model.img, name: model.name } : { img: null, name: null };
  };
  const unit = findUnitById(Number(clickedControllerId));

  const localImage = images[unit?.img];

  const sendParamsData = async () => {
    const params = {
      controllerId: String(clickedControllerId),
      start: '1',
    }
    try {
      await sendParams(params);
      navigation.navigate('HomeStack', { screen: 'HomePlay', params: { clickedControllerId } });
    } catch (error) {
      setErrorText(error.data.message);
      setUserStartError(true);
    }
  }

  const handleSettings = () => {
    if (clickedControllerId) {
      navigation.navigate(
        'HomeStack',
        {
          screen: 'HomeSchedule',
          params: { clickedControllerId: String(clickedControllerId) },
        },
      );
    }
  };

  if (isLoadingSendParams) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      {userStartError
        && (
        <ModalError
          errorText={errorText}
          visible={!!userStartError}
          onDismiss={() => setUserStartError(null)}
        />
        )}
      <View style={styles.container}>
        <View style={styles.homeScreenInAciveControlsBox}>
          <TouchableOpacity style={styles.homeScreenInAciveControlsBoxBtn} onPress={sendParamsData}>
            <Image source={PowerBtnIcon} style={styles.homeScreenInAciveControlsBoxIconBtn} />
            <Text style={styles.homeScreenInAciveControlsBoxBtnText}>Включить</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxImageHome}>
          <Text>{unit?.name}</Text>
          <Image source={localImage} />
        </View>

        {/* <TouchableOpacity style={styles.btnSchedule} onPress={handleSettings}>
          <TimeIcon style={styles.btnScheduleIcon} />
          <Text style={styles.btnScheduleText}>График работы</Text>
        </TouchableOpacity> */}

        <View style={{ marginTop: 'auto' }}>
          {paramsClickedController ? (
            <DetailedInfoImp currentContoller={paramsClickedController} />)
            : (
              <Loader />
            )}
        </View>
      </View>
    </View>
  );
}

export default HomeScreen;
