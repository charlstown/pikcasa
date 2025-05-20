// src/config/AppConfigContext.jsx
import React, { createContext, useContext } from 'react';
import { configTable } from './configTable';
import { configForm } from './configForm';
import { appData } from './appData';

export const AppConfigContext = createContext({
  configTable,
  configForm,
  appData,
});

export const AppConfigProvider = ({ children }) => (
  <AppConfigContext.Provider value={{ configTable, configForm, appData }}>
    {children}
  </AppConfigContext.Provider>
);

export const useAppConfig = () => useContext(AppConfigContext);
