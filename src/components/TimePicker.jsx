import React, { useState } from 'react';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimePicker({ setTime }) {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (selectedDate) {
      setDate(currentDate); // Обновляем текущую дату
      setTime(currentDate.getTime()); // Передаем время в формате таймстампа
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
