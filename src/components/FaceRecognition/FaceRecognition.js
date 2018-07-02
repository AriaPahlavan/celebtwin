import React from 'react';
import './FaceRecognition.css';


const FaceRecognition = ({ box, imageUrl }) => {
  console.log(box);
  const {top, left, bot, right} = box;

  return (
    <div className='center ma'>
      <div className='absolute pa2 mt2'>
        <img id='inputimage'
             src={imageUrl}
             alt=''
             width='500px'
             height='auto'
             />
         <div className='bounding-box'
              style={{top: top, left: left, bottom: bot, right: right}}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
