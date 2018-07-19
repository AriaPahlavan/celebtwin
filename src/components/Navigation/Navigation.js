import React from 'react';
import Logo from '../Logo/Logo';

const gap = <div style={{flexBasis: '0', flexGrow: '20'}}></div>;

const navItemGen = onRouteChange => (name, routeChangeCallback) => {
  return (
    <p style={{alignSelf:'center'}}
      onClick={() => onRouteChange(routeChangeCallback)}
      className='f3 pa2 mt0 link dim black underline pointer'>
      {name}
    </p>
  );
};


const Navigation = ({ onRouteChange, isSingedIn}) => {
  const navItemFor = navItemGen(onRouteChange);

  if (isSingedIn) {
    return (
      <nav style={{display:'flex'}}>
        <Logo />
        {gap}
        {navItemFor('Sign Out', 'signin')}
      </nav>
    );
  } else {
      return (
        <nav style={{display:'flex'}}>
          <Logo />
          {gap}
          {navItemFor('Sign In', 'signin')}
          {navItemFor('Register', 'register')}
        </nav>
      );
    }
}


export default Navigation;
