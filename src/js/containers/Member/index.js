import React from 'react';

// import Navigation from 'containers/Navigation';
import Header from '../Header';
import Footer from '../Footer';

import css from '../../../styles/containers/Member.scss';

const Member = ({ children, ...props }) => (
  <section className={css.member}>
    <article className={css.member__flex}>
      {/* <Navigation {...props} /> */}
      <section className={css.member__wrap}>
        <div className={css.member__container}>
          <Header {...props} />
          <section className={css.member__content}>{children}</section>
          <Footer />
        </div>
      </section>
    </article>
  </section>
);

export default Member;
