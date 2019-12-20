import React from 'react';
// import {  } from '@material-ui/core';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import ChooseColorContainer from 'modules/currentGame/containers/ChooseColorContainer';

// import css from 'styles/pages/CurrentGame.scss';

class PopupBackgroundContainer extends React.Component {
  constructor(props) {
    super(props);
    const { popupData } = props;
    console.log(popupData);
    this.state = {
      image: popupData.bg_image,
    };
  }

  handleEditColor = trigger => color => {
    // color format rgba
    console.log('trigger', trigger);
    console.log('COLOR', color);
  };

  handleChangeImage = e => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = upload => {
      this.setState({
        image: upload.target.result,
      });
    };
    reader.readAsDataURL(file);

    console.log('Uploaded');
  };

  render() {
    const { handleCloseTabContent, tabValue } = this.props;
    const { image } = this.state;
    console.log(image);
    return (
      <TabContentComponent
        title="Popup Background"
        description="Below you can find the customization options of the background"
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        <h4>Background image</h4>
        <input
          type="file"
          name="file"
          className="upload-file"
          id="file"
          onChange={this.handleChangeImage}
          encType="multipart/form-data"
          required
        />
        {image && <img src={image} alt="Background" />}

        <ChooseColorContainer
          title="Overlay color"
          color="red"
          handleEditColor={this.handleEditColor('overlayColor')}
        />
      </TabContentComponent>
    );
  }
}

export default PopupBackgroundContainer;
