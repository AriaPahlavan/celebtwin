import React from 'react';
import './FaceRecognition.css';
import BoxList from '../BoundaryBox/BoxList';


const FaceRecognition = ({ boxes, imageUrl }) => {

  return (
    <div className='center ma'>
      <div className='absolute pa2 mt2'>
        <img id='inputimage'
             src={imageUrl}
             alt=''
             width='500px'
             height='auto'
             />
         <BoxList boxes={boxes}/>
      </div>
    </div>
  );
};

export default FaceRecognition;
