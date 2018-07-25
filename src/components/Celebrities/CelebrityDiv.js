import React from 'react';

const searchUrl = 'https://www.google.com/search?newwindow=1&tbm=isch&q='

const CelebrityDiv = ({celeb}) => {
  return (
    <div className='b--dark-green bw1 br2 b--solid pa2 ma2 mt4 bg-washed-blue'>
      <a className='black' target="_blank" href={`${searchUrl}${celeb.name}`}>
        {`${celeb.name}`}
      </a>
      {` ${(celeb.prob*100).toFixed(3)}%`}
    </div>
  );
};

export default CelebrityDiv;
