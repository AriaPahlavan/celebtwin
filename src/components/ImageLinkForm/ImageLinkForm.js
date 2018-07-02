import React from 'react';


const formStyle = {
  width: '700px',
  background: 'linear-gradient(to right, rgb(219, 197, 193), rgb(180, 214, 203))'
};

const ImageLinkForm = ({onInputChange, onDetectClick}) => {
  return (
    <div>
      <div>
        <p className='f3'>
          {'Try detecting faces in your images!'}
        </p>
        <div className='center pa4 br3  shadow-5' style={formStyle}>
          <input className='f4 pa2 w-70 center' type='text'
                 onChange={onInputChange}/>
          <input className='w-30 grow f4 link ph3 pv2 dib bg-washed-red'
                  onClick={onDetectClick}
                  type="submit"
                  value="detect"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
