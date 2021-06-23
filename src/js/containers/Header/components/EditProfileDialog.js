import React from 'react';
import cx from 'classnames';
import { Dialog } from '@material-ui/core';

import css from '../../../../styles/components/Dialog.scss';
import CurrentUserProfile from '../../../modules/currentUser/index';

const EditProfileDialog = ({ openEditProfileDialog, handleClose }) => (
  <Dialog open={openEditProfileDialog} onClose={handleClose}>
    <div className={cx(css.addWebsite__form)}>
      <div className={css.addWebsite__form_title}>
        <h3>Account info</h3>
        <CurrentUserProfile handleClose={handleClose} />
      </div>
    </div>
  </Dialog>
);

export default EditProfileDialog;
