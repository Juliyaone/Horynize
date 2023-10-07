import * as SecureStore from 'expo-secure-store';

export const saveCredentials = async (username, password) => {
  try {
    await SecureStore.setItemAsync('username', username);
    await SecureStore.setItemAsync('password', password);
  } catch (error) { /* empty */ }
};

export const getStoredCredentials = async () => {
  try {
    const username = await SecureStore.getItemAsync('username');
    const password = await SecureStore.getItemAsync('password');

    if (username && password) {
      return { username, password };
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not retrieve credentials', error);
    return null;
  }
};
