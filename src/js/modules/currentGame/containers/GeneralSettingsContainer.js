/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FormControl,
  FormHelperText,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  Input,
  Checkbox,
  Button,
} from '@material-ui/core';
import Formik from 'helpers/Formik';
import { Scrollbars } from 'react-custom-scrollbars';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import OtherRadio from 'modules/currentGame/components/OtherRadioComponent';

import { AddWebsitesIcon } from 'assets/images/icons';

import css from 'styles/pages/CurrentGame.scss';

class GeneralSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    const { generalSettingsData } = props;
    this.state = {
      displayGameDefault: generalSettingsData,
      selectedItem: null,
    };
  }

  handleOthers = event => {
    const { name, value } = event.target;
    const { displayGameDefault } = this.state;
    const displayGameUpdated = [...displayGameDefault];

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

  render() {
    const { tabValue, handleCloseTabContent } = this.props;
    const {
      displayGameDefault: { display_game, show_on_leaving, trigger_button, email_repeat },
      selectedItem,
    } = this.state;
    console.log('email_repeat', email_repeat);
    console.log('trigger_button', trigger_button);

    return (
      <TabContentComponent
        title="General Settings"
        description="Here you can customize the basic behavior and options of your game."
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <Scrollbars style={{ height: '100%' }}>
          <form>
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

            <FormControl fullWidth className={css.form_input}>
              <h4>Where show the game</h4>
              <Button variant="contained" color="primary" className={css.button__top}>
                <AddWebsitesIcon />
                Add site URL
              </Button>
            </FormControl>

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
                type="number"
                endAdornment={<InputAdornment position="end">times</InputAdornment>}
              />
            </FormControl>

            <FormControl fullWidth className={css.form_input}>
              <h4>Show the game after the user performs the action </h4>
              <RadioGroup name="trigger_btn">
                <FormControlLabel control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </form>
        </Scrollbars>
      </TabContentComponent>
    );
  }
}

export default GeneralSettingsContainer;
