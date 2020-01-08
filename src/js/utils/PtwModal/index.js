/* eslint-disable react/button-has-type */
import React from 'react';
import cx from 'classnames';

import RouletteGame from './games/roulette';
import FinishWidgetComponent from './steps/FinishWidgetComponent';

import css from './style.scss';

// eslint-disable-next-line no-unused-vars
const PtwModal = ({
  getParamsDefault: { data },
  widgetViewValue,
  game = 'roulette',
  handlePreviewWidget,
}) => {
  const { game_style: gameStyle, content, behavior } = data;

  const styleContainer = {
    backgroundImage: `url("${gameStyle.popup_bg.bg_image}")`,
  };
  const styleContainerColorOverlay = {
    backgroundColor: gameStyle.popup_bg.bg_overlay,
  };
  const styleDialog = {
    backgroundColor: gameStyle.color_scheme.bg_window,
  };
  const styleIcon = {
    backgroundImage: `url("${gameStyle.icon}")`,
    backgroundColor: gameStyle.color_scheme.bg_window,
  };
  const styleContent = {
    color: gameStyle.color_scheme.text_content,
  };
  const styleButton = {
    backgroundColor: gameStyle.color_scheme.bg_indicator_button,
    color: gameStyle.color_scheme.text_button,
  };
  // widget (trigger btns)
  const styleWidgetButton = {
    backgroundColor: behavior.trigger_button.bg_color,
    color: behavior.trigger_button.text_color,
  };
  const styleWidgetIcon = {
    backgroundImage: `url("${gameStyle.icon}")`,
  };

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return `${str.slice(0, num)}...`;
  };

  return (
    <React.Fragment>
      <div className={css.PtwModalRoot__container} style={styleContainer}>
        <div
          className={css.PtwModalRoot__container_colorOverlay}
          style={styleContainerColorOverlay}
        />
        <button className={css.PtwModalRoot__close} type="button">
          <span />
        </button>
        <div className={css.PtwModalRoot__dialog} style={styleDialog}>
          <div className={css.PtwModalRoot__icon} style={styleIcon} />
          <div className={css.PtwModalRoot__inner}>
            <h2 className={css.PtwModalRoot__title} style={styleContent}>
              {truncateString(content[widgetViewValue].title, 50)}
            </h2>

            <h3 className={css.PtwModalRoot__subtitle} style={styleContent}>
              {truncateString(content[widgetViewValue].subtitle, 70)}
            </h3>

            {widgetViewValue === 'start' && (
              <form className={css.PtwModalRootForm}>
                {content.start.form
                  .filter(f => f.checked)
                  .map(item => (
                    <div key={item.name} className={css.PtwModalRootForm__item}>
                      <input
                        className={cx(
                          css.PtwModalRootForm__input,
                          css[`PtwModalRootForm__input_${item.name}`],
                        )}
                        type={item.type}
                        name={item.name}
                        placeholder={item.placeholder}
                      />
                    </div>
                  ))}
              </form>
            )}

            {(widgetViewValue === 'start' || widgetViewValue === 'progress') && (
              <React.Fragment>
                <button className={css.PtwModalRoot__button} type="button" style={styleButton}>
                  <span>{truncateString(content.start.button, 6)}</span>
                </button>
                <div className={css.PtwModalRootGame}>
                  {/* <div className={css.PtwModalRootGame__indicator} /> */}
                  <div className={css[`PtwModalRootGame__${game}`]}>
                    {game === 'roulette' && <RouletteGame colorScheme={gameStyle.color_scheme} />}
                  </div>
                </div>
              </React.Fragment>
            )}

            {widgetViewValue === 'finish' && (
              <FinishWidgetComponent getParamsDefault={data} game={game} />
            )}
          </div>
        </div>
      </div>

      <div className={css.PtwWidget}>
        <button className={css.PtwWidget__button} onClick={handlePreviewWidget}>
          <div className={css.PtwWidget__inner} style={styleWidgetButton}>
            {behavior.trigger_button.title}
            <span className={css.PtwWidget__icon} style={styleWidgetIcon} />
          </div>
        </button>
      </div>
    </React.Fragment>
  );
};

export default PtwModal;
