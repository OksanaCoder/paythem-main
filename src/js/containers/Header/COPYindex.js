import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  List,
  Popover,
  MenuItem,
} from '@material-ui/core';
import { loadProfile } from 'actions';
import strings from 'translations';
// import LANGUAGE from 'config/language';
import STORAGE from 'helpers/storage';

import css from 'styles/containers/Header.scss';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

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

  handleOpen = e => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  handleClose = () => {
    console.log('close');
    this.setState({
      open: false,
    });
  };

  setLocalize = code => event => {
    event.preventDefault();
    STORAGE.setItem('lang', code);
    strings.setLanguage(code);
    window.location.reload();
  };

  render() {
    const { logout } = this.props;
    const { open, anchorEl } = this.state;
    const { userData, loaded } = this.getUserProfile();
    // const storageLangCode = STORAGE.getItem('lang');
    // const isLang = LANGUAGE.some(item => item.code.includes(STORAGE.getItem('lang')));
    // const language = isLang
    //   ? LANGUAGE.find(item => item.code.includes(STORAGE.getItem('lang')))
    //   : storageLangCode;
    return (
      <header className={cx(css.header, css.header_global)}>
        <div className={css.header__container}>
          <List className={cx(css.menu, css.header__menu)}>
            {/* {LANGUAGE.length >= 2 && (
              <ListItem className={css.menu__item} button onClick={this.handleOpen}>
                <ListItemIcon className={css.menu__itemIcon}>
                  <Icon className={css.menu__icon}>language</Icon>
                </ListItemIcon>
                <ListItemText className={css.menu__text} inset primary={language.name} />
                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  {LANGUAGE.map(lang => (
                    <MenuItem key={lang.code} onClick={this.setLocalize(lang.code)}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Popover>
              </ListItem>
            )} */}
            {/* {loading && (
              <LinearProgress
                classes={{
                  colorPrimary: classes.linearColorPrimary,
                  barColorPrimary: classes.linearBarColorPrimary,
                }}
                className={css.navbar__progress}
              />
                )} */}
            <ListItem className={css.menu__item} button onClick={this.handleOpen}>
              {loaded && <ListItemText className={css.menu__text} inset primary={userData.name} />}
            </ListItem>
            <ListItem className={css.menu__item} button onClick={logout}>
              <ListItemIcon className={css.menu__itemIcon}>
                <Icon className={css.menu__icon}>logout</Icon>
              </ListItemIcon>
            </ListItem>
          </List>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <NavLink to="/profile">
              <MenuItem onClick={this.handleClose}>Edit profile</MenuItem>
            </NavLink>
          </Popover>
        </div>
      </header>
    );
  }
}

export default connect(
  state => ({
    user: state.get.user,
  }),
  dispatch => ({
    loadProfileAction: () => dispatch(loadProfile()),
  }),
)(withRouter(Header));
