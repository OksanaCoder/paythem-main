/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
// import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { Popover, MenuItem, Button, Drawer } from '@material-ui/core';

import { loadProfile, createDomain, getDomains, domainSelected } from '../../../actions';

import {
  WebsitesIcon,
  AddWebsitesIcon,
  UserIcon,
  EditIcon,
  // AddUserIcon,
  LogOutIcon,
  UpgradeIcon,
} from '../../../../assets/images/icons';

import STORAGE from '../../../helpers/storage';
import DomainsListComponent from '../components/DomainsListComponent';
import EditProfileDialog from '../components/EditProfileDialog';
import AddWebsiteDialog from '../../../components/Dialog/AddWebsiteDialog';

import '../../../../styles/containers/Header.scss';

class HeaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUserPopover: false,
      openWebsiteDialog: false,
      openEditProfileDialog: false,
      anchorEl: null,
      left: false,
    };
  }

  componentDidMount() {
    this.loadProfile();
    this.loadDomains();
  }

  loadDomains = () => {
    const { getDomainsAction, domainSelectedAction } = this.props;
    getDomainsAction().then(res => {
      const { domains } = this.getDomains();
      if (!res.error) {
        const getCurrentDomainStorage = STORAGE.getItem('currentDomainStorage');
        const data = STORAGE.isItem('currentDomainStorage')
          ? domains.length === 0
            ? {}
            : domains[0]
          : getCurrentDomainStorage || {};
        STORAGE.setItem('currentDomainStorage', data || {});
        domainSelectedAction(data);
      }
    });
  };

  getDomains = () => {
    const {
      domains: { data, loaded: domainsLoaded, loading: domainsLoading },
    } = this.props;
    const domains = domainsLoaded && data.data.data;
    return { domains, domainsLoaded, domainsLoading };
  };

  loadProfile = async () => {
    const { loadProfileAction } = this.props;
    await loadProfileAction();
  };

  getUserProfile = () => {
    const {
      user: { data, loading, loaded },
    } = this.props;
    const userData = loaded && data.data.data;
    return { userData, loaded, loading };
  };

  handleOpen = (e, target) => {
    this.setState({ [target]: true });

    if (target === 'openUserPopover') {
      this.setState({
        anchorEl: e.currentTarget,
      });
    }
    if (target === 'openEditProfileDialog') {
      this.setState({
        openUserPopover: false,
      });
    }
  };

  handleClose = target => () => {
    this.setState({ [target]: false });
  };

  handleAddWebsite = values => {
    const { createDomainAction, domainSelectedAction } = this.props;
    const data = {
      domain: values.domain,
    };
    createDomainAction(data).then(res => {
      if (!res.error) {
        const { data: domainsData } = res.payload.data;
        STORAGE.setItem('currentDomainStorage', domainsData[domainsData.length - 1]);
        this.loadDomains();
        setTimeout(() => {
          domainSelectedAction(domainsData[domainsData.length - 1]);
        }, 200);
      }
    });
    this.setState({
      openWebsiteDialog: false,
    });
  };

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ [side]: open });
  };

  handleDomainSelect = data => e => {
    e.preventDefault();
    const { domainSelectedAction } = this.props;
    STORAGE.setItem('currentDomainStorage', data);
    domainSelectedAction(data);
    this.setState({ left: false });
  };

  render() {
    const { logout, domainItemSelected } = this.props;
    const {
      openUserPopover,
      anchorEl,
      left,
      openWebsiteDialog,
      openEditProfileDialog,
    } = this.state;
    const { userData, loaded } = this.getUserProfile();
    const { domains, domainsLoaded } = this.getDomains();

    return (
      <header className='header header_global'>
        <div className='header__container'>
          <div className='header__container_left'>
            <div className='header__logo menu'>
              <NavLink to="/home" className='header__logo_icon' />
            </div>
            <div className='header__btns'>
              <Button
                variant="contained"
                color="primary"
                className='button__top'
                onClick={this.toggleDrawer('left', true)}
                disabled={domains.length === 0}
              >
                <WebsitesIcon />
                My Websites
              </Button>

              <Button
                variant="contained"
                color="primary"
                className='button__top'
                onClick={e => this.handleOpen(e, 'openWebsiteDialog')}
              >
                <AddWebsitesIcon />
                Add New Website
              </Button>
            </div>
          </div>
          <div className='header__container_right'>
            <div className='header__trialText'>
              <p>4 days left trial</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              className='button__top button__top_lightBlue'
            >
              <UpgradeIcon />
              Upgrade
            </Button>
            {loaded && (
              <Button
                variant="contained"
                color="primary"
                className='button__top header__btns_user'
                onClick={e => this.handleOpen(e, 'openUserPopover')}
              >
                <UserIcon />
                {userData.name}
              </Button>
            )}
          </div>

          <Popover
            className='header__user_popover'
            open={openUserPopover}
            anchorEl={anchorEl}
            onClose={this.handleClose('openUserPopover')}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={e => this.handleOpen(e, 'openEditProfileDialog')}>
              <EditIcon />
              Edit profile
            </MenuItem>
            {/* <MenuItem>
              <AddUserIcon />
              Affiliate
            </MenuItem> */}
            <MenuItem onClick={logout}>
              <LogOutIcon />
              Logout
            </MenuItem>
          </Popover>
        </div>

        <Drawer open={left} onClose={this.toggleDrawer('left', false)}>
          <DomainsListComponent
            toggleDrawer={this.toggleDrawer}
            domains={domains}
            loaded={domainsLoaded}
            handleDomainSelect={this.handleDomainSelect}
            activeDomain={domainItemSelected ? domainItemSelected.data._id : ''}
          />
        </Drawer>

        <AddWebsiteDialog
          openWebsiteDialog={openWebsiteDialog}
          handleClose={this.handleClose('openWebsiteDialog')}
          handleSubmitWebsite={this.handleAddWebsite}
          target="openWebsiteDialog"
          domains={domains}
        />

        <EditProfileDialog
          openEditProfileDialog={openEditProfileDialog}
          handleClose={this.handleClose('openEditProfileDialog')}
        />
      </header>
    );
  }
}

export default connect(
  state => ({
    user: state.get.user,
    domains: state.get.domains,
    domainItemSelected: state.other.domainSelected,
  }),
  dispatch => ({
    loadProfileAction: () => dispatch(loadProfile()),
    createDomainAction: data => dispatch(createDomain(data)),
    getDomainsAction: () => dispatch(getDomains()),
    domainSelectedAction: data => dispatch(domainSelected(data)),
  }),
)(withRouter(HeaderContainer));
