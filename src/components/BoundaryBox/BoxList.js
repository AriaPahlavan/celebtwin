import React from 'react';
import BoundaryBox from './BoundaryBox';


const BoxList = ({boxes}) => {

  if (boxes === undefined) {
    return <div></div>;
  }

  return (
    <div>
      { boxes.map((box, i) => <BoundaryBox key={i} box={box}/>) }
    </div>
  );
}

export default BoxList;
