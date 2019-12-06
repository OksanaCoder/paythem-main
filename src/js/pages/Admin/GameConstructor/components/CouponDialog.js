import React from 'react';
import cx from 'classnames';
import {
  Button,
  IconButton,
  Dialog,
  OutlinedInput,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';

import css from 'styles/pages/GameConstructor/EditCoupons.scss';

const CouponDialog = ({
  data: { name, code, chance },
  open,
  handleCloseModal,
  handleChangeInput,
  handleCoupon,
}) => (
  <Dialog open={open} onClose={handleCloseModal}>
    <form className={css.coupon__form}>
      <IconButton className={css.coupon__form_close} onClick={handleCloseModal} />
      <div className={css.coupon__form_title}>
        <h3>Coupon Settings</h3>
      </div>
      <div className={css.coupon__form_content}>
        <FormControl fullWidth>
          <h4>Coupon Name</h4>
          <OutlinedInput
            className={css.coupon__form_input}
            name="name"
            placeholder="Name"
            onChange={handleChangeInput}
            value={name}
          />
        </FormControl>
        <FormControl fullWidth>
          <h4>Coupon Code</h4>
          <OutlinedInput
            className={css.coupon__form_input}
            name="code"
            placeholder="FC11DC"
            onChange={handleChangeInput}
            value={code}
          />
        </FormControl>
        <div className={css.coupon__form_twoCol}>
          <FormControl>
            <h4>Chance</h4>
            <Select
              name="chance"
              value={chance}
              className={css.coupon__form_select}
              onChange={handleChangeInput}
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="30">30</MenuItem>
              <MenuItem value="40">40</MenuItem>
              <MenuItem value="50">50</MenuItem>
              <MenuItem value="60">60</MenuItem>
              <MenuItem value="70">70</MenuItem>
              <MenuItem value="80">80</MenuItem>
              <MenuItem value="90">90</MenuItem>
              <MenuItem value="100">100</MenuItem>
            </Select>
          </FormControl>
          <h5>15% total range</h5>
        </div>
        <Button
          onClick={handleCoupon}
          variant="contained"
          color="primary"
          className={cx(css.button__dark_blue, css.button, css.tab__content_couponsAddBtn)}
        >
          Apply
        </Button>
      </div>
    </form>
  </Dialog>
);

export default CouponDialog;
