/* eslint-disable no-unused-vars */
import React from 'react';
import uuidv5 from 'uuid';
import { sumBy } from 'lodash';
import cx from 'classnames';
import { connect } from 'react-redux';
import { Button, Popover } from '@material-ui/core';

import { paramsDefault } from 'actions';
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
      value: '',
      resultText: '',
      probability: '',
      chanceReal: '',
      couponItemEdit: false,
      couponsData: props.couponsData,
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
      value: coupon.value || '',
      resultText: coupon.resultText || '',
      probability: coupon.probability || 20,
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
    const { paramsDefaultAction, getParamsDefault } = this.props;
    const { couponItemEdit } = this.state;
    let couponsDataUpdated = [];

    if (!couponItemEdit) {
      const { couponsData } = this.addCoupon(values);
      couponsDataUpdated = couponsData;
    } else {
      const { couponsData } = this.updateCoupon(values);
      couponsDataUpdated = couponsData;
    }

    const params = { ...getParamsDefault.data };
    params.behavior.coupons = couponsDataUpdated;
    paramsDefaultAction(params);

    this.setState({
      open: false,
      couponsData: couponsDataUpdated,
    });
  };

  addCoupon = values => {
    console.log(values);
    const { couponsData, probability, chanceReal } = this.state;
    const { value, resultText } = values;
    const newData = {
      id: uuidv5(),
      value,
      resultText,
      probability,
      chanceReal,
      type: 'string',
      userData: {
        value,
      },
    };
    couponsData.push(newData);
    return { couponsData };
  };

  updateCoupon = values => {
    const { couponsData, probability, chanceReal, couponItemEdit } = this.state;
    const { value, resultText } = values;
    const { id } = couponItemEdit;
    const couponItemUpdated = {
      id,
      value,
      resultText,
      probability,
      chanceReal,
      type: 'string',
      userData: { value },
    };
    const findIndex = couponsData.findIndex(item => item.id === id);
    couponsData.splice(findIndex, 1, couponItemUpdated);
    return { couponsData };
  };

  deleteCoupon = id => () => {
    const { couponsData: couponsDataProps, paramsDefaultAction, getParamsDefault } = this.props;

    let couponsDataUpdated = [...couponsDataProps];
    couponsDataUpdated = couponsDataUpdated.filter(item => item.id !== id);

    const gravitySum = sumBy(couponsDataUpdated, o => o.probability);

    couponsDataUpdated = couponsDataUpdated.map((item, i) => {
      // eslint-disable-next-line no-param-reassign
      item.chanceReal = ((item.probability * 100) / gravitySum).toFixed(2);
      return item;
    });

    const params = { ...getParamsDefault.data };
    params.behavior.coupons = couponsDataUpdated;
    paramsDefaultAction(params);

    this.setState({
      couponsData: couponsDataUpdated,
    });
    this.handleClosePopover();
  };

  handleChangeSliderRange = idCoupon => (e, value) => {
    const { couponsData } = this.state;
    let couponsDataUpdated = [...couponsData];
    let gravitySum = sumBy(couponsData, o => o.probability);
    if (idCoupon) {
      const coupon = couponsData.find(item => item.id === idCoupon);
      gravitySum = gravitySum - coupon.probability + value;
    } else {
      gravitySum += value;
    }
    const chanceRealNew = ((value * 100) / gravitySum).toFixed(2);

    couponsDataUpdated = couponsDataUpdated.map((item, i) => {
      // eslint-disable-next-line no-param-reassign
      item.chanceReal = ((item.probability * 100) / gravitySum).toFixed(2);
      console.log('----', i, item.chanceReal);
      return item;
    });
    this.setState({
      probability: value,
      chanceReal: chanceRealNew,
      couponsData: couponsDataUpdated,
    });
  };

  render() {
    const {
      couponsData,
      open,
      value,
      resultText,
      probability,
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
        <div
          style={{
            overflowY: 'auto',
            paddingRight: '17px',
            paddingBottom: '15px',
            maxHeight: 'calc(100vh - 234px)',
          }}
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
        </div>

        <Button
          variant="contained"
          color="primary"
          disabled={couponsData.length >= 12}
          className={cx(css.button__top, css.coupons__addBtn)}
          onClick={this.handleOpenPopover('')}
        >
          <AddIcon />
          Add new option
        </Button>

        <CouponPopoverComponent
          data={{ value, resultText, probability, chanceReal }}
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

export default connect(
  state => ({
    getParamsDefault: state.get.getParamsDefault,
  }),
  dispatch => ({
    paramsDefaultAction: data => dispatch(paramsDefault(data)),
  }),
)(CouponsOptionsContainer);
