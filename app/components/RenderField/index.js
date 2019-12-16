/**
 *
 * RenderField
 *
 */

import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import * as PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import Input from '@material-ui/core/Input/Input';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import RenderDate from '../RenderDate';
import RenderInteger from '../RenderInteger';

const required = value => (value ? undefined : 'Required');

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <FormControl error={!!(touched && error)} style={{ width: '100%' }}>
    <InputLabel htmlFor="component-error">{label}</InputLabel>
    <Input
      id={label}
      value={input.value || ''}
      name={input.value}
      key={label}
      {...input}
      {...custom}
      aria-describedby="{input.value}-error"
      readOnly={label === 'Email address'}
    />
    {touched && error && (
      <FormHelperText id="{input.value}-error">{error}</FormHelperText>
    )}
  </FormControl>
);

renderTextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
};

const renderMultipleSelect = ({ fields }) => ({
  input,
  label,
  data,
  ...custom
}) => [
  <InputLabel htmlFor="select-multiple-checkbox">{label}</InputLabel>,
  <Select
    multiple
    value={input.value || []}
    onChange={event => input.onChange(event.target.value)}
    input={<Input id="select-multiple-checkbox" />}
    renderValue={selected => selected.join(', ')}
    {...custom}
  >
    {fields.map(name => (
      <MenuItem key={label} value={name}>
        <Checkbox checked={fields.indexOf(name) > -1} />
        <ListItemText primary={name} />
      </MenuItem>
    ))}
  </Select>,
];

renderMultipleSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

const renderSingleSelect = ({ fields }) => ({ input, label, ...custom }) => [
  <Fragment>
    <InputLabel
      htmlFor="select-multiple-checkbox"
      style={{
        fontSize: '11px',
        paddingTop: '15.5px',
      }}
    >
      {label}
    </InputLabel>
    <Select
      value={input.value || []}
      onChange={event => input.onChange(event.target.value)}
      input={<Input id="select-multiple-checkbox" />}
      {...custom}
      style={{ width: '100%', height: '35px' }}
      key={label}
    >
      {fields.map(name => (
        <MenuItem key={label} value={name}>
          <ListItemText primary={name} key={label - name} />
        </MenuItem>
      ))}
    </Select>
  </Fragment>,
];

renderSingleSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
};

const pickComponent = (type, data) =>
  ({
    string: renderTextField,
    integer: RenderInteger,
    dateTime: RenderDate,
    selectMultiple: renderMultipleSelect({ fields: data }),
    selectOne: renderSingleSelect({ fields: data }),
  }[type] || renderTextField);

const RenderField = field => (
  <Field
    name={field.name}
    component={pickComponent(field.type, field.values)}
    label={field.meta.displayName || field.name}
    validate={field.mandatory ? [required] : []}
    required={field.mandatory}
  />
);

export default RenderField;
