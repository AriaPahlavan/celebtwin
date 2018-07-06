import React from 'react';
import './BoundaryBox.css';


const BoundaryBox = ({box}) => {
  const {top, left, bot, right} = box;
  
  return (
    <div className='bounding-box'
         style={{top: top,
                 left: left,
                 bottom: bot,
                 right: right,
                }}>
    </div>
  );
}

export default BoundaryBox;
