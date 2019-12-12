import React from 'react';
// import {  } from '@material-ui/core';

import { PARAMS } from 'config';
import TabContentComponent from 'modules/currentGame/components/TabContentComponent';

import css from 'styles/pages/CurrentGame.scss';

class PrimaryIconContainer extends React.Component {
  state = {
    activeIcon: 'icon4',
  };

  handleChooseIcon = e => {
    const { value } = e.currentTarget;
    this.setState({ activeIcon: value });
  };

  render() {
    const { activeIcon } = this.state;
    const { handleCloseTabContent, tabValue } = this.props;
    console.log(activeIcon);
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
              className={activeIcon === icon.name ? css.currentGame__activeIcon : null}
            >
              <button
                type="button"
                onClick={this.handleChooseIcon}
                name="activeIcon"
                value={icon.name}
              >
                <icon.component />
              </button>
            </li>
          ))}
        </ul>
        <h4>Custom Icon</h4>
        <h5>Note: Please use the PNG format with a transparent background.</h5>
      </TabContentComponent>
    );
  }
}

export default PrimaryIconContainer;
