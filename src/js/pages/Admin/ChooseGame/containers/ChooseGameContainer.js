import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';

import ChooseGameItemComponent from 'pages/Admin/ChooseGame/components/ChooseGameItemComponent';
import { GAMES } from 'config';

class ChooseGameContainer extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <section>
        <h3>Select Game type</h3>
        <h4>Creating the game</h4>
        <Grid container spacing={3}>
          {GAMES.map(game => (
            <ChooseGameItemComponent key={game.name} data={game} />
          ))}
        </Grid>
      </section>
    );
  }
}

export default connect()(ChooseGameContainer);
