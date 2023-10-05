import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../providers/AuthContext";
// import { useGetParamsQuery } from '../../redux/usersApi';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState('');
  const [isConnection, setIsConnection] = useState(false);

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    id: '',
    units: '',
    jwt: '',
    id_model: '',
    name_model: ''
  });

  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(null);
  
  const { unitId } = useContext(AuthContext);

  useEffect(() => {
    const today = new Date(); // Получаем текущую дату
    const dayOfWeek = today.getDay(); // Получаем номер дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
    setCurrentDayOfWeek(dayOfWeek);
  }, []);

  return (
      <UserContext.Provider value={{ userId, setUserId,  userData, setUserData, setIsConnection, isConnection, currentDayOfWeek, unitId }}>
        {children} 
      </UserContext.Provider>
  );
}
