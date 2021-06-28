import React from 'react';

import '../../../styles/containers/Footer.scss';

const Footer = () => (
  <footer className='footer'>
    <div className='footer__container'>
      <p>
        {'@ '}
        {new Date().getFullYear()}
        {' Playthem'}
      </p>
    </div>
  </footer>
);

export default Footer;
