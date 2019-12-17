import React from 'react';

import { Button } from '@material-ui/core';

import { AddWebsitesIcon2, WebsitesIcon } from 'assets/images/icons';
import AddWebsiteDialog from 'components/Dialog/AddWebsiteDialog';

import css from 'styles/pages/Home.scss';

const WelcomeComponent = ({
  openWebsiteDialog,
  handleOpen,
  handleClose,
  handleSubmitWebsite,
  target,
}) => {
  return (
    <div className={css.home__container}>
      <div className={css.home__welcome}>
        <div className={css.home__welcome_img}>
          <WebsitesIcon />
        </div>

        <h2>Welcome to Playthem!</h2>
        <h3>To start your journey you need to add a website where you want to use our service</h3>
        <Button
          variant="contained"
          color="primary"
          className={css.button__blue}
          onClick={handleOpen}
        >
          <AddWebsitesIcon2 />
          Add New Website
        </Button>
      </div>
      <AddWebsiteDialog
        handleClose={handleClose}
        openWebsiteDialog={openWebsiteDialog}
        target={target}
        handleSubmitWebsite={handleSubmitWebsite}
      />
    </div>
  );
};

export default WelcomeComponent;
