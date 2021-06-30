import React from 'react';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, OutlinedInput, TextField } from '@material-ui/core';

import { paramsDefault } from '../../../actions';
import TabContentComponent from '../components/TabContentComponent';

import '../../../../styles/pages/CurrentGame.scss';

const validation = errors => {
  let valid = true;
  Object.values(errors).forEach(
    // eslint-disable-next-line no-return-assign
    // eslint-disable-next-line arrow-parens
    // eslint-disable-next-line no-return-assign
    val => val.length > 0 && (valid = false),
  );
  return valid;
};

class ProgressScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      getParamsDefault: {
        data: { content },
      },
    } = props;

    this.state = {
      title: content.progress.title,
      subtitle: content.progress.subtitle,
      errors: {
        title: '',
        subtitle: '',
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
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => this.validateForm());
    console.log(errors);
  };

  validateForm = () => {
    const { errors, title, subtitle } = this.state;
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
    const params = { ...data };

    Object.assign(params.content.progress, newData);
    paramsDefaultAction(params);
  };

  render() {
    const { tabValue } = this.props;
    const { title, subtitle, errors } = this.state;
    return (
      <TabContentComponent
        title="Progress Screen"
        description="Here you can edit the content which shoudl be shown on this section"
        tabValue={tabValue}
        handleCloseTabContent={this.handleSubmitForm}
      >
        <form>
          <FormControl fullWidth className='form_input'>
            <h4>Title</h4>
            <OutlinedInput
              name="title"
              placeholder="Get your Christmas present!"
              onChange={this.handleChangeParams}
              value={title}
              aria-describedby="error-text"
            />
            {errors.title.length > 0 && (
              <FormHelperText className='form_inputError' id="error-text">
                {errors.title}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth className='form_input'>
            <h4>Sub Title</h4>
            <TextField
              name="subtitle"
              placeholder="One of our awesome gifts already yours! One step more to receive it."
              multiline
              variant="outlined"
              onChange={this.handleChangeParams}
              value={subtitle}
            />
            {errors.subtitle.length > 0 && (
              <FormHelperText className='form_inputError' id="error-text">
                {errors.subtitle}
              </FormHelperText>
            )}
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
)(ProgressScreenContainer);
