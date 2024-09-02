import React, { createContext, useState } from 'react';

export const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [lessons, setLessons] = useState([]);

  return (
    <LessonContext.Provider value={{ lessons }}>
      {children}
    </LessonContext.Provider>
  );
};
