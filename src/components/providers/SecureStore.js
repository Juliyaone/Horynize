import * as SecureStore from 'expo-secure-store';

export const saveCredentials = async (username, password) => {
  try {
    const usernameSS = await SecureStore.setItemAsync('username', username);
    const passwordSS = await SecureStore.setItemAsync('password', password);
    console.log('usernameSS', usernameSS);
    console.log('passwordSS', passwordSS);
  } catch (error) {
    console.error('Could not save credentials', error);
  }
};

export const getStoredCredentials = async () => {
  try {
    const username = await SecureStore.getItemAsync('username');
    const password = await SecureStore.getItemAsync('password');

    if (username && password) {
      return { username, password };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Could not retrieve credentials', error);
    return null;
  }
};

