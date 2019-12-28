import React from 'react';

import css from '../style.scss';

const FinishWidgetComponent = ({ getParamsDefault }) => (
  <div className={css.PtwModalRootWin}>
    <div
      className={css.PtwModalRootWin__logo}
      style={{
        backgroundImage: `url("${getParamsDefault.content.finish.company_logo}")`,
      }}
    />
    <div className={css.PtwModalRootWinCoupon}>
      <h3 className={css.PtwModalRootWinCoupon__title}>25% Discount</h3>
      <p className={css.PtwModalRootWinCoupon__subtitle}>Your discount code:</p>
      <p className={css.PtwModalRootWinCoupon__code}>10 cash</p>
    </div>
    <div className={css.PtwModalRootWin__wrap}>
      <p className={css.PtwModalRootWin__button}>use it now</p>
      <p className={css.PtwModalRootWin__info}>{getParamsDefault.content.finish.privacy}</p>
    </div>
  </div>
);

export default FinishWidgetComponent;
