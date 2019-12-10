import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

import css from 'styles/pages/CurrentGame.scss';

const InnerTabsListCurrentGameComponent = ({
  tabValue,
  handleChangeTabsIntegration,
  tabsArr,
  tabsTitle,
}) => {
  return (
    <div className={css.currentGame__content_menuBlock}>
      <h4>{tabsTitle}</h4>
      <Tabs
        classes={{
          indicator: css.currentGame__tabs_indicator,
        }}
        orientation="vertical"
        variant="scrollable"
        value={tabValue}
        onChange={handleChangeTabsIntegration}
      >
        {tabsArr.map(item => {
          return (
            <Tab
              key={item.value}
              classes={{
                wrapper: css.currentGame__tabs_iconLabelWrapper,
                labelContainer: css.currentGame__tabs_labelContainer,
              }}
              className={css.button__constructor}
              label={item.label}
              icon={<item.icon />}
              value={item.value}
            />
          );
        })}
      </Tabs>
    </div>
  );
};

export default InnerTabsListCurrentGameComponent;
