// src/config/AppConfigContext.jsx
import React, { createContext, useContext } from 'react';
import { tableColumns } from './configTable';
import { configForm } from './configForm';
import { appData } from './appData';

export const AppConfigContext = createContext({
  tableColumns,
  configForm,
  appData,
});

export const AppConfigProvider = ({ children }) => (
  <AppConfigContext.Provider value={{ tableColumns, configForm, appData }}>
    {children}
  </AppConfigContext.Provider>
);

export const useAppConfig = () => useContext(AppConfigContext);
