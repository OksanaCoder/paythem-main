import React from 'react';
import cx from 'classnames';
import {
  Button,
  Popover,
  OutlinedInput,
  FormControl,
  Slider,
  FormHelperText,
} from '@material-ui/core';
import Formik from '../../../helpers/Formik';
import { CouponsSchema } from '../../../helpers/Formik/validation';

import { TrashIcon, DoneIcon2 } from '../../../../assets/images/icons';

import css from '../../../../styles/pages/currentGame/Coupons.scss';

const CouponPopoverComponent = ({
  data: { value, resultText, probability, chanceReal },
  open,
  handleClose,
  handleChangeSliderRange,
  handleCoupon,
  deleteCoupon,
  dataLength,
  idPopover,
  anchorEl,
  couponItemEdit,
}) => {
  return (
    <Popover
      id={idPopover}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Formik
        initialValues={{
          value,
          resultText,
        }}
        validationSchema={CouponsSchema}
        onSubmit={handleCoupon}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form className={css.coupon__form}>
            <FormControl fullWidth className={css.form_input}>
              <h4>Title</h4>
              <OutlinedInput
                className={css.coupon__form_input}
                name="value"
                placeholder="Name"
                onChange={handleChange}
                value={values.value}
                error={errors.value && touched.value}
              />
              {errors.value && touched.value && (
                <FormHelperText className={css.form_inputError} id="error-text">
                  {errors.value}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth className={css.form_input}>
              <h4>Coupon Code</h4>
              <OutlinedInput
                className={css.coupon__form_input}
                name="resultText"
                placeholder="FC11DC"
                onChange={handleChange}
                value={values.resultText}
                error={errors.resultText && touched.resultText}
              />
              {errors.resultText && touched.resultText && (
                <FormHelperText className={css.form_inputError} id="error-text">
                  {errors.resultText}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth className={css.form_input}>
              <h4>Gravity</h4>
              <Slider
                className={css.coupon__form_slider}
                onChange={handleChangeSliderRange(couponItemEdit ? couponItemEdit.id : '')}
                value={probability}
                defaultValue={20}
                valueLabelDisplay="auto"
                step={10}
                min={0}
                max={100}
              />
            </FormControl>
            <FormControl fullWidth className={css.form_input}>
              <h4>Chance</h4>
              <p>{chanceReal}</p>
            </FormControl>

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className={cx(css.button__top, css.button__top_lightBlue)}
            >
              <DoneIcon2 />
              {couponItemEdit ? 'Save changes' : 'Add Item'}
            </Button>
            {couponItemEdit ? (
              <Button
                onClick={deleteCoupon(couponItemEdit.id)}
                variant="contained"
                color="primary"
                className={cx(
                  css.button__top,
                  css.button__top_lightBlue,
                  css.button__top_icon,
                  css.coupon__form_btn,
                )}
                disabled={dataLength <= 4}
              >
                <TrashIcon />
              </Button>
            ) : null}
          </form>
        )}
      </Formik>
    </Popover>
  );
};

export default CouponPopoverComponent;
