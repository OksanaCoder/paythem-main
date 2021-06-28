import React from 'react';
import cx from 'classnames';
import { List, ListItem } from '@material-ui/core';


import UserIcon from '../../../../assets/images/icons/user.svg';

import css from '../../../../styles/containers/Header.scss';

const DomainsListComponent = ({ handleDomainSelect, domains, toggleDrawer, activeDomain }) => {
  console.log(domains);
  return (
    <section className='domains__list'>
      <button
        type="button"
        className='domains__list_close'
        onClick={toggleDrawer('left', false)}
      >
        Close
      </button>
      <h2>My Websites</h2>
      <List className='domains__list'>
        {domains &&
          domains.map(item => {
            return (
              <ListItem
                className={
                  activeDomain === item._id
                    ? cx(css.domains__list_itemActive, css.domains__list_item)
                    : css.domains__list_item
                }
                key={item._id}
                href="#"
                onClick={handleDomainSelect(item)}
              >
                <div className='domains__list_img'>
                  <img src={UserIcon} alt="UserIcon" />
                </div>

                <div>
                  <h3>Site title</h3>
                  <p>
                    <a href={`//${item.domain}`} target="_blank" rel="noopener noreferrer">
                      {item.domain}
                    </a>
                  </p>
                </div>
              </ListItem>
            );
          })}
      </List>
    </section>
  );
};

export default DomainsListComponent;
