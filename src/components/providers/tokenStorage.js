import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokenToStorage = async (token) => {
  if (token !== null) {
    await AsyncStorage.setItem('userToken', token)
    console.log('token записали в асинксторадж', token);
  } else {
    console.log('token не смогли записать в асинксторадж', token);
  }
}

export const getTokenFromStorage = async () => {
  const token = await AsyncStorage.getItem('userToken');
  if (token !== null) {
    // console.log('token получили из асинксторадж', token);
    return token;
  }
  console.log('нет токена в асинксторадж', token);
}

export const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    return false;
  }
};


// TODO: not exist on back
export const refreshToken = async () => {
  // Здесь ваш API-запрос для обновления токена.
  // Используйте AsyncStorage для сохранения нового токена.
  // Верните новый токен или null, если обновление не удалось.
  const refreshToken = await AsyncStorage.getItem('refreshToken'); 
  // предполагается, что вы также сохраняете refreshToken
  if (refreshToken) {
    try {
      const response = await fetch('YOUR_REFRESH_TOKEN_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      if (data.access_token) {
        await saveTokenToStorage(data.access_token);
        return data.access_token;
      }
      return null;
    } catch (err) {
      return null;
    }
  }
  return null;
};

export const deleteTokenFromStorage = async () => {
  await AsyncStorage.removeItem('userToken');
}
