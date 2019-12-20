/* eslint-disable no-unused-vars */
import React from 'react';

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

import InnerTabsListComponent from 'modules/currentgame/components/InnerTabsListComponent';

const TabsArr1 = [
  {
    label: 'Popup Background',
    icon: ImgIcon,
    value: 'tabGame1',
  },
  {
    label: 'Color Scheme',
    icon: BrushIcon,
    value: 'tabGame2',
  },
  {
    label: 'Primary Icon',
    icon: PrizeIcon,
    value: 'tabGame3',
  },
];

const TabsArr2 = [
  {
    label: 'Start Screen',
    icon: CounterIcon1,
    value: 'tabContent1',
  },
  {
    label: 'Progress Screen',
    icon: CounterIcon2,
    value: 'tabContent2',
  },
  {
    label: 'Finish Screen',
    icon: CounterIcon3,
    value: 'tabContent3',
  },
];

const TabsArr3 = [
  {
    label: 'Trigger Button',
    icon: TriggerButtonIcon,
    value: 'tabBehaviour1',
  },
  {
    label: 'Coupons Options',
    icon: CouponIcon,
    value: 'tabBehaviour2',
  },
  {
    label: 'General Settings',
    icon: ConfigurationIcon2,
    value: 'tabBehaviour3',
  },
];

const TabsListComponent = ({ tabValue, handleChangeTabsIntegration }) => {
  return (
    <React.Fragment>
      <InnerTabsListComponent
        tabValue={tabValue.tabs1}
        handleChangeTabsIntegration={handleChangeTabsIntegration('tabs1')}
        tabsArr={TabsArr1}
        tabsTitle="Game Style"
      />
      <InnerTabsListComponent
        tabValue={tabValue.tabs2}
        handleChangeTabsIntegration={handleChangeTabsIntegration('tabs2')}
        tabsArr={TabsArr2}
        tabsTitle="Text Content"
      />
      <InnerTabsListComponent
        tabValue={tabValue.tabs3}
        handleChangeTabsIntegration={handleChangeTabsIntegration('tabs3')}
        tabsArr={TabsArr3}
        tabsTitle="Behavior"
      />
    </React.Fragment>
  );
};

export default TabsListComponent;
