import React from 'react';

import css from 'styles/pages/CurrentGame/GameWidget.scss';

const FinishWidgetComponent = () => {
  return (
    <div className={css.PtwModalRoot__container}>
      <button className={css.PtwModalRoot__close} type="button">
        <span />
      </button>
      <div className={css.PtwModalRoot__dialog}>
        <div className={css.PtwModalRoot__icon} />
        <div className={css.PtwModalRoot__inner}>
          <h2 className={css.PtwModalRoot__title}>Get your Christmas present!</h2>
          <h3 className={css.PtwModalRoot__subtitle}>
            One of our awesome gifts already yours! One step more to receive it.
          </h3>

          <div className={css.PtwModalRootWin}>
            <div className={css.PtwModalRootWin__logo} />
            <div className={css.PtwModalRootWinCoupon}>
              <h3 className={css.PtwModalRootWinCoupon__title}>25% Discount</h3>
              <p className={css.PtwModalRootWinCoupon__subtitle}>Your discount code:</p>
              <p className={css.PtwModalRootWinCoupon__code}>10 cash</p>
            </div>
            <div className={css.PtwModalRootWin__wrap}>
              <p className={css.PtwModalRootWin__button}>use it now</p>
              <p className={css.PtwModalRootWin__info}>
                In order to use this discount add it to the relevant field in checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishWidgetComponent;
