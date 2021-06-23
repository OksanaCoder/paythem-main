import React from 'react';
import cx from 'classnames';
import { Button } from '@material-ui/core';

import { EyeIcon2, CloseIcon2, DoneIcon, AddWidgetIcon } from '../../../../assets/images/icons';
import css from '../../../../styles/pages/currentGame/DialogHeader.scss';

const headerCurrentGameComponent = ({ handleClose, handleSubmit, handlePreviewWidget }) => {
  return (
    <div className={css.currentGame__header}>
      <div className={css.currentGame__header_inner}>
        <h2>
          <AddWidgetIcon />
          New Game
        </h2>
        <div className={css.currentGame__header_btns}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviewWidget}
            className={cx(
              css.button__top,
              css.button__top_white,
              css.currentGame__header_btnPreview,
            )}
          >
            <EyeIcon2 />
            Preview
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={cx(css.button__top, css.button__top_white)}
            onClick={handleClose}
          >
            <CloseIcon2 />
            Discard
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={cx(css.button__top, css.button__top_lightBg, css.button__top_white)}
            onClick={handleSubmit}
          >
            <DoneIcon />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default headerCurrentGameComponent;
