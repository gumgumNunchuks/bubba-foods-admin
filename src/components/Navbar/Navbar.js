import React from 'react';
import logo from '../Navbar/logo.png';

function Navbar() {
  return (
    <nav style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
      <img src={logo} alt="Bubba Foods" style={{ height: '50px' }} />
      <h1 style={{ color: 'orange' }}>Bubba Foods</h1>
      <button style={{ backgroundColor: 'transparent', border: 'none', color: 'gray', fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
    </nav>
  );
}

export default Navbar;
