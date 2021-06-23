import React from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Button, Slider } from '@material-ui/core';
import { TrashIcon } from '../../../../assets/images/icons';

import { paramsDefault } from '../../../actions';
import TabContentComponent from '../components/TabContentComponent';
import ChooseColorContainer from './ChooseColorContainer';

import css from '../../../../styles/pages/currentGame/Content.scss';

class PopupBackgroundContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      getParamsDefault: { data },
    } = props;
    console.log('1', data.game_style.popup_bg);
    this.state = {
      bigSize: false,
      opacity: data.game_style.popup_bg.opacity ? data.game_style.popup_bg.opacity : 30,
      color: data.game_style.popup_bg.bg_overlay,
    };
  }

  handleChangeSliderRange = (e, value) => {
    const { color } = this.state;
    this.setState({ opacity: value }, () => {
      this.handleEditColor()(color);
    });
  };

  handleEditColor = () => value => {
    const { opacity } = this.state;
    const {
      paramsDefaultAction,
      getParamsDefault: { data },
    } = this.props;
    let color = '';
    if (typeof value === 'object') {
      const { r, g, b, a } = value;
      color = `rgba(${r},${g},${b},${a})`;
    } else {
      let rgba = value;
      rgba = rgba
        .substring(5, rgba.length - 1)
        .replace(/ /g, '')
        .split(',');
      this.setState({ color: value });
      color = `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${opacity / 100})`;
    }
    const params = { ...data };
    params.game_style.popup_bg.bg_overlay = color;
    params.game_style.popup_bg.opacity = opacity;
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
    const { bigSize, opacity } = this.state;
    const { popup_bg: popupBg } = getParamsDefault.data.game_style;

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
          handleEditColor={this.handleEditColor()}
        />

        <h4>Overlay Opacity</h4>
        <Slider
          className={css.form_slider}
          onChange={this.handleChangeSliderRange}
          value={opacity}
          defaultValue={20}
          valueLabelDisplay="auto"
          step={10}
          min={0}
          max={100}
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
