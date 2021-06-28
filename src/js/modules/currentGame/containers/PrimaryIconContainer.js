import React from 'react';
// import cx from 'classnames';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import { paramsDefault } from '../../../actions';
import { TrashIcon } from '../../../../assets/images/icons';
import { WIDGET_ICONS } from '../../../config';
import TabContentComponent from '../components/TabContentComponent';

import css from '../../../../styles/pages/currentGame/PrimaryIcon.scss';

class PrimaryIconContainer extends React.Component {
  constructor(props) {
    super(props);
    const { iconData } = props;
    this.state = {
      activeIcon: iconData.icon,
      image: iconData.icon,
      bigSize: false,
    };
  }

  componentDidMount() {
    const { iconData } = this.props;
    const image = WIDGET_ICONS.some(e => e.url === iconData.icon);

    if (image) {
      this.setState({ image: '' });
    }
  }

  handleChooseIcon = e => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const { value } = e.currentTarget;
    const params = { ...getParamsDefault.data };
    params.game_style.icon = value;
    paramsDefaultAction(params);
    this.setState({
      activeIcon: value,
      image: '',
    });
  };

  handleChangeImage = e => {
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size < 900000) {
      reader.onload = upload => {
        this.setState({
          image: upload.target.result,
          bigSize: false,
          activeIcon: upload.target.result,
        });
        const params = { ...getParamsDefault.data };
        params.game_style.icon = upload.target.result;
        paramsDefaultAction(params);
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        bigSize: true,
      });
    }
  };

  handleDeleteImage = () => {
    const { iconData } = this.props;
    this.setState({
      image: '',
      bigSize: false,
      activeIcon: WIDGET_ICONS[0].url,
    });
    iconData.icon = WIDGET_ICONS[0].url;
  };

  render() {
    const { activeIcon, image, bigSize } = this.state;
    const { handleCloseTabContent, tabValue } = this.props;

    return (
      <TabContentComponent
        title="Primary Icon"
        description="Below you can select the requred icon for your game popup"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <h4>Predefined Icons</h4>
        <ul className='currentGame__iconsList'>
          {WIDGET_ICONS.map(icon => (
            <li
              key={icon.id}
              className={activeIcon === icon.url ? css.currentGame__activeIcon : null}
            >
              <button
                type="button"
                onClick={this.handleChooseIcon}
                name="activeIcon"
                value={icon.url}
              >
                <img src={icon.url} alt="icon" />
              </button>
            </li>
          ))}
        </ul>
        <h4>Custom Icon</h4>
        <div className='currentGame__imageBlock'>
          {image ? (
            <>
              <img src={image} alt="Background" />
              <Button
                variant="contained"
                color="primary"
                className='button__top'
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
        {bigSize && <p className='form_inputError'>Image size has to be max 9Mb</p>}
        <h5>Note: Please use the PNG format with a transparent background.</h5>
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
)(PrimaryIconContainer);
