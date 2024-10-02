import React from 'react';
import logo from '../assets/Logo3.png'; 

const Logo = () => {
  return (
    <div>
      <div className="logo">
        <div className="logo-icon">
          <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} />
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
