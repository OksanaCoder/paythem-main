/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import cx from 'classnames';
import uuidv5 from 'uuid';
import { Grid, Button } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';

import CouponItemComponent from 'pages/Admin/GameConstructor/components/CouponItemComponent';
import CouponDialog from 'pages/Admin/GameConstructor/components/CouponDialog';

import css from 'styles/pages/GameConstructor/EditCoupons.scss';

class EditCouponsContainer extends Component {
  state = {
    open: false,
    name: '',
    code: '',
    chance: 10,
    couponItemEdit: false,
    couponsData: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(prevState);
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

  handleOpenModal = coupon => () => {
    this.setState({
      open: true,
      name: coupon.name || '',
      code: coupon.code || '',
      chance: coupon.chance || 20,
      couponItemEdit: coupon || undefined,
    });
  };

  handleCloseModal = () => {
    this.setState({
      open: false,
    });
  };

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { couponItemEdit } = this.state;
    let couponsDataUpdated = [];
    if (!couponItemEdit) {
      const { couponsData } = this.addCoupon();
      couponsDataUpdated = couponsData;
    } else {
      const { couponsData } = this.updateCoupon();
      couponsDataUpdated = couponsData;
    }
    this.setState({
      open: false,
      couponsData: couponsDataUpdated,
    });
  };

  addCoupon = () => {
    const { couponsData } = this.state;
    const { name, code, chance } = this.state;
    const newData = {
      id: uuidv5(),
      name,
      code,
      chance,
    };
    couponsData.push(newData);
    return { couponsData };
  };

  updateCoupon = () => {
    const { couponsData } = this.state;
    const { name, code, chance, couponItemEdit } = this.state;
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
    const { couponsData, open, name, code, chance } = this.state;

    return (
      <Grid container spacing={3}>
        <Grid item className={css.tab__content}>
          <div className={css.tab__content_header}>
            <h4 className={css.heading_info}>Click on coupons for changing</h4>
          </div>
          <div className={css.tab__content_coupons}>
            <Scrollbars style={{ height: 600 }}>
              <div className={css.tab__content_couponsInner}>
                {couponsData.map(coupon => {
                  return (
                    <CouponItemComponent
                      key={coupon.id}
                      dataLength={couponsData.length}
                      data={coupon}
                      deleteCoupon={this.deleteCoupon(coupon.id)}
                      handleOpenModal={this.handleOpenModal(coupon)}
                      truncateString={this.truncateString}
                    />
                  );
                })}
              </div>
            </Scrollbars>
          </div>

          <Button
            variant="contained"
            color="primary"
            // disabled={couponsData !== undefined && couponsData.length >= 12}
            className={cx(css.button__dark_blue, css.button, css.tab__content_couponsAddBtn)}
            onClick={this.handleOpenModal('')}
          >
            Add coupon
          </Button>

          <CouponDialog
            data={{ name, code, chance }}
            open={open}
            handleCloseModal={this.handleCloseModal}
            handleChangeInput={this.handleChangeInput}
            handleCoupon={this.handleSubmit}
          />
        </Grid>
      </Grid>
    );
  }
}

export default EditCouponsContainer;
