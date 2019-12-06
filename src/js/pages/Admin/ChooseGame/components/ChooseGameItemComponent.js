import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import cx from 'classnames';

import testImg from 'assets/images/test.jpg';
import css from 'styles/pages/Games.scss';

const ChooseGameItemComponent = ({ data }) => (
  <Grid item xs={12} sm={12} md={4}>
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={testImg}
          title={data.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/game/${data.name}`}>
          <Button variant="contained" color="primary" className={cx(css.button__blue, css.button)}>
            Select the game
          </Button>
        </Link>
      </CardActions>
    </Card>
  </Grid>
);

export default ChooseGameItemComponent;
