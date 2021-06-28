import React from 'react';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, OutlinedInput } from '@material-ui/core';

import { paramsDefault } from '../../../actions';
import TabContentComponent from '../components/TabContentComponent';
import ChooseColorContainer from './ChooseColorContainer';

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

class TriggerButtonContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      getParamsDefault: {
        data: { behavior },
      },
    } = props;
    this.state = {
      title: behavior.trigger_button.title,
      errors: {
        title: '',
      },
    };
  }

  handleChangeParams = e => {
    const { name, value } = e.target;
    const { errors } = this.state;
    switch (name) {
      case 'title':
        errors.title =
          value.length < 3 || value.length > 20 ? 'Title must be 3 or less than 20 characters' : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => this.validateForm());
  };

  validateForm = () => {
    const { errors, title } = this.state;
    if (validation(errors)) {
      const { paramsDefaultAction, getParamsDefault } = this.props;
      const newData = {
        title,
      };
      const params = { ...getParamsDefault.data };
      Object.assign(params.behavior.trigger_button, newData);
      paramsDefaultAction(params);
    }
  };

  handleEditColor = trigger => value => {
    let color = '';
    if (typeof value === 'object') {
      const { r, g, b, a } = value;
      color = `rgba(${r},${g},${b},${a})`;
    } else {
      color = value;
    }
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const params = { ...getParamsDefault.data };
    params.behavior.trigger_button[trigger] = color;
    paramsDefaultAction(params);
  };

  handleSubmitTitle = () => {
    const { errors } = this.state;
    if (validation(errors)) {
      const { handleCloseTabContent } = this.props;
      handleCloseTabContent();
    }
  };

  render() {
    const { title, errors } = this.state;
    const { tabValue, getParamsDefault } = this.props;
    const { trigger_button: triggerButton } = getParamsDefault.data.behavior;

    return (
      <TabContentComponent
        title="Trigger Button"
        description="Here you can customize the button which should open the popup window."
        tabValue={tabValue}
        handleCloseTabContent={this.handleSubmitTitle}
      >
        <form>
          <FormControl fullWidth className='form_input'>
            <h4>Title</h4>
            <OutlinedInput
              name="title"
              placeholder="Get free gift!"
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

          <ChooseColorContainer
            title="Text Color"
            color={triggerButton.text_color}
            handleEditColor={this.handleEditColor('text_color')}
          />
          <ChooseColorContainer
            title="Background Color"
            color={triggerButton.bg_color}
            handleEditColor={this.handleEditColor('bg_color')}
          />
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
)(TriggerButtonContainer);
