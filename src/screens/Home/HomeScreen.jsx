import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';

import { useSendParamsMutation, useGetUnitsAllQuery } from '../../redux/usersApi';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import PowerBtnIcon from '../../img/icons/powerBtn';
import { UserContext } from '../../components/providers/UserContext';

import ModalError from '../../components/ModalError';
import ModalСonnection from '../../components/ModalСonnection';

import Loader from '../../components/Loader';


function HomeScreen({ navigation, route }) {
  const { clickedDevice } = route.params;

  const [userStartError, setUserStartError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [connectionText, setConnectionText] = useState('Устройство отключено');

  const [start, setStart] = useState('1');

  const [sendParams, { isLoading: isLoadingSendParams }] = useSendParamsMutation();

  const { data: unitsAll, error: errorUnitsAll, isLoader: isLoaderGetUnits } = useGetUnitsAllQuery();

  const { userData, isConnection, setIsConnection, unitId } = useContext(UserContext);


  useEffect(() => {
    if (unitsAll && unitsAll.models) {
      console.log('unitsAll', unitsAll);
    }
  }, [unitsAll]);


  console.log('clickedDevice', clickedDevice);

  const findUnitById = (id) => {
    const model = unitsAll.models.find((model) => model.id_model === id);
    return model ? { img: model.img, name: model.name } : { img: null, name: null };
  };
  const unit = findUnitById(clickedDevice);


  const images = {
    'http://95.142.39.79/images/models/Horynize.CF-500.png': require('../../img/devices/Horynize.CF-500.png'),
    'http://95.142.39.79/images/models/Horynize.CF-700.png': require('../../img/devices/Horynize.CF-700.png'),
    'http://95.142.39.79/images/models/Horynize.CF-1100.png': require('../../img/devices/Horynize.CF-1100.png'),
    'http://95.142.39.79/images/models/Horynize.WF-1200.png': require('../../img/devices/Horynize.WF-1200.png'),
    'http://95.142.39.79/images/models/Horynize.WF-800.png': require('../../img/devices/Horynize.WF-800.png'),
    'http://95.142.39.79/images/models/Horynize.EF-450.png': require('../../img/devices/Horynize.EF-450.png'),
    'http://95.142.39.79/images/models/Horynize.EF-700.png': require('../../img/devices/Horynize.EF-700.png'),

    '': require('../../img/vav-active.png'),
    '': require('../../img/vav-active.png'),

  };

  const localImage = images[unit.img];

  const sendParamsData = async () => {
    setStart('1');

    const params = {
      "controllerId": unitId,
      "start": start
    }
    try {
      const answerSend = await sendParams(params);
      console.log('answerSend', answerSend);
      navigation.navigate('HomeStack', { screen: 'HomePlay', params: { unitsId: unitId } });

    } catch (error) {
      console.log('error', error);
      setErrorText(error.data.message);
      setUserStartError(true);
    }
  }

  if (isLoadingSendParams || isLoaderGetUnits) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView>

        {userStartError &&
          <ModalError
            errorText={errorText}
            visible={!!userStartError}
            onDismiss={() => setUserStartError(null)}
          />
        }

        {isConnection &&
          <ModalСonnection
            connectionText={connectionText}
            visible={!!isConnection}
            onDismiss={() => setIsConnection(null)}
          />
        }

        <View style={styles.container}>
          <View style={styles.boxPowerBtnBox}>
            <TouchableOpacity style={styles.boxPowerBtn} onPress={sendParamsData}>
              <PowerBtnIcon />
              <Text style={styles.boxPowerBtnText}>Питание</Text>
            </TouchableOpacity>
          </View>

          <Image source={localImage} />
          <Text>{unit.name}</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
  },
  flatListContainerHome: {
    marginBottom: 23,
  },
  boxPowerBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1, // для Android
  },
  boxPowerBtnBox: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginBottom: 20,
  },
  boxPowerBtnText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.374,
    color: "#787880",
    marginBottom: 4
  },
  boxPowerText: {
  },
  boxPowerBtnTextName: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.374,
    color: "#787880",
    marginBottom: 6
  },
  boxFunctionDevices: {
    width: 130,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15
  },
  itemMargin: {
    marginRight: 12,
  },
  functionDevicesBtn: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxPowerTextName: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    letterSpacing: 0.374,
    color: "#FFFFFF"
  },
  boxHomeDeviceFunctions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',

  },
  boxHomeDeviceFunctionsItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  boxDeviceFunctionsItemName: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    letterSpacing: 0.374,
    color: "#FFFFFF"
  },
  boxDeviceFunctionsItemText: {
    fontFamily: "SFProDisplay",
    fontStyle: "normal",
    fontWeight: '600',
    fontSize: 32,
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: 0.374,
    color: "#FFFFFF"
  }
});

export default HomeScreen;

