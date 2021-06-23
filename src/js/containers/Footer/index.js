import React from 'react';

import css from '../../../styles/containers/Footer.scss';

const Footer = () => (
  <footer className={css.footer}>
    <div className={css.footer__container}>
      <p>
        {'@ '}
        {new Date().getFullYear()}
        {' Playthem'}
      </p>
    </div>
  </footer>
);

export default Footer;
