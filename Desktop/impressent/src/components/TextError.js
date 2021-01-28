import React from 'react';

function TextError(props) {
  //For showing form error in review page
  return <div className='error'>{props.children}</div>;
}

export default TextError;
