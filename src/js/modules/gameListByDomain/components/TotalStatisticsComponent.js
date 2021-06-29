import React from 'react';

import '../../../../styles/pages/Home.scss';

const TotalStatisticsComponent = ({ impr, hits, ctr }) => {
  return (
    <div className='totalStatistics'>
      <div className='totalStatistics__block'>
        <h3>{impr}</h3>
        <p>Total Impressions</p>
      </div>
      <div className='totalStatistics__block'>
        <h3>{hits}</h3>
        <p>Total captured emails</p>
      </div>
      <div className='totalStatistics__block'>
        <h3>{ctr}</h3>
        <p>Total ctr %</p>
      </div>
    </div>
  );
};

export default TotalStatisticsComponent;
