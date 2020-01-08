import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { FormControl, FormHelperText, OutlinedInput, TextField, Button } from '@material-ui/core';

import { paramsDefault } from 'actions';
import { TrashIcon } from 'assets/images/icons';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame/Content.scss';

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

class FinishScreenContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      getParamsDefault: {
        data: { content },
      },
    } = props;
    this.state = {
      bigSize: false,
      title: content.finish.title,
      subtitle: content.finish.subtitle,
      privacy: content.finish.privacy,
      errors: {
        title: '',
        subtitle: '',
        privacy: '',
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
      case 'privacy':
        errors.privacy =
          value.length < 3 || value.length > 70
            ? 'Privacy text must be 3 or less than 70 characters'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => this.validateForm());
  };

  validateForm = () => {
    const { errors, title, subtitle, privacy } = this.state;
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
    if (errors.privacy.length === 0) {
      newData.privacy = privacy;
    }
    const params = { ...data };

    Object.assign(params.content.finish, newData);
    paramsDefaultAction(params);
  };

  handleChangeImage = e => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size < 900000) {
      // eslint-disable-next-line no-unused-vars
      reader.onload = upload => {
        const params = { ...data };
        params.content.finish.company_logo = upload.target.result;
        paramsDefaultAction(params);
        this.setState({
          bigSize: false,
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        bigSize: true,
      });
    }
  };

  handleDeleteImage = () => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    const params = { ...data };
    params.content.finish.company_logo = '';
    paramsDefaultAction(params);
    this.setState({
      bigSize: false,
    });
  };

  render() {
    const {
      tabValue,
      getParamsDefault: {
        data: { content },
      },
    } = this.props;
    const { title, subtitle, privacy, errors, bigSize } = this.state;

    return (
      <TabContentComponent
        title="Finish Screen"
        description="Here you can edit the content which should be shown on this section"
        tabValue={tabValue}
        handleCloseTabContent={this.handleSubmitForm}
      >
        <form>
          <FormControl fullWidth className={css.form_input}>
            <h4>Title</h4>
            <OutlinedInput
              name="title"
              placeholder="Almost there! And you got…"
              onChange={this.handleChangeParams}
              value={title}
              aria-describedby="error-text"
            />
            {errors.title.length > 0 && (
              <FormHelperText className={css.form_inputError}>{errors.title}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth className={css.form_input}>
            <h4>Sub Title</h4>
            <TextField
              name="subtitle"
              placeholder="Please wait few second"
              multiline
              variant="outlined"
              onChange={this.handleChangeParams}
              value={subtitle}
            />
            {errors.subtitle.length > 0 && (
              <FormHelperText className={css.form_inputError}>{errors.subtitle}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth className={css.form_input}>
            <h4>Company Logo</h4>
            <div className={css.currentGame__imageBlock}>
              {content.finish.company_logo ? (
                <>
                  <img src={content.finish.company_logo} alt="Background" />
                  <Button
                    variant="contained"
                    color="primary"
                    className={cx(css.button__top)}
                    onClick={this.handleDeleteImage}
                  >
                    <TrashIcon />
                    Delete
                  </Button>
                </>
              ) : (
                <input
                  type="file"
                  name="file"
                  className="upload-file"
                  id="file"
                  onChange={this.handleChangeImage}
                  encType="multipart/form-data"
                />
              )}
            </div>
            {bigSize && <p className={css.form_inputError}>Image size has to be max 9Mb</p>}
          </FormControl>

          <FormControl fullWidth className={css.form_input}>
            <h4>Disclamer Text</h4>
            <TextField
              name="privacy"
              placeholder="In order to use this discount add it to the relevant field in checkout"
              multiline
              variant="outlined"
              onChange={this.handleChangeParams}
              value={privacy}
            />
            {errors.privacy.length > 0 && (
              <FormHelperText className={css.form_inputError}>{errors.privacy}</FormHelperText>
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
)(FinishScreenContainer);
