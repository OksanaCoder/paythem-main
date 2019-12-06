import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

import {
  ImgIcon,
  BrushIcon,
  PrizeIcon,
  CounterIcon1,
  CounterIcon2,
  CounterIcon3,
  CouponIcon,
  ConfigurationIcon2,
  TriggerButtonIcon,
} from 'assets/images/icons';
import css from 'styles/pages/CurrentGame.scss';

const TabsListCurrentGameComponent = ({ tabValue, handleChangeTabsIntegration }) => {
  return (
    <React.Fragment>
      <div className={css.currentGame__content_menuBlock}>
        <h4>Game Style</h4>
        <Tabs
          classes={{
            indicator: css.currentGame__tabs_indicator,
          }}
          orientation="vertical"
          variant="scrollable"
          value={tabValue}
          onChange={handleChangeTabsIntegration}
        >
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Popup Background"
            icon={<ImgIcon />}
            value="tabGame1"
          />
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Color Sheme"
            icon={<BrushIcon />}
            value="tabGame2"
          />
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Primary Icon"
            icon={<PrizeIcon />}
            value="tabGame3"
          />
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Trigger Button"
            icon={<TriggerButtonIcon />}
            value="tabGame4"
          />
        </Tabs>
      </div>

      <div className={css.currentGame__content_menuBlock}>
        <h4>Text Content</h4>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tabValue}
          onChange={handleChangeTabsIntegration}
        >
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Start Screen"
            icon={<CounterIcon1 />}
            value="tabContent1"
          />
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Progress Screen"
            icon={<CounterIcon2 />}
            value="tabContent2"
          />
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Finish Screen"
            icon={<CounterIcon3 />}
            value="tabContent3"
          />
        </Tabs>
      </div>

      <div className={css.currentGame__content_menuBlock}>
        <h4>Behaviour</h4>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={tabValue}
          onChange={handleChangeTabsIntegration}
        >
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="Coupons Options"
            icon={<CouponIcon />}
            value="tabBehaviour1"
          />
          <Tab
            classes={{
              wrapper: css.currentGame__tabs_iconLabelWrapper,
              labelContainer: css.currentGame__tabs_labelContainer,
            }}
            className={css.button__constructor}
            label="General Settings"
            icon={<ConfigurationIcon2 />}
            value="tabBehaviour2"
          />
        </Tabs>
      </div>
    </React.Fragment>
  );
};

export default TabsListCurrentGameComponent;
