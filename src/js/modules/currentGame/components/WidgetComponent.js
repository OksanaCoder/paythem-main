import React from 'react';
import cx from 'classnames';

import css from 'styles/pages/CurrentGame/GameWidget.scss';

const WidgetComponent = content => {
  const { title, subtitle, button } = content.content.start;
  console.log('content', content);

  return (
    <div className={css.PtwModalRoot__container}>
      <button className={css.PtwModalRoot__close} type="button">
        <span />
      </button>
      <div className={css.PtwModalRoot__dialog}>
        <div className={css.PtwModalRoot__icon} />
        <div className={css.PtwModalRoot__inner}>
          <button className={css.PtwModalRoot__button} type="button">
            <span>{button}</span>
          </button>
          <h2 className={css.PtwModalRoot__title}>{title}</h2>
          <h3 className={css.PtwModalRoot__subtitle}>{subtitle}</h3>
          <form className={css.PtwModalRootForm}>
            <div className={css.PtwModalRootForm__item}>
              <input
                className={cx(css.PtwModalRootForm__input, css.PtwModalRootForm__input_email)}
                type="email"
                name="email"
                placeholder="Email"
              />
              <span
                className={cx(css.PtwModalRootForm__error, css.PtwModalRootForm__error_email)}
              />
            </div>
            <div className={css.PtwModalRootForm__item}>
              <input
                className={cx(css.PtwModalRootForm__input, css.PtwModalRootForm__input_name)}
                type="text"
                name="name"
                placeholder="Full Name"
              />
              <span className={cx(css.PtwModalRootForm__error, css.PtwModalRootForm__error_name)} />
            </div>
            <div className={css.PtwModalRootForm__item}>
              <input
                className={cx(css.PtwModalRootForm__input, css.PtwModalRootForm__input_phone)}
                type="text"
                name="phone"
                placeholder="Phone Number"
              />
              <span
                className={cx(css.PtwModalRootForm__error, css.PtwModalRootForm__error_phone)}
              />
            </div>
          </form>
          <div className={css.PtwModalRootGame}>
            <div className={css.PtwModalRootGame__indicator} />

            <div className={css.PtwModalRootGame__roullete}>
              <canvas id="wheel" width="500" height="500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetComponent;
