import React from 'react';
import cx from 'classnames';
import { Button } from '@material-ui/core';
import { TrashIcon } from 'assets/images/icons';

import { PARAMS } from 'config';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame/PrimaryIcon.scss';

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
    const image = PARAMS.widget_icons.some(e => e.url === iconData.icon);

    if (image) {
      this.setState({ image: '' });
    }
  }

  handleChooseIcon = e => {
    const { iconData } = this.props;
    const { value } = e.currentTarget;
    this.setState({
      activeIcon: value,
      image: '',
    });
    iconData.icon = value;
  };

  handleChangeImage = e => {
    const { iconData } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size < 900000) {
      reader.onload = upload => {
        this.setState({
          image: upload.target.result,
          bigSize: false,
          activeIcon: upload.target.result,
        });
        iconData.icon = upload.target.result;
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
      activeIcon: PARAMS.widget_icons[0].url,
    });
    iconData.icon = PARAMS.widget_icons[0].url;
  };

  render() {
    const { activeIcon, image, bigSize } = this.state;
    const { handleCloseTabContent, tabValue } = this.props;
    // console.log(activeIcon);
    return (
      <TabContentComponent
        title="Primary Icon"
        description="Below you can select the requred icon for your game popup"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <h4>Predefined Icons</h4>
        <ul className={css.currentGame__iconsList}>
          {PARAMS.widget_icons.map(icon => (
            <li
              key={icon.name}
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
        <div className={css.currentGame__imageBlock}>
          {image ? (
            <>
              <img src={image} alt="Background" />
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
        <h5>Note: Please use the PNG format with a transparent background.</h5>
      </TabContentComponent>
    );
  }
}

export default PrimaryIconContainer;
