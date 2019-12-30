/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Scrollbars from 'react-custom-scrollbars';
import {
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Input,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { paramsDefault } from 'actions';
import { AddIcon, TrashIcon, DoneIcon2 } from 'assets/images/icons';
import Formik from 'helpers/Formik';
import { GeneralSettingsSchema, AddSiteUrlSchema } from 'helpers/Formik/validation';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import OtherRadio from 'modules/currentGame/components/OtherRadioComponent';

import css from 'styles/pages/CurrentGame/GeneralSettings.scss';

class GeneralSettingsContainer extends React.Component {
  handleOthers = event => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const { name, value } = event.target;
    const params = { ...getParamsDefault.data };

    params.behavior.general_settings.display_game.find(o => o.name === name).value = value;
    paramsDefaultAction(params);
  };

  selectItem = (item, e) => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const params = { ...getParamsDefault.data };

    params.behavior.general_settings.display_game.find(o => o.checked === true).checked = false;
    paramsDefaultAction(params);

    const objItem = item;
    if (objItem.checked === false) {
      objItem.checked = true;
    }
  };

  handleRadioChange = e => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const { name, value } = e.target;
    const params = { ...getParamsDefault.data };

    params.behavior.general_settings[name] = value === 'yes';
    paramsDefaultAction(params);
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleAddSiteUrl = values => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const params = { ...getParamsDefault.data };

    params.behavior.general_settings.where_game_show.push(values.siteUrl);
    paramsDefaultAction(params);
  };

  handleDeleteSiteUrl = value => () => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const params = { ...getParamsDefault.data };
    const gameShow = params.behavior.general_settings.where_game_show;
    params.behavior.general_settings.where_game_show = gameShow.filter(item => item !== value);
    paramsDefaultAction(params);
  };

  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}...`;
  };

  handleSubmitForm = () => {
    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  handleChangeParams = e => {
    const { name, value } = e.target;
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const params = { ...getParamsDefault.data };

    params.behavior.general_settings[name] = value;
    paramsDefaultAction(params);
  };

  render() {
    const { tabValue, domainSelected, getParamsDefault } = this.props;
    console.log('getParamsDefault', getParamsDefault);
    const {
      display_game,
      show_on_leaving,
      trigger_button,
      email_repeat,
      send_on_email,
      where_game_show,
      show_count,
      exp_copied,
    } = getParamsDefault.data.behavior.general_settings;

    return (
      <Formik
        initialValues={{
          show_count,
          exp_copied,
        }}
        validationSchema={GeneralSettingsSchema}
        onSubmit={this.handleSubmitForm}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <TabContentComponent
            title="General Settings"
            description="Here you can customize the basic behavior and options of your game."
            tabValue={tabValue}
            handleCloseTabContent={handleSubmit}
          >
            <Scrollbars style={{ height: '90%' }}>
              <form className={css.currentGame__settings}>
                <div className={css.form_input}>
                  <h4>When display the game</h4>
                  {display_game.map(item => {
                    return (
                      <OtherRadio
                        key={item.name}
                        onTextChange={this.handleOthers}
                        value={item.value}
                        name={item.name}
                        startText={item.startText}
                        endText={item.endText}
                        onChange={e => this.selectItem(item, e)}
                        checked={item.checked}
                        disabledInput={!item.checked}
                      />
                    );
                  })}
                </div>

                <FormControl fullWidth className={css.form_input}>
                  <h4>Show the game when user is leaving the site</h4>
                  <RadioGroup
                    className={css.form_radioGorizontal}
                    name="show_on_leaving"
                    value={show_on_leaving ? 'yes' : 'no'}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel control={<Radio />} label="Yes" value="yes" />
                    <FormControlLabel control={<Radio />} label="No" value="no" />
                  </RadioGroup>
                </FormControl>

                <Formik
                  initialValues={{
                    siteUrl: '',
                  }}
                  validationSchema={AddSiteUrlSchema}
                  onSubmit={this.handleAddSiteUrl}
                >
                  {subformik => (
                    <FormControl fullWidth className={css.form_input}>
                      <h4>Show the game on specific pages</h4>
                      <List className={css.currentGame__settings_list}>
                        {where_game_show.length > 0 &&
                          where_game_show.map(item => (
                            <ListItem key={item}>
                              <DoneIcon2 />
                              <ListItemText
                                primary={`${domainSelected.data.domain}/${this.truncateString(
                                  item,
                                  6,
                                )}`}
                              />

                              <Button
                                variant="contained"
                                color="primary"
                                className={cx(
                                  css.button__top,
                                  css.button__top_lightBlue,
                                  css.button__top_icon,
                                )}
                                onClick={this.handleDeleteSiteUrl(item)}
                              >
                                <TrashIcon />
                              </Button>
                            </ListItem>
                          ))}
                      </List>

                      <Input
                        className={css.currentGame__settings_input}
                        name="siteUrl"
                        variant="filled"
                        value={subformik.values.siteUrl}
                        onChange={subformik.handleChange}
                        error={subformik.errors.siteUrl && subformik.touched.siteUrl}
                        placeholder="my-blog-page"
                        startAdornment={
                          <InputAdornment
                            className={css.currentGame__settings_inputAdornment}
                            position="start"
                          >
                            {domainSelected.data.domain}
                            <>/</>
                          </InputAdornment>
                        }
                      />
                      {subformik.errors.siteUrl && subformik.touched.siteUrl && (
                        <FormHelperText className={css.form_inputError}>
                          {subformik.errors.siteUrl}
                        </FormHelperText>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        className={cx(
                          css.button__top,
                          css.button__top_lightBlue,
                          css.currentGame__settings_btnAdd,
                        )}
                        onClick={subformik.handleSubmit}
                      >
                        <AddIcon />
                        Add Page
                      </Button>
                    </FormControl>
                  )}
                </Formik>

                <FormControl fullWidth className={css.form_input}>
                  <h4>Show trigger button on the site</h4>
                  <RadioGroup
                    className={css.form_radioGorizontal}
                    name="trigger_button"
                    value={trigger_button ? 'yes' : 'no'}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel control={<Radio />} label="Yes" value="yes" />
                    <FormControlLabel control={<Radio />} label="No" value="no" />
                  </RadioGroup>
                </FormControl>

                <FormControl fullWidth className={css.form_input}>
                  <h4>Allow user to play with the same email</h4>
                  <RadioGroup
                    className={css.form_radioGorizontal}
                    name="email_repeat"
                    value={email_repeat ? 'yes' : 'no'}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel control={<Radio />} label="Yes" value="yes" />
                    <FormControlLabel control={<Radio />} label="No" value="no" />
                  </RadioGroup>
                </FormControl>

                <FormControl fullWidth className={css.form_input}>
                  <h4>How many times a day to show the game for user? </h4>
                  <Input
                    className={css.currentGame__settings_input50}
                    onChange={e => {
                      handleChange(e);
                      this.handleChangeParams(e);
                    }}
                    value={values.show_count}
                    error={errors.show_count && touched.show_count}
                    name="show_count"
                    type="number"
                    endAdornment={
                      <InputAdornment position="end">
                        <div>times</div>
                      </InputAdornment>
                    }
                  />
                  {errors.show_count && touched.show_count && (
                    <FormHelperText className={css.form_inputError}>
                      {errors.show_count}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* <FormControl fullWidth className={css.form_input}>
                  <h4>Show the game after the user performs the action </h4>
                  <RadioGroup name="trigger_btn">
                    <FormControlLabel control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl> */}

                <FormControl fullWidth className={css.form_input}>
                  <h4>Send coupon to the user email</h4>
                  <RadioGroup
                    className={css.form_radioGorizontal}
                    name="send_on_email"
                    value={send_on_email ? 'yes' : 'no'}
                    onChange={this.handleRadioChange}
                  >
                    <FormControlLabel control={<Radio />} label="Yes" value="yes" />
                    <FormControlLabel control={<Radio />} label="No" value="no" />
                  </RadioGroup>
                </FormControl>

                <FormControl fullWidth className={css.form_input}>
                  <h4>Show the user coundown time when coupon expires</h4>
                  <Input
                    className={css.currentGame__settings_input50}
                    onChange={e => {
                      handleChange(e);
                      this.handleChangeParams(e);
                    }}
                    value={values.exp_copied}
                    error={errors.exp_copied && touched.exp_copied}
                    name="exp_copied"
                    type="number"
                    endAdornment={
                      <InputAdornment position="end">
                        <div>min</div>
                      </InputAdornment>
                    }
                  />
                  {errors.exp_copied && touched.exp_copied && (
                    <FormHelperText className={css.form_inputError}>
                      {errors.exp_copied}
                    </FormHelperText>
                  )}
                </FormControl>
              </form>
            </Scrollbars>
          </TabContentComponent>
        )}
      </Formik>
    );
  }
}

export default connect(
  state => ({
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    paramsDefaultAction: data => dispatch(paramsDefault(data)),
  }),
)(GeneralSettingsContainer);
