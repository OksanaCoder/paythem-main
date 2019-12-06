import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import cx from 'classnames';
import css from 'styles/pages/GameConstructor/TabListComponent.scss';

const GameConstructorTabListComponent = ({ tabValue, tabsChangeHandler }) => {
  return (
    <Tabs
      classes={{ indicator: css.tabs_indicator }}
      orientation="vertical"
      textColor="primary"
      value={tabValue}
      onChange={tabsChangeHandler}
    >
      <Tab
        classes={{ selected: css.tab_active }}
        className={css.tab__btn}
        label={<i>Game Settings</i>}
        icon={<span className={cx(css.tab__icon, css.tab__icon_gameSettings)} />}
      />
      <Tab
        classes={{ selected: css.tab_active }}
        className={css.tab__btn}
        label={<i>Win Settings</i>}
        icon={<span className={cx(css.tab__icon, css.tab__icon_winSettings)} />}
      />
      <Tab
        classes={{ selected: css.tab_active }}
        className={css.tab__btn}
        label={<i>Edit Coupons</i>}
        icon={<span className={cx(css.tab__icon, css.tab__icon_editCoupons)} />}
      />
      <Tab
        classes={{ selected: css.tab_active }}
        className={css.tab__btn}
        label={<i>Global Settings</i>}
        icon={<span className={cx(css.tab__icon, css.tab__icon_globalSettings)} />}
      />
      <Tab
        classes={{ selected: css.tab_active }}
        className={css.tab__btn}
        label={<i>Edit widget</i>}
        icon={<span className={cx(css.tab__icon, css.tab__icon_editWidget)} />}
      />
    </Tabs>
  );
};

export default GameConstructorTabListComponent;
