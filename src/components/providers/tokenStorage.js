import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokenToStorage = async (token) => {
  if (token !== null) {
    await AsyncStorage.setItem('userToken', token)
  } else {
    console.log('token не смогли записать в асинксторадж', token);
  }
}

// eslint-disable-next-line consistent-return
export const getTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token !== null) {
    return token;
  }
  console.log('нет токена в асинксторадж', token);
}

// TODO: delete
export const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};

export const deleteTokenFromStorage = async () => {
  await AsyncStorage.removeItem('userToken');
}
