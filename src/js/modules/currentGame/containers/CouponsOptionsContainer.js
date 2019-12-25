/* eslint-disable no-unused-vars */
import React from 'react';
import uuidv5 from 'uuid';
import { sumBy } from 'lodash';
import cx from 'classnames';
import { Button, Popover } from '@material-ui/core';

import TabContentComponent from 'modules/currentGame/components/TabContentComponent';
import CouponItemComponent from 'modules/currentGame/components/CouponItemComponent';
import CouponPopoverComponent from 'modules/currentGame/components/CouponPopoverComponent';

import { AddIcon } from 'assets/images/icons';

import css from 'styles/pages/CurrentGame/Coupons.scss';

class CouponsOptionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      name: '',
      code: '',
      chance: '',
      chanceReal: '',
      couponItemEdit: false,
      couponsData: props.couponsData,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { couponsData } = nextProps;
    this.setState({
      couponsData,
    });
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log(prevState);
  //   const { couponsData } = nextProps;
  //   return {
  //     couponsData: couponsData || prevState.couponsData,
  //   };
  // }

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
      chanceReal: coupon.chanceReal || 20,
      couponItemEdit: coupon || undefined,
    });
  };

  handleClosePopover = () => {
    this.setState({
      open: false,
      anchorEl: null,
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
    const { couponsData, chance, chanceReal } = this.state;
    const { name, code } = values;
    const newData = {
      id: uuidv5(),
      name,
      code,
      chance,
      chanceReal,
    };
    couponsData.push(newData);
    return { couponsData };
  };

  updateCoupon = values => {
    const { couponsData, chance, chanceReal, couponItemEdit } = this.state;
    const { name, code } = values;
    const { id } = couponItemEdit;
    const couponItemUpdated = { id, name, code, chance, chanceReal };
    const findIndex = couponsData.findIndex(item => item.id === id);
    couponsData.splice(findIndex, 1, couponItemUpdated);
    return { couponsData };
  };

  deleteCoupon = id => () => {
    const { couponsData: couponsDataProps } = this.props;
    const { couponsData } = this.state;

    console.log('couponsDataProps', couponsDataProps);
    console.log('couponsDataState', couponsData);

    let couponsDataUpdated = [...couponsDataProps];
    couponsDataUpdated = couponsDataUpdated.filter(item => item.id !== id);

    // const gravitySum = sumBy(couponsDataUpdated, o => o.chance);

    // couponsDataUpdated = couponsDataUpdated.map((item, i) => {
    //   // eslint-disable-next-line no-param-reassign
    //   item.chanceReal = (item.chance * 100 / gravitySum).toFixed(2);
    //   console.log('----', i, item.chanceReal)
    //   return item;
    // })

    this.setState({ couponsData: couponsDataUpdated });
  };

  handleChangeSliderRange = idCoupon => (e, value) => {
    const { couponsData } = this.state;
    let couponsDataUpdated = [...couponsData];
    let gravitySum = sumBy(couponsData, o => o.chance);
    if (idCoupon) {
      const coupon = couponsData.find(item => item.id === idCoupon);
      gravitySum = gravitySum - coupon.chance + value;
    } else {
      gravitySum += value;
    }
    const chanceRealNew = ((value * 100) / gravitySum).toFixed(2);

    couponsDataUpdated = couponsDataUpdated.map((item, i) => {
      // eslint-disable-next-line no-param-reassign
      item.chanceReal = ((item.chance * 100) / gravitySum).toFixed(2);
      console.log('----', i, item.chanceReal);
      return item;
    });
    this.setState({
      chance: value,
      chanceReal: chanceRealNew,
      couponsData: couponsDataUpdated,
    });
  };

  render() {
    const {
      couponsData,
      open,
      name,
      code,
      chance,
      chanceReal,
      anchorEl,
      couponItemEdit,
    } = this.state;
    const { handleCloseTabContent, tabValue } = this.props;
    const idPopover = open ? 'simple-popover' : undefined;

    console.log('render couponsData', couponsData);

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
          data={{ name, code, chance, chanceReal }}
          open={open}
          handleClose={this.handleClosePopover}
          handleChangeInput={this.handleChangeInput}
          handleChangeSliderRange={this.handleChangeSliderRange}
          handleCoupon={this.handleSubmit}
          deleteCoupon={this.deleteCoupon}
          idPopover={idPopover}
          anchorEl={anchorEl}
          dataLength={couponsData.length}
          couponItemEdit={couponItemEdit}
        />
      </TabContentComponent>
    );
  }
}

export default CouponsOptionsContainer;
