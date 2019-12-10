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

import InnerTabsListCurrentGameComponent from 'modules/currentgame/components/InnerTabsListCurrentGameComponent';

const TabsArr1 = [
  {
    label: 'Popup Background',
    icon: ImgIcon,
    value: 'tabGame1',
  },
  {
    label: 'Color Sheme',
    icon: BrushIcon,
    value: 'tabGame2',
  },
  {
    label: 'Primary Icon',
    icon: PrizeIcon,
    value: 'tabGame3',
  },
  {
    label: 'Trigger Button',
    icon: TriggerButtonIcon,
    value: 'tabGame4',
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
    label: 'Coupons Options',
    icon: CouponIcon,
    value: 'tabBehaviour1',
  },
  {
    label: 'General Settings',
    icon: ConfigurationIcon2,
    value: 'tabBehaviour2',
  },
];

const TabsListCurrentGameComponent = ({ tabValue, handleChangeTabsIntegration }) => {
  return (
    <React.Fragment>
      <InnerTabsListCurrentGameComponent
        tabValue={tabValue.tabs1}
        handleChangeTabsIntegration={handleChangeTabsIntegration('tabs1')}
        tabsArr={TabsArr1}
        tabsTitle="Game Style"
      />
      <InnerTabsListCurrentGameComponent
        tabValue={tabValue.tabs2}
        handleChangeTabsIntegration={handleChangeTabsIntegration('tabs2')}
        tabsArr={TabsArr2}
        tabsTitle="Text Content"
      />
      <InnerTabsListCurrentGameComponent
        tabValue={tabValue.tabs3}
        handleChangeTabsIntegration={handleChangeTabsIntegration('tabs3')}
        tabsArr={TabsArr3}
        tabsTitle="Behaviour"
      />
    </React.Fragment>
  );
};

export default TabsListCurrentGameComponent;
