import React, { Component } from 'react';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Select, MenuItem, TextField, Popover, Button } from '@material-ui/core';

import { PARAMS } from 'config';
import css from 'styles/components/TextEdit.scss';

export default class TextEditComponent extends Component {
  render() {
    const { onChangeValue, settings } = this.props;
    // console.log(settings.);

    return (
      <div>
        <PopupState variant="popover" popupId="demo-popup-popover">
          {popupState => (
            <div>
              <Button variant="contained" {...bindTrigger(popupState)}>
                Change text attributes
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <div className={css.form}>
                  <span>
                    font-family:
                    <Select name="family" onChange={onChangeValue} value={settings.family}>
                      {PARAMS.family.map(family => (
                        <MenuItem key={family} value={family}>
                          {family}
                        </MenuItem>
                      ))}
                    </Select>
                  </span>
                  <span>
                    size:
                    <Select name="size" onChange={onChangeValue} value={settings.size}>
                      {PARAMS.size.map(size => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  </span>
                  <span>
                    align:
                    <Select name="align" onChange={this.handleChange} value={settings.align}>
                      {PARAMS.align.map(align => (
                        <MenuItem key={align} value={align}>
                          {align}
                        </MenuItem>
                      ))}
                    </Select>
                  </span>
                  <span>
                    weight:
                    <Select name="weight" onChange={onChangeValue} value={settings.weight}>
                      {PARAMS.weight.map(weight => (
                        <MenuItem key={weight} value={weight}>
                          {weight}
                        </MenuItem>
                      ))}
                    </Select>
                  </span>
                  <span>
                    style:
                    <Select name="font_style" onChange={onChangeValue} value={settings.font_style}>
                      {PARAMS.font_style.map(style => (
                        <MenuItem key={style} value={style}>
                          {style}
                        </MenuItem>
                      ))}
                    </Select>
                  </span>
                  <span>
                    <TextField
                      onChange={onChangeValue}
                      name="text"
                      id="outlined-basic"
                      label="Outlined"
                      margin="normal"
                      variant="outlined"
                      // value={settings..text}
                      defaultValue={settings.text}
                    />
                  </span>
                </div>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    );
  }
}
