import React from 'react';
import cx from 'classnames';
import { Button, Dialog } from '@material-ui/core';

import { AttentionIcon, CloseIcon, AddWebsiteIcon } from 'assets/images/icons';

import css from 'styles/components/Dialog.scss';

const DeleteWebsiteDialog = ({ openWebsiteDialog, handleClose, handleDeleteWebsite }) => (
  <Dialog open={openWebsiteDialog} onClose={handleClose}>
    <div className={cx(css.addWebsite__form, css.deleteWebsite__dialog)}>
      <div className={css.addWebsite__form_icon}>
        <AttentionIcon />
      </div>
      <div className={css.addWebsite__form_title}>
        <h3>Are you sure?</h3>
        <h5>
          You are going to delete the website. Please note: all stats information will be lost
        </h5>
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={css.button__blue}
          onClick={handleDeleteWebsite}
        >
          <AddWebsiteIcon />
          Yes, I do
        </Button>

        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          className={css.button__top}
        >
          <CloseIcon />
          Discard
        </Button>
      </div>
    </div>
  </Dialog>
);

export default DeleteWebsiteDialog;
