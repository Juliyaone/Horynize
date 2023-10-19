import React from 'react';
import {
  View, Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../HomeScreenStyle';

function DetailedInfoImp({ currentContoller }) {
  const { params } = currentContoller;

  console.log('paramsDetailedInfoImp', params);

  const keyForRender = ['humRoom', 'tempChannel', 'tempRoom', 'fanSpeedPTarget', 'co2Room'];

  const result = () => Object.entries(params).map((item) => {
    if (!keyForRender.includes(item[0])) {
      return null;
    }

    return (
      <View style={styles.boxHomeDeviceFunctionsItem} key={item[0]}>
        {(item[0] === 'humRoom') && <Text style={styles.boxDeviceFunctionsItemName}>Влажность</Text>}
        {(item[0] === 'humRoom') && (
          <Text style={styles.boxDeviceFunctionsItemText}>
            {Math.round(item[1])}
            %
          </Text>
        )}

        {(item[0] === 'tempChannel')
          && <Text style={styles.boxDeviceFunctionsItemName}>Температура на улице</Text>}
        {(item[0] === 'tempChannel') && (
          <Text style={styles.boxDeviceFunctionsItemText}>
            {Math.round(item[1])}
            °C
          </Text>
        )}

        {(item[0] === 'tempRoom')
          && <Text style={styles.boxDeviceFunctionsItemName}>Температура в помещении</Text>}
        {(item[0] === 'tempRoom') && (
          <Text style={styles.boxDeviceFunctionsItemText}>
            {Math.round(item[1])}
            °C
          </Text>
        )}

        {(item[0] === 'fanSpeedPTarget') && <Text style={styles.boxDeviceFunctionsItemName}>Скорость вращения</Text>}
        {(item[0] === 'fanSpeedPTarget')
          && <Text style={styles.boxDeviceFunctionsItemText}>{Math.round(item[1])}</Text>}

        {(item[0] === 'co2Room') && <Text style={styles.boxDeviceFunctionsItemName}>СО2</Text>}
        {(item[0] === 'co2Room') && <Text style={styles.boxDeviceFunctionsItemText}>{Math.round(item[1])}</Text>}
      </View>
    );
  });

  return (
    <LinearGradient
      colors={['#FEB84A', '#FF5204']}
      style={{
        borderRadius: 12,
        width: '100%',
        paddingTop: 14,
        paddingBottom: 4,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    >
      <View style={styles.boxHomeDeviceFunctions}>
        {result()}
      </View>
    </LinearGradient>
  );
}

export default DetailedInfoImp;
