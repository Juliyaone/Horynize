// const SERVER_URL = 'http://192.168.0.100' //Виктор
const SERVER_URL = 'https://horynize.cygenic.tech';
// const SERVER_URL = 'http://localhost:3000';
// const SERVER_URL = 'https://horynize.eurodir.ru';

// const SERVER_URL = 'http://95.142.39.79' //ip сервера

// https://horynize.eurodir.ru/api/vent-units/setparams

export const BASE_URL = `${SERVER_URL}/api`;

export const REGISTRATION = `${BASE_URL}/users/reguser`;
export const LOGIN = `${BASE_URL}/users/auth`;
export const CHANGE_PASSWORD = `${BASE_URL}/users/edituser`;
export const DELETE_USER = `${BASE_URL}/users/deleteuser`;

// /api/users/edituser

const UNITS = '/vent-units';

// Список контроллеров пользователя

export const GET_UNITS_USER = `${BASE_URL}${UNITS}/all`;

// Установка параметров
export const UNITS_SET_PARAMS = `${BASE_URL}${UNITS}/setparams`;

// Получение параметров контроллера (данные цели, даны датчиков)
export const UNITS_GET_PARAMS = `${BASE_URL}${UNITS}/getparams`;

// Приязка/отвязка, контроллера к пользователю,  редактирование custonName
export const UNITS_BIND = `${BASE_URL}${UNITS}/bind`;

// Получить Список  дней, для которых подключен таймер -----
export const UNITS_DAY_TIMERS = `${BASE_URL}${UNITS}/daytimers`;

// Получить Список таймеров дня -----
export const UNITS_TIMERS = `${BASE_URL}${UNITS}/timers`;

// Установка Список  дней, для которых подключен таймер
export const UNITS_SET_DAY_TIMERS = `${BASE_URL}${UNITS}/setdaystimers`;

// Установка таймеров для дня  (4 таймера на день)
export const UNITS_SET_TIMERS = `${BASE_URL}${UNITS}/settimers`;

const INFO = '/info';

export const GET_CONTACTS = `${BASE_URL}${INFO}/contacts`;
export const GET_UNITS = `${BASE_URL}${INFO}/models`;

// Авторизация для Алисы
export const URL_API_ENDPOINT = `${SERVER_URL}/oauth/login.php`;
