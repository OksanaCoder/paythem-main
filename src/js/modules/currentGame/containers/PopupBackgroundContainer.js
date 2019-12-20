import React from 'react';
import cx from 'classnames';
import { Button } from '@material-ui/core';
import { TrashIcon } from 'assets/images/icons';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

import css from 'styles/pages/CurrentGame.scss';

class PopupBackgroundContainer extends React.Component {
  constructor(props) {
    super(props);
    const { popupData } = props;

    this.state = {
      image: popupData.bg_image,
      bigSize: false,
    };
  }

  handleEditColor = trigger => value => {
    // color format rgba
    console.log('trigger', trigger);
    console.log('COLOR', value);
    let color = '';
    if (typeof value === 'object') {
      const { r, g, b, a } = value;
      color = `rgba(${r},${g},${b},${a})`;
    } else {
      color = value;
    }
    const { popupData } = this.props;
    popupData[trigger] = color;
  };

  handleChangeImage = e => {
    const { popupData } = this.props;
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file.size < 900000) {
      reader.onload = upload => {
        this.setState({
          image: upload.target.result,
          bigSize: false,
        });
        popupData.bg_image = upload.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        bigSize: true,
      });
    }
  };

  handleDeleteImage = () => {
    const { popupData } = this.props;
    this.setState({
      image: '',
      bigSize: false,
    });
    popupData.bg_image = '';
  };

  render() {
    const { handleCloseTabContent, tabValue } = this.props;
    const { image, bigSize } = this.state;
    console.log(image);
    return (
      <TabContentComponent
        title="Popup Background"
        description="Below you can find the customization options of the background"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <h4>Background image</h4>
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

        <ChooseColorContainer
          title="Overlay color"
          color="red"
          handleEditColor={this.handleEditColor('bg_overlay')}
        />
      </TabContentComponent>
    );
  }
}

export default PopupBackgroundContainer;
