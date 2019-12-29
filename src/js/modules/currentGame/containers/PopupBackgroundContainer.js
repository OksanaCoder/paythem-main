import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { TrashIcon } from 'assets/images/icons';

import { paramsDefault } from 'actions';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

import css from 'styles/pages/CurrentGame/Content.scss';

class PopupBackgroundContainer extends React.Component {
  state = {
    bigSize: false,
  };

  handleEditColor = () => value => {
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    let color = '';
    if (typeof value === 'object') {
      const { r, g, b, a } = value;
      color = `rgba(${r},${g},${b},${a})`;
    } else {
      color = value;
    }
    const params = { ...data };
    params.game_style.popup_bg.bg_overlay = color;
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
        params.game_style.popup_bg.bg_image = upload.target.result;
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
    params.game_style.popup_bg.bg_image = '';
    paramsDefaultAction(params);
    this.setState({
      bigSize: false,
    });
  };

  render() {
    const { handleCloseTabContent, tabValue, getParamsDefault } = this.props;
    const { bigSize } = this.state;
    const { popup_bg: popupBg } = getParamsDefault.data.game_style;
    console.log('popup_bg', popupBg);

    return (
      <TabContentComponent
        title="Popup Background"
        description="Below you can find the customization options of the background"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <h4>Background image</h4>
        <div className={css.currentGame__imageBlock}>
          {popupBg.bg_image ? (
            <>
              <img src={popupBg.bg_image} alt="Background" />
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

        <ChooseColorContainer
          title="Overlay color"
          color={popupBg.bgOverlay}
          handleEditColor={this.handleEditColor('bg_overlay')}
        />
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
)(PopupBackgroundContainer);
