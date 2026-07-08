import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { Alert } from '@/components/ui/Alert';
import { AlertContext } from './AlertContext';

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showAlert = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}
    </AlertContext.Provider>
  );
};