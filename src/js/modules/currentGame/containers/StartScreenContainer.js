import React from 'react';
import {
  FormControl,
  FormHelperText,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';

import { paramsDefault } from 'actions';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

const validation = errors => {
  let valid = true;
  // eslint-disable-next-line no-return-assign
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class StartScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      getParamsDefault: {
        data: { content },
      },
    } = props;

    this.state = {
      title: content.start.title,
      subtitle: content.start.subtitle,
      button: content.start.button,
      name: content.start.form[1].checked,
      phone: content.start.form[2].checked,
      errors: {
        title: '',
        subtitle: '',
        button: '',
      },
    };
  }

  handleSubmitForm = () => {
    const { errors } = this.state;
    if (validation(errors)) {
      const { handleCloseTabContent } = this.props;
      handleCloseTabContent();
    }
  };

  handleChangeParams = e => {
    const { name, value } = e.target;
    const { errors } = this.state;

    switch (name) {
      case 'title':
        errors.title =
          value.length < 3 || value.length > 50 ? 'Title must be 3 or less than 50 characters' : '';
        break;
      case 'subtitle':
        errors.subtitle =
          value.length < 3 || value.length > 70
            ? 'Subtitle must be 3 or less than 70 characters'
            : '';
        break;
      case 'button':
        errors.button =
          value.length < 2 || value.length > 6 ? 'Button must be 2 or less than 6 characters' : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => this.validateForm());
    console.log(errors);
  };

  validateForm = () => {
    const { errors, title, subtitle, button } = this.state;
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const newData = [];
    if (errors.title.length === 0) {
      newData.title = title;
    }
    if (errors.subtitle.length === 0) {
      newData.subtitle = subtitle;
    }
    if (errors.button.length === 0) {
      newData.button = button;
    }
    const params = { ...data };

    Object.assign(params.content.start, newData);
    paramsDefaultAction(params);
  };

  handleChangeParamsForm = e => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const { name, checked } = e.target;
    this.setState({ [name]: checked });

    const params = { ...data };
    const index = params.content.start.form.findIndex(item => item.name === name);
    params.content.start.form[index].checked = checked;
    paramsDefaultAction(params);
  };

  render() {
    const { tabValue } = this.props;
    const { title, subtitle, button, name, phone, errors } = this.state;

    return (
      <TabContentComponent
        title="Start Screen"
        description="Here you can edit the content which shoudl be shown on this section"
        tabValue={tabValue}
        handleCloseTabContent={this.handleSubmitForm}
      >
        <form>
          <FormControl fullWidth className={css.form_input}>
            <h4>Title</h4>
            <OutlinedInput
              name="title"
              placeholder="Get your Christmas present!"
              onChange={this.handleChangeParams}
              value={title}
              aria-describedby="error-title"
            />
            {errors.title.length > 0 && (
              <FormHelperText className={css.form_inputError} id="error-title">
                {errors.title}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth className={css.form_input}>
            <h4>Sub Title</h4>
            <TextField
              name="subtitle"
              placeholder="One of our awesome gifts already yours! One step more to receive it."
              multiline
              variant="outlined"
              onChange={this.handleChangeParams}
              value={subtitle}
              aria-describedby="error-subtitle"
            />
            {errors.subtitle.length > 0 && (
              <FormHelperText className={css.form_inputError} id="error-subtitle">
                {errors.subtitle}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth className={css.form_input}>
            <h4>Start Button Label</h4>
            <OutlinedInput
              name="button"
              placeholder="START"
              onChange={this.handleChangeParams}
              value={button}
              aria-describedby="error-button"
            />
            {errors.button.length > 0 && (
              <FormHelperText className={css.form_inputError} id="error-button">
                {errors.button}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth className={css.form_input}>
            <h4>Enable Form Inputs</h4>
            <FormControlLabel
              classes={{ root: css.form_checkboxLabel }}
              control={<Checkbox disabled checked color="secondary" name="email" />}
              label="Email Address"
            />
            <FormControlLabel
              classes={{ root: css.form_checkboxLabel }}
              control={
                <Checkbox
                  checked={name}
                  onChange={this.handleChangeParamsForm}
                  value="name"
                  name="name"
                  color="secondary"
                />
              }
              label="Full Name"
            />
            <FormControlLabel
              classes={{ root: css.form_checkboxLabel }}
              control={
                <Checkbox
                  checked={phone}
                  onChange={this.handleChangeParamsForm}
                  value="phone"
                  name="phone"
                  color="secondary"
                />
              }
              label="Phone Number"
            />
          </FormControl>
        </form>
      </TabContentComponent>
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
)(StartScreenContainer);
