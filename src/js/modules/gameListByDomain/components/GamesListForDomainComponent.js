/* eslint-disable no-unused-vars */
/* eslint-disable */
import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { CSVLink, CSVDownload } from 'react-csv';
import { withStyles, Switch, Button } from '@material-ui/core';

import UserIcon from 'assets/images/icons/user.svg';
import { DownloadIcon, ResetIcon, EditIcon, TrashIcon, EyeIcon } from 'assets/images/icons';
import css from 'styles/pages/Home.scss';

const CustomSwitch = withStyles({
  root: {
    width: 40,
    height: 24,
    padding: 0,
    marginRight: 10,
  },
  switchBase: {
    padding: 5,
    color: '#ccc',
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#55CE31',
      '& + $track': {
        backgroundColor: '#F1F6FC',
        opacity: 1,
        border: `1px solid #CEE1F6;`,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    borderRadius: 24 / 2,
    border: `1px solid #CEE1F6;`,
    backgroundColor: '#F1F6FC',
    opacity: 1,
  },
  checked: {},
})(Switch);

const csvHeaders = [
  { label: 'Email', key: 'email' },
  { label: 'Phone', key: 'phone' },
  { label: 'Full Name', key: 'name' },
];

const csvData = [
  {
    email: 'andrew.velkov@gmail.com',
    phone: '0682800932',
    name: 'Andrew Velkov',
  },
  {
    email: 'andrew.velk2ov@gmail.com',
    phone: '06282800932',
    name: 'Andrew 2Velkov',
  },
  {
    email: 'andrew.velkov222@gmail.com',
    phone: '06828222200932',
    name: 'And22rew Velkov',
  },
  {
    email: 'andrew.velkov@gmail.com',
    phone: '0682800932',
    name: 'Andrew Velkov',
  },
  {
    email: 'andrew.velkov@222gmail.com',
    phone: '062282800932',
    name: 'And22rew Velkov',
  },
];

const GamesListForDomainComponent = ({
  gameList,
  handleRemoveGame,
  handleChooseGame,
  id,
  handleCheckedStatus,
  handlePreviewWidget,
  handleGetStatisticsByGameId,
  gameStatistics,
  csvLinkref,
}) => {
  const { data, loaded, loading } = gameStatistics;

  const datas = loaded && data.data.data;
  const ddd = [];
  const o = {
    email: loaded && datas[0].email,
    name: 'andrw',
    phone: '233232',
  };

  return (
    <div>
      <h3>Website Games</h3>
      {gameList.map(gameItem => (
        <div key={gameItem._id} className={css.games__listDomain}>
          <div className={css.games__listDomain_left}>
            <div className={css.games__listDomain_img}>
              <img src={UserIcon} alt="game preview" />
            </div>
            <div className={css.games__listDomain_info}>
              <div>
                <CustomSwitch
                  checked={gameItem.status}
                  onChange={e => handleCheckedStatus(e, gameItem.status)}
                  value={gameItem._id}
                />
                <h4>{gameItem.game}</h4>
              </div>
              <ul>
                <li>
                  {gameItem.statistics.impr}
                  <span>impr</span>
                </li>
                <li>
                  {gameItem.statistics.hits}
                  <span>hits</span>
                </li>
                <li>
                  {gameItem.statistics.ctr.toFixed(2)}
                  <span>ctr %</span>
                </li>
                <li>
                  <span>1 days</span>
                </li>
              </ul>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button variant="contained" color="primary" className={css.button__top}>
                  <ResetIcon />
                  Reset Cookies
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  className={css.button__top}
                  onClick={handleGetStatisticsByGameId(gameItem._id)}
                >
                  <DownloadIcon />
                  Download Stats
                </Button>

                <CSVLink
                  data={(loaded && data.data.data) || []}
                  headers={csvHeaders}
                  ref={csvLinkref}
                  // asyncOnClick
                  // onClick={handleGetStatisticsByGameId(gameItem._id)}
                  filename={`Playthem_stats_${gameItem.game}_${gameItem._id}.xlsx`}
                ></CSVLink>

                {/* <CSVDownload filename={`Playthem_stats_${gameItem.game}_${gameItem._id}.xlsx`} data={ddd} target="_blank" /> */}
              </div>
            </div>
          </div>
          <div className={css.games__listDomain_right} key={gameItem._id}>
            <Button
              variant="contained"
              color="primary"
              className={cx(css.button__top, css.button__top_lightBlue)}
              onClick={handlePreviewWidget}
            >
              <EyeIcon />
              Preview
            </Button>

            {/* <Link
              to={`/domain/${id}/game/${gameItem._id}`}
              className={cx(css.button__top, css.button__top_lightBlue, css.button__top_icon)}
            >
              <EditIcon />
            </Link> */}
            <Button
              variant="contained"
              color="primary"
              className={cx(css.button__top, css.button__top_lightBlue, css.button__top_icon)}
              onClick={handleChooseGame(gameItem)}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={cx(css.button__top, css.button__top_lightBlue, css.button__top_icon)}
              onClick={handleRemoveGame(gameItem._id)}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GamesListForDomainComponent;
