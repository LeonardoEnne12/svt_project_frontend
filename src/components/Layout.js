import React from 'react';

const Layout = ({ children }) => {
  return (
    <div>
      <header style={{ 
          backgroundColor: 'rgb(33, 90, 54)', 
          padding: '10px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between' 
      }}>
        <img src="/logo.png" alt="Logo" style={{ marginLeft: '10px' }} />

        <span style={{ 
            color: 'white', 
            fontSize: '50px',
            position: 'absolute', 
            fontFamily: 'Times New Roman',
            width: '100%',
            textAlign: 'center', 
            left: 0,
        }}>
          Unifesp
        </span>

        <div style={{ width: '50px' }}></div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
