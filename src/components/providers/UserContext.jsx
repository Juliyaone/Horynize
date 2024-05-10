import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import { getDay } from 'date-fns';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState(null);

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = getDay(today); // Возвращает день недели от 0 (воскресенье) до 6 (суббота)
    // Для смещения, чтобы понедельник был 0, воскресенье - 6
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
