/* eslint-disable camelcase */
import React, { Component } from 'react';
import cx from 'classnames';

import { Grid, Popover, FormControl, OutlinedInput, Button } from '@material-ui/core';

import { PARAMS } from 'config';
// import InfoTextHeaderTabInnerComponent from 'pages/Admin/GameConstructor/components/InfoTextHeaderTabInnerComponent';

import css from 'styles/pages/GameConstructor/EditWidget.scss';

class EditWidgetContainer extends Component {
  constructor(props) {
    super(props);
    const { editWidgetData } = props;

    this.state = {
      anchorEl: null,
      open: false,
      editWidgetDefault: editWidgetData,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { editWidgetData } = nextProps;
    this.setState({
      editWidgetDefault: editWidgetData,
    });
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
      open: false,
    });
  };

  handleClickOpen = e => {
    this.setState({
      anchorEl: e.currentTarget,
      open: true,
    });
  };

  handleIconAndText = e => {
    const { editWidgetData } = this.props;
    const { name, value } = e.currentTarget;
    const { editWidgetDefault } = this.state;

    const editWidgetDataUpdated = { ...editWidgetDefault };
    editWidgetDataUpdated[name] = value;
    this.setState(
      {
        editWidgetDefault: editWidgetDataUpdated,
      },
      () => {
        Object.assign(editWidgetData, editWidgetDefault);
      },
    );
  };

  render() {
    const { anchorEl, open, editWidgetDefault } = this.state;
    const id = open ? 'widget-popover' : undefined;
    const iconWidget = PARAMS.widget_icons.filter(
      item => item.name === editWidgetDefault.icon_name,
    );
    const IconSvg = iconWidget[0].component;

    return (
      <Grid container spacing={3}>
        <Grid item className={css.tab__content}>
          <div className={css.tab__content_header}>
            <h4 className={css.heading_info}>Click any element to edit it</h4>
          </div>

          <div className={css.tab__content_widget}>
            <button
              type="button"
              aria-label={id}
              className={css.widget}
              onClick={this.handleClickOpen}
            >
              <h3>{editWidgetDefault.title}</h3>
              <div className={css.widget__icon}>
                <IconSvg />
              </div>
            </button>

            <Popover
              className={css.test}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <form className={css.widget__form}>
                <FormControl fullWidth>
                  <h4>Trigger text</h4>
                  <OutlinedInput
                    className={css.widget__form_input}
                    name="title"
                    onChange={this.handleIconAndText}
                    value={editWidgetDefault.title}
                  />
                </FormControl>
                <div className={css.widget__form_images}>
                  <h4>Icons</h4>
                  <ul>
                    {PARAMS.widget_icons.map(icon => (
                      <li key={icon.name}>
                        <button
                          type="button"
                          onClick={this.handleIconAndText}
                          name="icon_name"
                          value={icon.name}
                        >
                          <icon.component />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <FormControl fullWidth>
                  <h4>Background</h4>
                  <Button
                    variant="contained"
                    color="primary"
                    className={cx(css.button__dark_blue, css.button)}
                  >
                    Upload Image
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={cx(css.button__dark_blue, css.button)}
                  >
                    Choose Color
                  </Button>
                </FormControl>
                <FormControl fullWidth>
                  <h4>Custom icon</h4>
                  <Button
                    variant="contained"
                    color="primary"
                    className={cx(css.button__dark_blue, css.button)}
                  >
                    Upgrade now
                  </Button>
                </FormControl>
              </form>
            </Popover>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default EditWidgetContainer;
