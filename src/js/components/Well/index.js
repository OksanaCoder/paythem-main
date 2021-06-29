import React from 'react';

import strings from 'translations';

import 'styles/components/Well.scss';

const Well = () => (
  <div className='well'>
    <p>{strings.info.no_data}</p>
  </div>
);

export default Well;
