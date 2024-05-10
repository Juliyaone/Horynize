const SERVER_URL = 'https://smart.horynize.ru';

export const BASE_URL = `${SERVER_URL}/api`;

export const REGISTRATION = `${BASE_URL}/users/reguser`;
export const LOGIN = `${BASE_URL}/users/auth`;
export const CHANGE_PASSWORD = `${BASE_URL}/users/edituser`;
export const DELETE_USER = `${BASE_URL}/users/deleteuser`;
export const REFRESH_TOKEN = `${BASE_URL}/users/check_refresh_token.php`;

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

export const GET_USER_TOKENS = `${BASE_URL}${UNITS}/getusertokens`;

const INFO = '/info';

export const GET_CONTACTS = `${BASE_URL}${INFO}/contacts`;
export const GET_UNITS = `${BASE_URL}${INFO}/models`;
