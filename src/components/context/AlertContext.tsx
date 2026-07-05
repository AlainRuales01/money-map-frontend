import { createContext, useContext } from 'react';

export interface AlertContextType {
  showAlert: (message: string, type?: 'success' | 'error' | 'info') => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within a provider');
  }
  return context;
};