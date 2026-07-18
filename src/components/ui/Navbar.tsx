// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav style={{ 
      width: '100%', 
      height: '60px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 20px',
      boxSizing: 'border-box'
    }}>
      <ul style={{ 
        display: 'flex', 
        gap: '20px', 
        listStyle: 'none', 
        margin: 0, 
        padding: 0 
      }}>
        <li>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>
        <li>
          <Link to="/categories" style={{ color: '#fff', textDecoration: 'none' }}>Categories</Link>
        </li>
      </ul>
      <h3 style={{ margin: 0 }}>Money Map</h3>
    </nav>
  );
};