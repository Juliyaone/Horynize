import React, { useState } from 'react';
import { Button, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const isAndroid = Platform.OS === 'android';
const isIos = Platform.OS === 'ios';

export default function TimePickerAndroid({ onClose, setTime }) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');

  const onChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setTime(selectedDate.getTime()); // Передаем время в формате таймстампа

      if (isAndroid && event.type === 'set') {
        onClose(false);
      }
    }
  };
  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        locale="ru-RU"
        mode="time"
        is24Hour={true}
        display="spinner" // Стиль отображения
        onChange={onChange}
      />
    </View>
  );
}
