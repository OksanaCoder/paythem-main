import React from 'react';
import '../../../styles/components/Loader.scss';

const Loader = ({ isFetching = false }) => {
  if (isFetching) {
    return (
      <div className='loader'>
        <div className='loader__circle' />
      </div>
    );
  }
  return null;
};

export default Loader;
