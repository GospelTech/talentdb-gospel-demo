/**
 *
 * RenderInteger
 *
 */

import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import * as PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';

const RenderInteger = ({ input, label, meta: { touched, error } }) => (
  <FormControl error={touched && error} style={{ width: '100%' }}>
    <InputLabel htmlFor="component-error" />
    <TextField
      placeholder={label}
      value={input.value ? parseInt(input.value, 10) : 0}
      onChange={event => input.onChange(parseInt(event.target.value, 10))}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
      key={label}
    />

    {touched && error && (
      <FormHelperText id="{input.value}-error">{error}</FormHelperText>
    )}
  </FormControl>
);

RenderInteger.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

export default RenderInteger;
