/* eslint-disable no-unused-vars */
import React from 'react';
import uuidv5 from 'uuid';
import cx from 'classnames';
import { Button, Popover } from '@material-ui/core';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import CouponItemComponent from 'modules/currentGame/components/CouponItemComponent';
import CouponPopoverComponent from 'modules/currentGame/components/CouponPopoverComponent';

import { AddIcon } from 'assets/images/icons';

import css from 'styles/pages/CurrentGame/Coupons.scss';

class CouponsOptionsContainer extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    name: '',
    code: '',
    chance: 10,
    couponItemEdit: false,
    couponsData: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(prevState);
    const { couponsData } = nextProps;
    return {
      couponsData: couponsData || prevState.couponsData,
    };
  }

  truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}...`;
  };

  handleOpenPopover = coupon => e => {
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
      name: coupon.name || '',
      code: coupon.code || '',
      chance: coupon.chance || 20,
      couponItemEdit: coupon || undefined,
    });
  };

  handleClosePopover = () => {
    this.setState({
      open: false,
      anchorEl: null,
    });
  };

  // handleChangeInput = e => {
  //   const { name, value } = e.target;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  handleChangeSliderRange = (e, value) => {
    this.setState({
      chance: value,
    });
  };

  handleSubmit = values => {
    console.log(values);
    const { couponItemEdit } = this.state;
    let couponsDataUpdated = [];
    if (!couponItemEdit) {
      const { couponsData } = this.addCoupon(values);
      couponsDataUpdated = couponsData;
    } else {
      const { couponsData } = this.updateCoupon(values);
      couponsDataUpdated = couponsData;
    }
    this.setState({
      open: false,
      couponsData: couponsDataUpdated,
    });
  };

  addCoupon = values => {
    console.log(values);
    const { couponsData, chance } = this.state;
    const { name, code } = values;
    const newData = {
      id: uuidv5(),
      name,
      code,
      chance,
    };
    couponsData.push(newData);
    return { couponsData };
  };

  updateCoupon = values => {
    const { couponsData, chance, couponItemEdit } = this.state;
    const { name, code } = values;
    const { id } = couponItemEdit;
    const couponItemUpdated = { id, name, code, chance };
    const findIndex = couponsData.findIndex(item => item.id === id);
    couponsData.splice(findIndex, 1, couponItemUpdated);
    return { couponsData };
  };

  deleteCoupon = id => () => {
    const { couponsData } = this.state;
    const index = couponsData.findIndex(coupon => coupon.id === id);
    couponsData.splice(index, 1);
    this.setState({ couponsData });
  };

  render() {
    const { couponsData, open, name, code, chance, anchorEl, couponItemEdit } = this.state;
    const { handleCloseTabContent, tabValue } = this.props;
    const id = open ? 'simple-popover' : undefined;

    return (
      <TabContentComponent
        title="Coupon Options"
        description="Here you can customize the data of each coupon from the game."
        tabValue={tabValue}
        handleCloseTabContent={handleCloseTabContent}
      >
        {couponsData.map(coupon => {
          return (
            <CouponItemComponent
              key={coupon.id}
              dataLength={couponsData.length}
              data={coupon}
              deleteCoupon={this.deleteCoupon(coupon.id)}
              handleOpenPopover={this.handleOpenPopover(coupon)}
              truncateString={this.truncateString}
            />
          );
        })}

        <Button
          variant="contained"
          color="primary"
          disabled={couponsData !== undefined && couponsData.length >= 12}
          className={cx(css.button__top, css.coupons__addBtn)}
          onClick={this.handleOpenPopover('')}
        >
          <AddIcon />
          Add new option
        </Button>

        <CouponPopoverComponent
          data={{ name, code, chance }}
          open={open}
          handleClose={this.handleClosePopover}
          handleChangeInput={this.handleChangeInput}
          handleChangeSliderRange={this.handleChangeSliderRange}
          handleCoupon={this.handleSubmit}
          deleteCoupon={this.deleteCoupon}
          id={id}
          anchorEl={anchorEl}
          dataLength={couponsData.length}
          couponItemEdit={couponItemEdit}
        />
      </TabContentComponent>
    );
  }
}

export default CouponsOptionsContainer;
