import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sharedVariable, setSharedVariable] = useState(false);

  return (
    <AppContext.Provider value={{ sharedVariable, setSharedVariable }}>
      {children}
    </AppContext.Provider>
  );
};
