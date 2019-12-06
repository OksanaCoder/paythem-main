import React from 'react';
import { IconButton } from '@material-ui/core';

import css from 'styles/pages/GameConstructor/EditCoupons.scss';

const CouponItemComponent = ({
  data,
  data: { name, code },
  deleteCoupon,
  dataLength,
  handleOpenModal,
  truncateString,
}) => (
  <div className={css.coupon}>
    <div className={css.coupon__inner}>
      <div className={css.coupon__promoCode}>
        <h3>{truncateString(code, 6)}</h3>
      </div>
      <div className={css.coupon__name}>
        <h3>{truncateString(name, 20)}</h3>
        <div className={css.coupon__name_btns}>
          <IconButton className={css.coupon__name_btnEdit} onClick={handleOpenModal} />
          <IconButton
            disabled={dataLength <= 4}
            className={css.coupon__name_btnDelete}
            onClick={() => deleteCoupon(data)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default CouponItemComponent;
