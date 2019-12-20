/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { GAMES } from 'config';
import UserIcon from 'assets/images/icons/user.svg';
import { EyeIcon, AddWebsitesIcon } from 'assets/images/icons';
import css from 'styles/pages/Home.scss';

const GamesListComponent = ({ toggleDrawer, handleChooseGame }) => {
  return (
    <section className={css.games__list}>
      <button
        type="button"
        className={css.games__list_close}
        onClick={toggleDrawer('rightPanel', false)}
      >
        Close
      </button>
      <h2>Add New Game</h2>
      <ul>
        {GAMES.map(item => {
          return (
            <li key={item.name}>
              <div className={css.games__list_img}>
                <img src={UserIcon} alt="UserIcon" />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div style={{ display: 'flex' }}>
                  <Button variant="contained" color="primary" className={css.button__top}>
                    <EyeIcon />
                    Preview
                  </Button>
                  {/* <Link to={`/game/${item.name}`} className={css.button__top}>
                    <AddWebsitesIcon />
                    Select
                  </Link> */}

                  <Button
                    variant="contained"
                    color="primary"
                    className={css.button__top}
                    onClick={() => handleChooseGame(item)}
                  >
                    <AddWebsitesIcon />
                    Select
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default GamesListComponent;
