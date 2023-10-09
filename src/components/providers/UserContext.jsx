import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(null);

  useEffect(() => {
    const today = new Date(); // Получаем текущую дату
    const dayOfWeek = today.getDay(); // Получаем номер дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
    setCurrentDayOfWeek(dayOfWeek);
  }, []);

  const value = useMemo(() => ({
    currentDayOfWeek,
  }), [currentDayOfWeek])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
