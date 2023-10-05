import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

function Loader() {
  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size='large' color="#FF5204"/>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '30%',
    margin: 0,
    padding: 20,
  },
})

export default Loader;