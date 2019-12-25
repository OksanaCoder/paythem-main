import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Button, Drawer } from '@material-ui/core';

import { gameSelected } from 'actions';

import AddWebsiteDialog from 'components/Dialog/AddWebsiteDialog';
import DeleteWebsiteDialog from 'components/Dialog/DeleteWebsiteDialog';
import InstallationCodeDialog from 'components/Dialog/InstallationCodeDialog';
import GamesListComponent from 'modules/currentDomain/components/GamesListComponent';
import CurrentGame from 'modules/CurrentGame';

import { ConfigurationIcon, EditIcon, TrashIcon, AddWidgetIcon } from 'assets/images/icons';
import UserIcon from 'assets/images/icons/user.svg';

import css from 'styles/pages/Home.scss';

class CurrentDomainContainer extends React.Component {
  componentDidMount() {}

  handleChooseGame = data => {
    const { handleOpen, gameSelectedAction } = this.props;

    handleOpen('openGameFullscreenDialog')();
    gameSelectedAction(data);
    this.forceUpdate();
  };

  render() {
    const {
      domainItemSelected,
      handleOpen,
      toggleDrawer,
      handleClose,
      openUpdateWebsiteDialog,
      handleEditWebsite,
      openDeleteWebsiteDialog,
      handleDeleteWebsite,
      rightPanel,
      openInstallationCodeDialog,
      handleCopy,
      scriptToCopy,
      openTooltipCopySuccess,
      openGameFullscreenDialog,
    } = this.props;

    return (
      <React.Fragment>
        <div className={css.home__container}>
          <div className={css.home__websiteBlock}>
            <div className={css.home__websiteBlock_left}>
              <div className={css.home__websiteBlock_info}>
                <div className={css.home__websiteBlock_img}>
                  <img src={UserIcon} alt="UserIcon" />
                </div>
                <div>
                  <h3>Site title</h3>
                  <p>
                    <a
                      href={`http://${domainItemSelected.data.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {domainItemSelected.data.domain}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className={css.home__websiteBlock_right}>
              <Button
                variant="contained"
                color="primary"
                className={cx(css.button__top, css.button__top_lightBlue)}
                onClick={handleOpen('openInstallationCodeDialog')}
              >
                <ConfigurationIcon />
                Installation Code
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={cx(css.button__top, css.button__top_lightBlue, css.button__top_icon)}
                onClick={handleOpen('openUpdateWebsiteDialog')}
              >
                <EditIcon />
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={cx(css.button__top, css.button__top_lightBlue, css.button__top_icon)}
                onClick={handleOpen('openDeleteWebsiteDialog')}
              >
                <TrashIcon />
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={cx(css.button__blue, css.home__websiteBlock_btnAddGame)}
                onClick={toggleDrawer('rightPanel', true)}
              >
                <AddWidgetIcon />
                Add Game
              </Button>
            </div>

            <AddWebsiteDialog
              handleClose={handleClose('openUpdateWebsiteDialog')}
              openWebsiteDialog={openUpdateWebsiteDialog}
              target="openUpdateWebsiteDialog"
              domainData={domainItemSelected.data}
              handleSubmitWebsite={handleEditWebsite}
            />

            <DeleteWebsiteDialog
              handleClose={handleClose('openDeleteWebsiteDialog')}
              openWebsiteDialog={openDeleteWebsiteDialog}
              handleDeleteWebsite={handleDeleteWebsite}
            />

            <InstallationCodeDialog
              handleClose={handleClose}
              openInstallationCodeDialog={openInstallationCodeDialog}
              handleCopy={handleCopy}
              scriptToCopy={scriptToCopy}
              openTooltipCopySuccess={openTooltipCopySuccess}
            />

            <Drawer anchor="right" open={rightPanel} onClose={toggleDrawer('rightPanel', false)}>
              <GamesListComponent
                toggleDrawer={toggleDrawer}
                handleChooseGame={this.handleChooseGame}
              />
            </Drawer>
          </div>
        </div>

        <CurrentGame
          openGameFullscreenDialog={openGameFullscreenDialog}
          handleClose={handleClose('openGameFullscreenDialog')}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    domainItemSelected: state.other.domainSelected,
  }),
  dispatch => ({
    gameSelectedAction: data => dispatch(gameSelected(data)),
  }),
)(CurrentDomainContainer);
