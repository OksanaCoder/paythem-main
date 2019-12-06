import React from 'react';
import { Button } from '@material-ui/core';

import { WidgetIcon, AddWidgetIcon } from 'assets/images/icons';

import css from 'styles/pages/Home.scss';

const NoGamesComponent = ({ toggleDrawer }) => {
  return (
    <div className={css.home__container}>
      <div className={css.home__welcome}>
        <div className={css.home__welcome_img}>
          <WidgetIcon />
        </div>
        <h2>No Connected Games</h2>
        <h3>Please select the game which you want to use on selected website</h3>
        <Button
          variant="contained"
          color="primary"
          className={css.button__blue}
          onClick={() => toggleDrawer('rightPanel', true)}
        >
          <AddWidgetIcon />
          Add Game
        </Button>
      </div>
    </div>
  );
};

export default NoGamesComponent;
