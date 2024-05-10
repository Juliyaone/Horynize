import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokenToStorage = async (token) => {
  if (token !== null) {
    await AsyncStorage.setItem('userToken', token)
  } else {
    console.log('token не смогли записать в асинксторадж', token);
  }
}

export const getUserIdFromStorage = async () => {
  try {
    const userId = await AsyncStorage.getItem('userIdAsyncStorage');
    return userId;
  } catch (err) {
    console.log(`текущий id юзера не получен ${err}`);
    return null;
  }
};

export const saveRefreshTokenToStorage = async (refreshToken) => {
  if (refreshToken !== null) {
    await AsyncStorage.setItem('userRefreshToken', refreshToken)
  } else {
    console.log('refreshToken не смогли записать в асинксторадж', refreshToken);
  }
}

export const getRefreshTokenFromStorage = async () => {
  const userRefreshToken = await AsyncStorage.getItem('userRefreshToken')
  if (userRefreshToken !== null) {
    return userRefreshToken;
  }
  console.log('нет userRefreshToken в асинксторадж', userRefreshToken);
}

// eslint-disable-next-line consistent-return
export const getTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token !== null) {
    return token;
  }
  console.log('нет токена в асинксторадж', token);
}

export const deleteTokenFromStorage = async () => {
  await AsyncStorage.removeItem('userToken');
}
