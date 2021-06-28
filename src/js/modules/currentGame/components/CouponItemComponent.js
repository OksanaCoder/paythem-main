import React from 'react';
// import cx from 'classnames';
import { Button } from '@material-ui/core';

import { CouponIcon, EditIcon } from '../../../../assets/images/icons';

import '../../../../styles/pages/currentGame/Coupons.scss';

const CouponItemComponent = ({ data: { value }, handleOpenPopover, truncateString }) => (
  <div className='coupon'>
    <div className='coupon__title'>
      <CouponIcon />
      {truncateString(value, 20)}
    </div>

    <Button
      variant="contained"
      color="primary"
      className='button__top button__top_icon'
      onClick={handleOpenPopover}
    >
      <EditIcon />
    </Button>
  </div>
);

export default CouponItemComponent;
