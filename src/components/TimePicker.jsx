import React, { useState } from 'react';
import { Button, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// TODO
export default function TimePicker({ closeModal, setTime }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');

    if (selectedDate) {
      setDate(selectedDate);
      setTime(selectedDate);

      if (Platform.OS === 'android') {
        closeModal(false);
      }
    }
  };

  return (
    <View
      style={
        Platform.OS === 'android'
          ? { position: 'absolute', zIndex: 99 }
          : {}
      }
    >
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour
        display="spinner"
        onChange={onChange}
      />
    </View>
  );
}
