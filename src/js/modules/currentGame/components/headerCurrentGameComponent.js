import React from 'react';
// import cx from 'cla /ssnames';
import { Button } from '@material-ui/core';

import { EyeIcon2, CloseIcon2, DoneIcon, AddWidgetIcon } from '../../../../assets/images/icons';
import '../../../../styles/pages/currentGame/DialogHeader.scss';

const headerCurrentGameComponent = ({ handleClose, handleSubmit, handlePreviewWidget }) => {
  return (
    <div className='currentGame__header'>
      <div className='currentGame__header_inner'>
        <h2>
          <AddWidgetIcon />
          New Game
        </h2>
        <div className='currentGame__header_btns'>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePreviewWidget}
            className='
              button__top
              button__top_white
              currentGame__header_btnPreview
            '
          >
            <EyeIcon2 />
            Preview
          </Button>
          <Button
            variant="contained"
            color="primary"
            className='button__top button__top_white'
            onClick={handleClose}
          >
            <CloseIcon2 />
            Discard
          </Button>
          <Button
            variant="contained"
            color="primary"
            className='button__top button__top_lightBg button__top_white'
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
