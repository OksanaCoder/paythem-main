import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Tabs, Tab } from '@material-ui/core';

import strings from 'translations';
import { loadProfile, updateProfile, addNotification } from 'actions';
import Fetching from 'components/Fetching';

import CurrentUserForm from 'modules/currentUser/components/CurrentUserForm';

import css from 'styles/pages/CurrentUser.scss';

class CurrentUserContainer extends Component {
  state = { tabValue: 0 };

  loadUserProfile = () => {
    const { loadProfileAction } = this.props;
    loadProfileAction();
  };

  getUserData = () => {
    const {
      user: { data, loaded, loading },
    } = this.props;
    const userData = loaded && data.data.data;
    return { userData, loaded, loading };
  };

  handleChangeTabsIntegration = (e, tabValue) => {
    this.setState({ tabValue });
  };

  handleSubmitUser = isPassRecovery => values => {
    const { updateProfileAction, handleClose } = this.props;
    const { email, password, name } = values;

    if (isPassRecovery) {
      const success = strings.notifications.success.password_update;
      const error = strings.notifications.error.password_update;
      updateProfileAction({ email, password }).then(res => this.results(res, { success, error }));
    } else {
      const success = strings.notifications.success.profile_update;
      const error = strings.notifications.error.profile_update;
      const data = { email, name };
      updateProfileAction(data).then(res => this.results(res, { success, error }));
    }

    handleClose();
  };

  results = (res, notice) => {
    const { addNotificationAction } = this.props;
    if (!res.error && res.payload) {
      addNotificationAction({
        type: 'success',
        text: notice.success,
      });
      this.loadUserProfile();
    } else {
      addNotificationAction({
        type: 'error',
        text: notice.error,
      });
    }
  };

  render() {
    const { tabValue } = this.state;
    const { userData, loaded, loading } = this.getUserData();
    const { handleClose } = this.props;

    return (
      <Fetching isFetching={loading}>
        {loaded && (
          <React.Fragment>
            <section className={cx(css.tabs__container, css.tabs__container_offset_top)}>
              <div className={cx(css.tabs, css.tabs_horizontal)}>
                <nav className={css.tabs__nav}>
                  <Tabs
                    className={css.tabs__list}
                    indicatorColor="primary"
                    textColor="primary"
                    value={tabValue}
                    onChange={this.handleChangeTabsIntegration}
                  >
                    <Tab className={css.tabs__list_label} label="User Profile" />
                    <Tab className={css.tabs__list_label} label="Change Password" />
                  </Tabs>
                </nav>
                <div className={css.tabs__content}>
                  {tabValue === 0 && (
                    <CurrentUserForm
                      data={userData}
                      handleSubmitUser={this.handleSubmitUser()}
                      handleClose={handleClose}
                    />
                  )}
                  {tabValue === 1 && (
                    <CurrentUserForm
                      data={userData}
                      handleSubmitUser={this.handleSubmitUser('isPassRecovery')}
                      isPasswordRecovery
                      handleClose={handleClose}
                    />
                  )}
                </div>
              </div>
            </section>
          </React.Fragment>
        )}
      </Fetching>
    );
  }
}

export default connect(
  state => ({
    user: state.get.user,
  }),
  dispatch => ({
    loadProfileAction: () => dispatch(loadProfile()),
    updateProfileAction: data => dispatch(updateProfile(data)),
    addNotificationAction: data => dispatch(addNotification(data)),
  }),
)(CurrentUserContainer);
