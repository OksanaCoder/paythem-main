import React from 'react';
// import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import {
  Grid,
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  Input,
  TextareaAutosize,
  FormControlLabel,
  Select,
  MenuItem,
  Switch,
} from '@material-ui/core';
import cx from 'classnames';
import css from 'styles/pages/GameConstructor/GlobalSettings.scss';

class GlobalSettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayGame: {
        name: null,
        value: null,
      },
    };

    this.inputRef = React.createRef;
  }

  handleChange = e => {
    if (e.target.name === 'conditions') {
      this.setState({
        displayGame: {
          name: e.target.name,
          value: [],
        },
      });
    } else {
      this.setState({
        displayGame: {
          name: e.target.name,
          value: e.target.value,
        },
      });
    }
  };

  handleChangeCheckbox = e => {
    // console.log('option', option)
    const { displayGame } = this.state;
    const valueArr = [...displayGame.value];
    if (e.target.checked) {
      valueArr.push(e.target.value);
    } else {
      const index = valueArr.indexOf(e.target.value);
      valueArr.splice(index, 1);
    }

    this.setState({
      displayGame: {
        name: e.target.name,
        value: valueArr,
      },
    });
  };

  handleChangeInput = () => {
    // console.log('target', e.target.value)
    // console.log('this.textInput', this.inputRef.current)
    // console.log('parent', e.target.closest(`.${css.form__formControl_element}`).querySelector('input[name="conditions"]').value)
    // let checkboxValue = e.target.closest(`.${css.form__formControl_element}`).querySelector('input[name="conditions"]');
    // checkboxValue = e.target.value;
    // console.log('checkboxValue', checkboxValue)
  };

  render() {
    const { displayGame } = this.state;
    // console.log('state', displayGame)
    return (
      <Grid container spacing={3}>
        <Grid item className={css.tab__content_inner}>
          <div className={css.tab__content_form}>
            <Scrollbars style={{ height: 600 }}>
              <form className={css.form}>
                <React.Fragment>
                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">When to display the game?</FormLabel>
                    <>
                      <div className={css.form__formControl_element}>
                        <Radio
                          color="secondary"
                          name="entering_site"
                          value="entering_site"
                          checked={displayGame.value === 'entering_site'}
                          onChange={this.handleChange}
                        />
                        <span className={css.form__formControl_elementLabel}>
                          On the entering the site
                        </span>
                      </div>

                      <div className={css.form__formControl_element}>
                        <Radio
                          color="secondary"
                          name="conditions"
                          value="conditions"
                          checked={displayGame.value === 'conditions'}
                          onChange={this.handleChange}
                        />
                        <span className={css.form__formControl_elementLabel}>
                          Under the following conditions
                        </span>
                      </div>
                      {displayGame.name === 'conditions' && (
                        <FormGroup className={css.checkbox__group}>
                          <div className={css.form__formControl_element}>
                            <Checkbox
                              name="conditions"
                              value="leaving_the_site"
                              onChange={e => this.handleChangeCheckbox(e, 'leaving_the_site')}
                            />
                            <span className={css.form__formControl_elementLabel}>
                              {' '}
                              When the user is leaving the site
                            </span>
                          </div>

                          <div className={css.form__formControl_element}>
                            <Checkbox
                              name="conditions"
                              value="reaches_page"
                              onChange={e => this.handleChangeCheckbox(e, e.target.value)}
                            />
                            <span className={css.form__formControl_elementLabel}>
                              <i>When the user reaches</i>
                              <Input
                                defaultValue="100"
                                type="number"
                                ref={element => {
                                  this.inputRef = element;
                                }}
                                name="conditions"
                                onChange={this.handleChangeInput}
                              />
                              <i>% of the page</i>
                            </span>
                          </div>

                          <div className={css.form__formControl_element}>
                            <Checkbox
                              name="conditions"
                              value="after_sec"
                              onChange={e => this.handleChangeCheckbox(e, 'after_sec')}
                            />
                            <span className={css.form__formControl_elementLabel}>
                              <i>After</i>
                              {/* <Input defaultValue="10" type="number" value='10' /> */}
                              <i>sec</i>
                            </span>
                          </div>
                        </FormGroup>
                      )}

                      <div className={css.form__formControl_element}>
                        <Radio color="secondary" value="special_place" />
                        <span className={css.form__formControl_elementLabel}>
                          On special page place
                        </span>
                        <p>Place code on your page where you want to show the game:</p>
                        <TextareaAutosize placeholder="<div id='playthem'></div>" rows={3} />
                      </div>
                    </>
                  </FormControl>

                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">Show play game trigger?</FormLabel>
                    <RadioGroup aria-label="game_trigger" defaultValue="yes" name="game_trigger">
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="on_click"
                        control={<Radio />}
                        label="On click"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">Allow users play with the same email?</FormLabel>
                    <RadioGroup aria-label="same_email" defaultValue="yes" name="same_email">
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="no"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">For how many times?</FormLabel>
                    <RadioGroup
                      aria-label="how_many_times"
                      defaultValue="every_page_view"
                      name="how_many_times"
                    >
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="every_page_view"
                        control={<Radio />}
                        label="Every page view"
                      />

                      <div className={css.form__formControl_element}>
                        <Radio value="after_sec" />
                        <span className={css.form__formControl_elementLabel}>
                          <i>Not more than once every</i>
                          <Input defaultValue="1" type="number" />
                          <Select displayEmpty className={css.selectEmpty}>
                            <MenuItem value="day">day</MenuItem>
                            <MenuItem value="week">week</MenuItem>
                            <MenuItem value="month">month</MenuItem>
                          </Select>
                          <i>per user</i>
                        </span>
                      </div>
                    </RadioGroup>
                  </FormControl>

                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">Where to display the game?</FormLabel>
                    <RadioGroup aria-label="same_email" defaultValue="yes" name="same_email">
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="Desktop"
                        control={<Checkbox />}
                        label="Desktop"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="Tablet"
                        control={<Checkbox />}
                        label="Tablet"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="Mobile"
                        control={<Checkbox />}
                        label="Mobile"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">
                      How do you want your customer to receive the coupon?
                    </FormLabel>
                    <RadioGroup
                      aria-label="receive_coupon"
                      defaultValue="winning_game_screen"
                      name="receive_coupon"
                    >
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="winning_game_screen"
                        control={<Radio />}
                        label="Winning game screen"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="send_through_email"
                        control={<Radio />}
                        label="Send through email"
                      />
                      <FormControlLabel
                        className={css.form__formControl_label}
                        value="winning_game_screen_and_email"
                        control={<Radio />}
                        label="Winnig game screen and email"
                      />
                      <div className={css.form__formControl_element}>
                        <Radio value="hide_coupon" />
                        <span className={css.form__formControl_elementLabel}>
                          <i>Hide coupon code</i>
                          <Input
                            className={css.form__formControl_elementInput}
                            defaultValue="Coupon code sent to your email"
                            type="text"
                            color="secondary"
                          />
                        </span>
                      </div>
                    </RadioGroup>
                  </FormControl>

                  <FormControl className={css.form__formControl}>
                    <FormLabel component="legend">Where should the game appear?</FormLabel>
                    <div className={css.form__formControl_element}>
                      <span className={css.form__formControl_elementLabel}>
                        <Select displayEmpty className={css.selectEmpty}>
                          <MenuItem value="show">Show on</MenuItem>
                          <MenuItem value="dont_show">Don&apos;t show</MenuItem>
                        </Select>
                        <i>yourwebsite.com/</i>
                        <Input type="text" />
                      </span>
                    </div>
                  </FormControl>

                  <FormControl component="fieldset" className={css.formControl}>
                    <FormLabel component="legend">When does the coupon expires?</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch value="gilad" />}
                        label="Countdown Time 15 Min."
                      />
                      <p>
                        (This countdown will be displayed to your site visitor to create a sense of
                        urgency to complete the purchase)
                      </p>
                      <FormControlLabel
                        control={<Switch value="jason" />}
                        label="Make GDPR compiliance"
                      />
                      <p>
                        Add mandatory checkbox to your game for validation that the visitor agrees
                        to join the mailing list to follow GDPR regulations.
                      </p>
                      <p>Learn More</p>
                    </FormGroup>
                  </FormControl>
                  <Button
                    variant="contained"
                    color="primary"
                    className={cx(css.button__dark_blue, css.button)}
                  >
                    Save Settings
                  </Button>
                </React.Fragment>
              </form>
            </Scrollbars>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default GlobalSettingsContainer;
