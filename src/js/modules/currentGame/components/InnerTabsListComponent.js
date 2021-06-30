import React from 'react';
// import cx from 'classnames';
import { Tabs, Tab } from '@material-ui/core';

import css from '../../../../styles/pages/currentGame/TabList.scss';

const InnerTabsListComponent = ({ tabValue, handleChangeTabsIntegration, tabsArr, tabsTitle }) => {
  return (
    <div className='currentGame__content_menuBlock'>
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
              // className='currentGame__tabs_iconLabelWrapper currentGame__tabs_labelContainer button__constructor'
              // classes={{
              //   wrapper: css.currentGame__tabs_iconLabelWrapper,
              //   labelContainer: css.currentGame__tabs_labelContainer,
              // }}
              className='button__constructor'
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

export default InnerTabsListComponent;
