import React from 'react';

import Notifications from '../../components/Notifications';

const App = ({ children }) => (
  <React.Fragment>
    <Notifications />
    {children}
  </React.Fragment>
);

export default App;
