import React from 'react';

import css from 'styles/pages/Home.scss';

const TotalStatisticsComponent = () => {
  return (
    <div className={css.totalStatistics}>
      <div className={css.totalStatistics__block}>
        <h3>345</h3>
        <p>Total Impressions</p>
      </div>
      <div className={css.totalStatistics__block}>
        <h3>156</h3>
        <p>Total captured emails</p>
      </div>
      <div className={css.totalStatistics__block}>
        <h3>774</h3>
        <p>Total ctr</p>
      </div>
    </div>
  );
};

export default TotalStatisticsComponent;
