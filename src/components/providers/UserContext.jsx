import React, {
  createContext, useState, useEffect, useContext, useMemo,
} from 'react';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [isConnection, setIsConnection] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    id: '',
    units: '',
    jwt: '',
    id_model: '',
    name_model: '',
  });

  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(null);

  const { unitId } = useContext(AuthContext);

  useEffect(() => {
    const today = new Date(); // Получаем текущую дату
    const dayOfWeek = today.getDay(); // Получаем номер дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
    setCurrentDayOfWeek(dayOfWeek);
  }, []);

  const value = useMemo(() => ({
    userId, setUserId, userData, setUserData, setIsConnection, isConnection, currentDayOfWeek, unitId,
  }), [currentDayOfWeek, isConnection, unitId, userData, userId])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
