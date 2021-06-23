import React from 'react';

import css from '../../../../styles/pages/Home.scss';

const TotalStatisticsComponent = ({ impr, hits, ctr }) => {
  return (
    <div className={css.totalStatistics}>
      <div className={css.totalStatistics__block}>
        <h3>{impr}</h3>
        <p>Total Impressions</p>
      </div>
      <div className={css.totalStatistics__block}>
        <h3>{hits}</h3>
        <p>Total captured emails</p>
      </div>
      <div className={css.totalStatistics__block}>
        <h3>{ctr}</h3>
        <p>Total ctr %</p>
      </div>
    </div>
  );
};

export default TotalStatisticsComponent;
