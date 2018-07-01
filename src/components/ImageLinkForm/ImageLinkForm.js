import React from 'react';

const ImageLinkForm = () => {
  return (
    <div>
      <p className='f3'>
        {'Try detecting faces in your images!'}
      </p>
      <div className='center pa4 br3  shadow-5' style={{width: '700px'}}>
        <input className='f4 pa2 w-70 center' type='text'/>
        <button className='w-30 grow f4 link ph3 pv2 dib bg-washed-red'>detect</button>
      </div>
    </div>
  );
};

export default ImageLinkForm;
