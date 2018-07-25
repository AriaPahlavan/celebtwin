import React from 'react';
import CelebrityDiv from './CelebrityDiv';

const Celebrities = ({celebs}) => {
  if (celebs === undefined || celebs.length === 0)
    return <div/>;

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      { celebs.map((celeb, i) => <CelebrityDiv key={i} celeb={celeb}/>) }
    </div>
  );
};

export default Celebrities;
