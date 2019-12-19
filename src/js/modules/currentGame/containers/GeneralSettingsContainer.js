/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import cx from 'classnames';
import {
  FormControl,
  FormHelperText,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Input,
  Button,
  OutlinedInput,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

import Formik from 'helpers/Formik';
import { GeneralSettingsSchema, AddSiteUrlSchema } from 'helpers/Formik/validation';
import { Scrollbars } from 'react-custom-scrollbars';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import OtherRadio from 'modules/currentGame/components/OtherRadioComponent';

import { AddIcon, TrashIcon, DoneIcon2 } from 'assets/images/icons';

import css from 'styles/pages/CurrentGame.scss';

class GeneralSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const { generalSettingsData } = props;
    this.state = {
      displayGameDefault: generalSettingsData,
      selectedItem: null,
      specificPages: 'no',
    };
  }

  handleOthers = event => {
    const { name, value } = event.target;
    console.log(name, value);
    const { displayGameDefault } = this.state;
    const displayGameUpdated = { ...displayGameDefault };

    const obj = displayGameUpdated.display_game.find(o => o.name === name);
    obj.value = value;

    this.setState({
      displayGameDefault: displayGameUpdated,
    });
  };

  selectItem = (item, e) => {
    console.log('item', item);
    console.log('e', e.currentTarget.value);
    const { displayGameDefault } = this.state;
    const obj = displayGameDefault.display_game.find(o => o.checked === true);
    obj.checked = false;

    const objItem = item;
    if (objItem.checked === false) {
      objItem.checked = true;
    }
    this.setState({ selectedItem: objItem });
  };

  handleRadioChange = e => {
    const { name, value } = e.target;
    const { displayGameDefault } = this.state;
    const displayGameUpdated = { ...displayGameDefault };

    displayGameUpdated[name] = value === 'yes';

    this.setState({
      displayGameDefault: displayGameUpdated,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    console.log('name', name, value);

    this.setState({
      [name]: value,
    });
  };

  handleAddSiteUrl = values => {
    const { displayGameDefault } = this.state;
    const displayGameUpdated = { ...displayGameDefault };
    displayGameUpdated.where_game_show.push(values.siteUrl);

    this.setState({
      displayGameDefault: displayGameUpdated,
    });
  };

  handleDeleteSiteUrl = value => () => {
    const { displayGameDefault } = this.state;
    const displayGameUpdated = { ...displayGameDefault };
    displayGameUpdated.where_game_show = displayGameUpdated.where_game_show.filter(
      item => item !== value,
    );

    this.setState({
      displayGameDefault: displayGameUpdated,
    });
  };

  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}...`;
  };

  handleSubmitForm = values => {
    console.log(values);
    const { show_count, exp_copied } = values;
    const { displayGameDefault } = this.state;
    const displayGameUpdated = { ...displayGameDefault };
    displayGameUpdated.show_count = show_count;
    displayGameUpdated.exp_copied = exp_copied;

    this.setState({
      displayGameDefault: displayGameUpdated,
    });

    const { handleCloseTabContent } = this.props;
    handleCloseTabContent();
  };

  render() {
    const { tabValue, handleCloseTabContent, domainSelected } = this.props;
    const {
      displayGameDefault,
      displayGameDefault: {
        display_game,
        show_on_leaving,
        trigger_button,
        email_repeat,
        send_on_email,
        where_game_show,
        show_count,
        exp_copied,
      },
      selectedItem,
      specificPages,
    } = this.state;

    console.log('displayGameDefault', displayGameDefault);

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
                        value={subformik.values.siteUrl}
                        onChange={subformik.handleChange}
                        error={subformik.errors.siteUrl && subformik.touched.siteUrl}
                        startAdornment={
                          <InputAdornment position="start">
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
                    onChange={handleChange}
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

                <FormControl fullWidth className={css.form_input}>
                  <h4>!!! ----------Show the game after the user performs the action </h4>
                  <RadioGroup name="trigger_btn">
                    <FormControlLabel control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>

                <FormControl fullWidth className={css.form_input}>
                  <h4>Send coupon to the user email</h4>
                  <RadioGroup
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
                    onChange={handleChange}
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

export default GeneralSettingsContainer;
