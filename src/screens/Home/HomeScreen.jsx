import React, { useState, useContext } from 'react';
import {
  View, Text, TouchableOpacity, Dimensions, Image, StyleSheet,
} from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { AuthContext } from '../../components/providers/AuthContext'
import { useSendParamsMutation, useGetParamsQuery } from '../../redux/usersApi';
import PowerBtnIcon from '../../img/off.png';
import ModalNotControllers from '../../components/ModalNotControllers';
import ModalComandsError from '../../components/ModalComandsError';

import DetailedInfoImp from './sections/DetailedInfoImp';
import ModalLoader from '../../components/ModalLoader';
import Loader from '../../components/Loader';

const screenWidth = Dimensions.get('window').width;
const gap = 10;
const totalGaps = gap * 4;
const buttonWidth = (screenWidth + totalGaps) / 5;
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
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
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
    fontSize: responsiveFontSize(1.6),
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  boxHomeDetaileItemText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 32,
    textAlign: 'center',
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
    padding: 0,
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
    width: '100%',
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    textAlign: 'center',
    color: '#787880',
    marginBottom: 4,
  },
  homeScreenInAciveControlsBoxIconBtn: {
    width: ImgWidth,
    height: ImgWidth,
    marginBottom: '5%',
  },
});

// Функция для динамического вычисления стилей
const dynamicBtnTextStyle = (buttonSize) => ({
  fontFamily: 'SFProDisplay',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: buttonSize * 0.13,
  lineHeight: buttonSize * 0.13 + 0.2,
  textAlign: 'center',
  color: '#787880',
  marginBottom: 4,
});

function HomeScreen({ navigation, route }) {
  const clickedControllerId = route?.params?.clickedControllerId ?? undefined;
  const { userControllers } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {(clickedControllerId !== undefined && userControllers) ? (
          <HomeScreenInAcive
            navigation={navigation}
            clickedControllerId={clickedControllerId}
            userControllers={userControllers}

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

function HomeScreenInAcive({ navigation, clickedControllerId }) {
  const [statusErrorCommands, setStatusErrorCommands] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    data: paramsClickedController,
    refetch: refetchCurrentParams,
  } = useGetParamsQuery({ controllerId: String(clickedControllerId) });

  const [sendParams] = useSendParamsMutation();

  const models = useSelector((state) => state.contollers.models);
  const findUnitById = (id) => {
    const model = models?.find((item) => item.id_model === id);
    return model ? { img: model.img, name: model.name } : { img: null, name: null };
  };
  const unit = findUnitById(Number(clickedControllerId));

  const sendParamsData = async () => {
    const params = {
      controllerId: String(clickedControllerId),
      start: '1',
    };
    try {
      const resStart = await sendParams(params);
      console.log('resStart', resStart);

      if (resStart.data && resStart.data.error) {
        setStatusErrorCommands(true);
        await refetchCurrentParams();
        return
      }
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate('HomeStack', { screen: 'HomePlay', params: { clickedControllerId } });
      }, 5000);
    } catch (error) {
      setStatusErrorCommands(true);
      await refetchCurrentParams();
      console.log('paramsClickedController', paramsClickedController);
    }
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
      <ModalLoader
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        text="Включаю..."
      />
      <ModalComandsError
        visible={statusErrorCommands}
        onClose={() => setStatusErrorCommands(false)}
        text="Команда не доставлена, попробуйте еще раз"
      />

      <View style={styles.container}>
        <View style={styles.homeScreenInAciveControlsBox}>
          <TouchableOpacity style={styles.homeScreenInAciveControlsBoxBtn} onPress={sendParamsData}>
            <Image source={PowerBtnIcon} style={styles.homeScreenInAciveControlsBoxIconBtn} />
            <Text
              style={dynamicBtnTextStyle(buttonWidth)}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Включить
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxImageHome}>
          <Text>{unit?.name}</Text>
          <Image source={{ uri: unit?.img }} style={styles.deviceImage} resizeMode="contain" />
        </View>

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
