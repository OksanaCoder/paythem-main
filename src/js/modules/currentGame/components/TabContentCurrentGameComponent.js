import React from 'react';
import cx from 'classnames';
import { Button } from '@material-ui/core';

import { CloseIcon } from 'assets/images/icons';
import css from 'styles/pages/CurrentGame.scss';

const TabContentCurrentGameComponent = ({
  tabValue,
  handleCloseTabContent,
  title,
  description,
  children,
}) => {
  return (
    <div
      className={
        tabValue
          ? cx(css.currentGame__content_tabContent, css.currentGame__content_tabContentActive)
          : css.currentGame__content_tabContent
      }
    >
      <Button
        variant="contained"
        color="primary"
        className={cx(css.button__top, css.currentGame__btnClose)}
        onClick={handleCloseTabContent}
      >
        <CloseIcon />
      </Button>

      <h3>{title}</h3>
      <p>{description}</p>

      {children}
    </div>
  );
};

export default TabContentCurrentGameComponent;
