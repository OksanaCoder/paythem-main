/* eslint-disable no-param-reassign */
import React from 'react';
import cx from 'classnames';
import { Button, Dialog, Tooltip } from '@material-ui/core';

import { CloseIcon, CopyIcon } from 'assets/images/icons';

import css from 'styles/components/Dialog.scss';

const InstallationCodeDialog = ({
  openInstallationCodeDialog,
  handleClose,
  handleCopy,
  scriptToCopy,
  openTooltipCopySuccess,
}) => {
  const textCopyToClipboard = React.createRef();

  return (
    <Dialog open={openInstallationCodeDialog} onClose={handleClose('openInstallationCodeDialog')}>
      <div className={cx(css.addWebsite__form)}>
        <div className={css.addWebsite__form_title}>
          <h3>Installation Code</h3>
          <h5>
            Paste this code into every page you want to display widgets on right before the
            &lt;/body&gt; tag
          </h5>
          <div className={css.addWebsite__form_script} ref={textCopyToClipboard}>
            <pre>
              <code>{scriptToCopy}</code>
            </pre>
          </div>
        </div>

        <div>
          <Tooltip
            title="Copied success"
            placement="top"
            open={openTooltipCopySuccess}
            onClose={handleClose('openTooltipCopySuccess')}
          >
            <Button
              variant="contained"
              color="primary"
              className={css.button__blue}
              onClick={() => handleCopy(textCopyToClipboard.current)}
            >
              <CopyIcon />
              Copy to Clipboard
            </Button>
          </Tooltip>
          <Button
            onClick={handleClose('openInstallationCodeDialog')}
            variant="contained"
            color="primary"
            className={css.button__top}
          >
            <CloseIcon />
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default InstallationCodeDialog;
