import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'

const Logo = () => {
  const logoSrc = "favicon.png";

  return (
    <div className='ma1'>
      <Tilt className="Tilt br2 shadow-2"
            options={{ max : 30 }}
            style={{ height: 100, width: 100 }} >
       <div className="Tilt-inner pa3">
         <img src={logoSrc}
              alt='logo'/>
       </div>
      </Tilt>
    </div>
  );
};

export default Logo;
