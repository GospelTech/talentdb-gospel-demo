/**
 *
 * RenderDate
 *
 */

import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import * as PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import moment from 'moment';

const RenderDate = ({ input, label, meta: { touched, error } }) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="component-error" />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={
          input.value instanceof Date ? input.value : moment.unix(input.value)
        }
        onChange={value => input.onChange(value)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
    {touched && error && (
      <FormHelperText id="{input.value}-error">{error}</FormHelperText>
    )}
  </FormControl>
);

RenderDate.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export default RenderDate;
