const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

// 1 Авторизация пользователя
app.post('/api/users/auth', (req, res) => {
  res.json({
    0: {
      jwt: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2hvcnluaXplLmV1cm9kaXIucnUiLCJhdWQiOiJodHRwczovL2hvcnluaXplLmV1cm9kaXIucnUiLCJpYXQiOjE2OTY2MTI4NjQsIm5iZiI6MTY5NjYxMjg2NCwiZXhwIjoxNjk2NjIwNjY0LCJkYXRhIjp7ImlkX3VzZXIiOjEsInVzZXJuYW1lIjoidmljdG9ydW5pMSIsImVtYWlsIjoiYWRtaW42QHNhbnJ1c2ttdi5ydSJ9fQ.PfdKEE1FZhJHzyJU0SCpjBKYcB699tyx1vujJ76mmOk', id_user: 1, username: 'victoruni1', email: 'admin6@sanruskmv.ru',
    },
    controllers: [{ id_controller: 6, name: '', id_model: 0 }],
  });
});

// 2 Регистрация пользователя
app.post('/api/users/reguser', (req, res) => {
  res.json({ message: 'User registered' });
});

// 3 Изменение данных пользователя
app.put('/api/users/edituser', (req, res) => {
  res.json({ message: 'User data updated' });
});

// 4 Список моделей
app.post('/api/info/models', (req, res) => {
  res.json({ models: [{ id_model: 1, name: 'Horynize.CF-500', img: 'http://95.142.39.79/images/models/Horynize.CF-500.png' }, { id_model: 2, name: 'Horynize.CF-700', img: 'http://95.142.39.79/images/models/Horynize.CF-700.png' }, { id_model: 3, name: 'Horynize.CF-1100', img: 'http://95.142.39.79/images/models/Horynize.CF-1100.png' }, { id_model: 4, name: 'Horynize.WF-1200', img: 'http://95.142.39.79/images/models/Horynize.WF-1200.png' }, { id_model: 5, name: 'Horynize.WF-800', img: 'http://95.142.39.79/images/models/Horynize.WF-800.png' }, { id_model: 6, name: 'Horynize.EF-450', img: 'http://95.142.39.79/images/models/Horynize.EF-450.png' }, { id_model: 7, name: 'Horynize.EF-700', img: 'http://95.142.39.79/images/models/Horynize.EF-700.png' }, { id_model: 8, name: 'Horynize.EF-400V', img: '' }, { id_model: 9, name: 'Horynize.EF-600V', img: '' }] });
});

// 5 Контакты производителя
app.get('/api/info/contacts', (req, res) => {
  res.json({
    contacts: [
      {
        name: 'ООО «Хоринайз»',
        phone: '8 (495) 120 08 38',
        email: 'info@horynize.ru',
        address: 'some address',
      },
    ],
  });
});

// 6 Список контроллеров пользователя
app.post('/api/vent-units/all', (req, res) => {
  res.json({ 0: { id_user: '' }, 'vent-units': [{ id_controller: 6, name: '' }] });
});

// 7 Привязка/отвязка, контроллера к пользователю,  редактирование custonName
app.post('/api/vent-units/bind', (req, res) => {
  res.json({ message: 'Controller bound/unbound' });
});

// 8 Получение параметров контроллера
app.post('/api/vent-units/getparams', (req, res) => {
  res.json({
    'vent-unit': [{ 'id_vent-unit': '6' }],
    data: [{
      enabled: '0', res: 3, tempChannel: 12, ZagrFiltr: 30, fanSpeedP: 1, fanSpeedV: 0, tempRoom: 22, humRoom: 42, co2Room: 0, tempTarget: 21, fanSpeedPTarget: 4, fanSpeedVTarget: 0, humRoomTarget: 39, co2RoomTarget: 0, mode: 2,
    }],
  });
});

// 9 Получить Список таймеров дня
app.get('/api/vent-units/timers', (req, res) => {
  res.json({
    // Your data here
  });
});

// 10 Установка параметров
app.post('/api/vent-units/setparams', (req, res) => {
  res.json({
    // Your data here
  });
});

// 11 Установка дней, для которых подключен таймер
app.post('/api/vent-units/setdaystimers', (req, res) => {
  res.json({ message: 'Days set for timers' });
});

// 12 Установка таймеров для дня
app.post('/api/vent-units/settimers', (req, res) => {
  res.json({ message: 'Timers set for the day' });
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
