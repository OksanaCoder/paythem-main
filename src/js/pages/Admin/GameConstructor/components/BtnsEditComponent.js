import React from 'react';
import { Button } from '@material-ui/core';
import cx from 'classnames';
import css from 'styles/pages/GameConstructor/BtnsGameSettings.scss';

const BtnsEditComponent = ({ handleGameSettings, active }) => {
  return (
    <div className={css.tab__content_gameSettings}>
      <Button
        className={
          active === 'editDesign'
            ? cx(css.tab__content_btn, css.tab__content_btnActive)
            : css.tab__content_btn
        }
        onClick={handleGameSettings('editDesign')}
      >
        <div className={css.tab__content_icon_editDesign} />
        Edit design
      </Button>
      <Button
        className={
          active === 'editText'
            ? cx(css.tab__content_btn, css.tab__content_btnActive)
            : css.tab__content_btn
        }
        onClick={handleGameSettings('editText')}
      >
        <div className={css.tab__content_icon_editText} />
        Edit text
      </Button>
    </div>
  );
};

export default BtnsEditComponent;
