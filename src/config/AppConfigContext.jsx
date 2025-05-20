// src/config/AppConfigContext.jsx
import React, { createContext, useContext } from 'react';
import { tableColumns } from './configTable';
import { formFields } from './configForm';
import { features } from './appData';

export const AppConfigContext = createContext({
  tableColumns,
  formFields,
  features,
});

export const AppConfigProvider = ({ children }) => (
  <AppConfigContext.Provider value={{ tableColumns, formFields, features }}>
    {children}
  </AppConfigContext.Provider>
);

export const useAppConfig = () => useContext(AppConfigContext);
