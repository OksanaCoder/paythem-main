import React from 'react';
import { Button } from '@material-ui/core';
import cx from 'classnames';
import css from 'styles/pages/GameConstructor/BtnsGameSettings.scss';

const BtnsScreenViewComponent = ({ handleScreenView }) => {
  return (
    <div className={css.tab__content_btnsView}>
      <Button onClick={handleScreenView('DesktopView')} className={cx(css.tab__content_btnDesktop)}>
        <div className={css.tab__content_icon_desktop} />
        Desktop
      </Button>
      <Button onClick={handleScreenView('MobileView')} className={cx(css.tab__content_btnMobile)}>
        <div className={css.tab__content_icon_mobile} />
        Mobile
      </Button>
    </div>
  );
};

export default BtnsScreenViewComponent;
