import { Outlet } from 'react-router-dom';
import { Navbar } from '../ui/Navbar';

export const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Navbar /> 
      
      <main className="p-4">
        <Outlet /> 
      </main>
    </div>
  );
};