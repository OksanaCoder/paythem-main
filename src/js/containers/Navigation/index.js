/* eslint-disable max-len */
import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
  LinearProgress,
  withStyles,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import strings from 'translations';
import { loadProfile, getDomains, domainSelected } from 'actions';
import { NAV_MENU } from 'config';

import css from 'styles/containers/Navigation.scss';

const styles = {
  linearColorPrimary: { backgroundColor: '#f5f5f5' },
  linearBarColorPrimary: {
    backgroundColor: '#4e91d9',
  },
};

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      isOverlay: false,
    };
  }

  componentDidMount() {
    this.addGlobalClass('navbarDesktopOpen');
    this.removeGlobalClass('navbarMobileOpen');
    this.loadProfile();
    this.loadDomains();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { isOverlay } = this.state;
    if (isOverlay && prevProps.location.pathname !== location.pathname) {
      this.closeNavbar();
    }
  }

  loadProfile = async () => {
    const { loadProfileAction } = this.props;
    await loadProfileAction();
  };

  loadDomains = () => {
    const { getDomainsAction, domainSelectedAction } = this.props;
    getDomainsAction().then(res => {
      const { domains } = this.getDomains();
      if (!res.error) {
        domainSelectedAction(domains[0] || {});
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

  getUserProfile = () => {
    const {
      user: { data, loading, loaded },
    } = this.props;
    const userData = loaded && data.data.data;
    return { userData, loaded, loading };
  };

  toggleNavbar = () => {
    const { toggle } = this.state;
    this.setState(state => ({
      toggle: !state.toggle,
    }));
    if (toggle === true) {
      this.removeGlobalClass('navbarDesktopOpen');
    } else {
      this.addGlobalClass('navbarDesktopOpen');
    }
  };

  openNavbar = () => {
    this.addGlobalClass('navbarMobileOpen');
    this.setState({
      isOverlay: true,
    });
  };

  closeNavbar = () => {
    this.removeGlobalClass('navbarMobileOpen');
    this.setState({
      isOverlay: false,
    });
  };

  mouseMenuOver = () => {
    this.addGlobalClass('navbarDesktopHover');
  };

  mouseMenuOut = () => {
    this.removeGlobalClass('navbarDesktopHover');
  };

  addGlobalClass = className => {
    document.body.classList.add(className);
  };

  removeGlobalClass = className => {
    document.body.classList.remove(className);
  };

  handleChange = event => {
    const { domainSelectedAction } = this.props;
    const { value } = event.target;
    const { domains, domainsLoaded } = this.getDomains();
    const domainItem = domainsLoaded && domains.find(item => item.domain === value);

    domainSelectedAction(domainItem);
  };

  render() {
    const {
      classes,
      logout,
      domainItemSelected,
      history: { location },
    } = this.props;
    const { toggle, isOverlay } = this.state;
    const { loading } = this.getUserProfile();
    const { domains, domainsLoaded, domainsLoading } = this.getDomains();
    const isDomainUrl = location.pathname.includes('domain');

    return (
      <React.Fragment>
        <aside
          className={cx(css.aside, css.aside_global)}
          onMouseEnter={this.mouseMenuOver}
          onMouseLeave={this.mouseMenuOut}
        >
          <IconButton
            className={cx(css.aside__iconButton, css.aside__iconButton_header)}
            onClick={this.openNavbar}
          >
            <Icon className={css.aside__iconMenu}>menu</Icon>
          </IconButton>
          <div className={css.aside__wrap}>
            <header className={css.aside__header}>
              <div className={css.aside__logo}>
                <div className={css.aside__logoIcon} />
                <div className={cx(css.aside__logoText, css.hideitem)} />
              </div>
              <div
                className={cx(css.aside__iconButton, css.aside__iconButton_desktop)}
                onClick={this.toggleNavbar}
                onKeyDown={this.toggleNavbar}
                role="button"
                tabIndex={0}
              >
                {toggle ? (
                  <div className={css.aside__iconButton__hide} />
                ) : (
                  <div className={css.aside__iconButton__show} />
                )}
              </div>
              <IconButton
                className={cx(css.aside__iconButton, css.aside__iconButton_mobile)}
                onClick={this.closeNavbar}
              >
                <Icon className={css.aside__iconMenu}>arrow_back</Icon>
              </IconButton>
            </header>

            <div className={css.aside__content}>
              <div className={css.navbar}>
                {loading && (
                  <LinearProgress
                    classes={{
                      colorPrimary: classes.linearColorPrimary,
                      barColorPrimary: classes.linearBarColorPrimary,
                    }}
                    className={css.navbar__progress}
                  />
                )}

                <div className={css.navbar__domains}>
                  <div className={css.hideitem}>
                    {/* {domainsLoaded && ( */}
                    <Select
                      value={domainItemSelected.data.domain || ''}
                      className={css.domains_select}
                      onChange={this.handleChange}
                      disabled={domainItemSelected.data.length === 0 || isDomainUrl}
                    >
                      {domainsLoaded &&
                        domains.map(item => (
                          <MenuItem value={item.domain} key={item._id}>
                            {item.domain}
                          </MenuItem>
                        ))}
                    </Select>

                    <Button
                      variant="contained"
                      color="primary"
                      href="/#/game/add"
                      size="small"
                      disabled={domainsLoading || domainItemSelected.data.length === 0}
                      className={cx(css.button__blue, css.button)}
                    >
                      Create the game
                    </Button>
                  </div>
                </div>

                <List className={cx(css.menu, css.menu_radius)} component="nav">
                  {NAV_MENU.map(item => (
                    <NavLink
                      key={item.to}
                      exact
                      to={item.to}
                      className={css.menu__link}
                      activeClassName={css.menu__link_active}
                    >
                      <ListItem className={css.menu__item} button>
                        <ListItemIcon className={css.menu__itemIcon}>
                          <Icon className={css.menu__icon}>{item.icon}</Icon>
                        </ListItemIcon>
                        <ListItemText
                          className={cx(css.menu__text, css.hideitem)}
                          inset
                          primary={item.name}
                        />
                      </ListItem>
                    </NavLink>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  className={cx(css.button__pink, css.button, css.hideitem)}
                >
                  Upgrade now
                </Button>
              </div>
            </div>

            <div className={css.aside__footer}>
              <List className={cx(css.menu, css.menu_radius)} component="nav">
                <NavLink exact to="" onClick={logout} className={css.menu__link}>
                  <ListItem className={css.menu__item} button>
                    <ListItemIcon className={css.menu__itemIcon}>
                      <Icon className={css.menu__icon}>logout</Icon>
                    </ListItemIcon>
                    <ListItemText
                      className={cx(css.menu__text, css.hideitem)}
                      inset
                      primary={strings.buttons.logout}
                    />
                  </ListItem>
                </NavLink>
              </List>
            </div>
          </div>
        </aside>

        <button
          type="submit"
          aria-label="close-nav-bar"
          className={cx(css.overlay, { [css.overlay_show]: isOverlay })}
          onClick={this.closeNavbar}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      user: state.get.user,
      domains: state.get.domains,
      domainItemSelected: state.other.domainSelected,
    }),
    dispatch => ({
      loadProfileAction: () => dispatch(loadProfile()),
      getDomainsAction: () => dispatch(getDomains()),
      domainSelectedAction: data => dispatch(domainSelected(data)),
    }),
  )(withStyles(styles)(Navigation)),
);
