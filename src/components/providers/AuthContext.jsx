import React, {
  createContext, useState, useEffect, useMemo, useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState('');
  const [unitId, setUnitId] = useState('');
  const [userName, setUserName] = useState('');
  const [userControllers, setAllControllers] = useState();
  const [userEmail, setUserEmail] = useState('');

  const [isInitialized, setIsInitialized] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const signIn = useCallback(async (data) => {
    try {
      const {
        token, controllerId, userIdData = [], controllers, email, userNameData, refreshToken,
      } = data;
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRefreshToken', refreshToken);
      await AsyncStorage.setItem('idControllerAsyncStorage', controllerId);
      await AsyncStorage.setItem('userIdAsyncStorage', userIdData);
      await AsyncStorage.setItem('controllersAsyncStorage', JSON.stringify(controllers));
      await AsyncStorage.setItem('emailAsyncStorage', email);
      await AsyncStorage.setItem('userNameAsyncStorage', userNameData);

      setUserName(userNameData);
      setUserToken(token);
      setUserId(userIdData);
      setUnitId(controllerId);
      setAllControllers(controllers);
      setUserEmail(email);
    } catch (error) {
      console.log(`Не удалось сохранить токен в AsyncStorage: ${error}`);
    }
  }, []);

  const getUserToken = async () => {
    try {
      const userTokenData = await AsyncStorage.getItem('userToken');
      setUserToken(userTokenData);
      return userTokenData;
    } catch (err) {
      console.log(`Токен не получен ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserUnitId = async () => {
    try {
      const id = await AsyncStorage.getItem('idControllerAsyncStorage');
      setUnitId(id);
      return id;
    } catch (err) {
      console.log(`текущий id установки не получен ${err}`);
    }
  };

  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userIdAsyncStorage');
      setUserId(id);
      return id;
    } catch (err) {
      console.log(`текущий id юзера не получен ${err}`);
    }
  };

  const getAllControllers = async () => {
    try {
      let allControllersData = await AsyncStorage.getItem('controllersAsyncStorage');
      if (allControllersData !== null) {
        allControllersData = JSON.parse(allControllersData);
        setAllControllers(allControllersData);
        return allControllersData;
      }
      return allControllersData;
    } catch (err) {
      console.log(`Все контроллеры не получены ${err}`);
    }
  };

  const getEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('emailAsyncStorage');
      setUserEmail(email);
      return email;
    } catch (err) {
      console.log(`email не получен ${err}`);
    }
  };

  const getUserName = useCallback(async () => {
    try {
      const userNameData = await AsyncStorage.getItem('userNameAsyncStorage');
      setUserName(userNameData);
      return userNameData;
    } catch (err) {
      console.log(`логин пользльзователя не получен ${err}`);
    }
  }, []);

  const unlinkController = useCallback(async (controllerIdToRemove) => {
    // Фильтрация списка контроллеров для исключения отвязанного

    const updatedControllers = userControllers.filter((controller) => controller.id_controller != controllerIdToRemove);

    // Обновление состояния и AsyncStorage
    try {
      await AsyncStorage.setItem('controllersAsyncStorage', JSON.stringify(updatedControllers));
      setAllControllers(updatedControllers); // Обновляем состояние
    } catch (err) {
      console.log(`Ошибка при обновлении контроллеров: ${err}`);
    }
  }, [userControllers]);

  const bindController = useCallback(async (controllerData) => {
    try {
      if (!controllerData) {
        console.error('No data received for new controller');
        return;
      }

      const newController = {
        id_controller: controllerData.controllerID,
        id_model: controllerData.id_model,
        name: controllerData.name,
      };

      const updatedControllers = [...(userControllers || []), newController];
      await AsyncStorage.setItem('controllersAsyncStorage', JSON.stringify(updatedControllers));

      setAllControllers(updatedControllers); // Обновляем состояние с новым списком контроллеров
    } catch (error) {
      console.error(`Ошибка при привязке нового контроллера: ${error}`);
    }
  }, [userControllers]);

  const bindControllerEditName = useCallback(async (controllerData) => {
    try {
      if (!controllerData) {
        console.error('No data received for controller name update');
        return;
      }

      // Find the index of the controller that needs to be updated
      const controllerIndex = userControllers.findIndex((c) => c.id_controller === controllerData.controllerid);

      if (controllerIndex === -1) {
        console.error('Controller not found');
        return;
      }
      const updatedControllers = [...userControllers];
      updatedControllers[controllerIndex] = {
        ...updatedControllers[controllerIndex],
        name: controllerData.customName,
      };

      await AsyncStorage.setItem('controllersAsyncStorage', JSON.stringify(updatedControllers));
      setAllControllers(updatedControllers);
    } catch (error) {
      console.error(`Error updating controller name: ${error}`);
    }
  }, [userControllers]);

  useEffect(() => {
    console.log('userControllers', userControllers);

    const initializeAsync = async () => {
      await getUserToken();
      await getUserUnitId();
      await getUserId();
      await getAllControllers();
      await getEmail();
      await getUserName();
      setIsInitialized(true); // Устанавливается после загрузки всех данных
    };

    initializeAsync();
  }, [getUserName]);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('idControllerAsyncStorage');
      await AsyncStorage.removeItem('userIdAsyncStorage');
      await AsyncStorage.removeItem('controllersAsyncStorage');
      await AsyncStorage.removeItem('emailAsyncStorage');
      await AsyncStorage.removeItem('userNameAsyncStorage');

      setUserId(null);
      setUnitId(null);
      setUserToken(null);
      setAllControllers(null);
      setUserEmail(null);
      setIsLoading(false);
      setUserName(null);
    } catch (error) {
      console.log(`Не удалось удалить токен или UserId или UnitId: ${error}`);
    }
  }, []);

  const value = useMemo(() => ({
    userToken,
    isLoading,
    isInitialized,
    unlinkController,
    bindController,
    bindControllerEditName,
    signIn,
    signOut,
    unitId,
    userId,
    userControllers,
    userEmail,
    userName,
    setUserId,
  }), [userToken, isLoading, isInitialized, signIn, signOut, unitId, userId, userControllers, userEmail, userName, unlinkController, bindController, bindControllerEditName]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
