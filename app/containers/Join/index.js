/**
 *
 * Join
 *
 */
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { memo, useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { selectDefintion } from '../Form/actions';
import makeSelectJoin, {
  makeSelectDefinition,
  selectUserName,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Checkbox from '../../../node_modules/@material-ui/core/Checkbox/Checkbox';
import { upsertUserInfo } from './actions';
import Notifier from '../Notifier';
import RenderField from '../../components/RenderField';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = [
  'Personally Identifiable Information',
  'Work Experience',
  'Preferences',
];

function getStepContent(step, props) {
  switch (step) {
    case 0:
      return (
        <Pii
          definitions={props.definitions.pii.fields}
          username={props.credentials}
        />
      );
    case 1:
      return <WorkExperience talents={props.definitions.talents.fields} />;
    case 2:
      return (
        <Preferences
          talents={props.definitions.talents.fields}
          setApproval={props.setApproval}
        />
      );
    default:
      throw new Error('Unknown step');
  }
}

const validate = values => {
  const errors = {};

  if (!values['First name']) {
    errors['First name'] = 'Required';
  } else if (!values['First name'].length > 15) {
    errors['First name'] = 'Must be 15 characters or less';
  }

  if (!values.Surname) {
    errors.Surname = 'Required';
  } else if (!values.Surname.length > 15) {
    errors.Surname = 'Must be 15 characters or less';
  }

  if (!values['Email address']) {
    errors['Email address'] = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values['Email address'])
  ) {
    errors['Email address'] = 'Must be 15 characters or less';
  }

  if (!values['Phone number']) {
    errors['Phone number'] = 'Required';
  } else if (!values['Phone number'].length > 15) {
    errors['Phone number'] = 'Invalid Phone Number';
  }
  return errors;
};

function Pii(props) {
  Pii.propTypes = {
    definitions: PropTypes.array,
  };

  const { definitions } = props;

  const filter = [
    'First name',
    'Surname',
    'Phone number',
    'Email address',
    'LinkedIn',
    'Github',
  ];

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Personally Identifiable Information
      </Typography>
      <Grid container spacing={3}>
        {definitions
          .filter(x => x.name !== 'UserID')
          .filter(x => filter.includes(x.name))
          .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
          .map(field => (
            <Grid item xs={12} sm={6} key={field.name}>
              {RenderField(field)}
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
}

function WorkExperience(props) {
  WorkExperience.propTypes = {
    talents: PropTypes.array,
  };

  const { talents } = props;

  const filter = [
    'Most recent job title',
    'Most recent company worked at',
    'Relevant work experience years',
  ];

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      <Grid container spacing={3}>
        {talents
          .filter(x => filter.includes(x.name))
          .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
          .map(field => (
            <Grid item xs={12} md={6} key={field.name}>
              {RenderField(field)}
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
}

function Preferences(props) {
  Preferences.propTypes = {
    talents: PropTypes.array,
    setApproval: PropTypes.func,
  };

  const { talents, setApproval } = props;

  const filter = [
    'Desired cities',
    'Desired roles',
    'Markets of interest',
    'Desired team size',
    'Desired job type',
    'Desired start date',
  ];

  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Preferences
      </Typography>
      <Grid container spacing={3}>
        {talents
          .filter(x => filter.includes(x.name))
          .sort((a, b) => Number(a.meta.order) - Number(b.meta.order))
          .map(field => (
            <Grid item xs={12} md={6} key={field.name}>
              {RenderField(field)}
            </Grid>
          ))}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={event => setApproval(event.target.checked)}
                color="secondary"
                name="agree"
                value="yes"
              />
            }
            label="Tick here to agree to share your data with the TalentDB admin."
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle1">
        By completing the registration process you are agreeing to give the
        TalentDB administrators access to your personal data, you can delete
        this data at any time from your login.
      </Typography>
    </Fragment>
  );
}

function JoinC(props) {
  const {
    handleSubmit,
    upsertUserInfoFn,
    pristine,
    valid,
    submitting,
    selectDefinitionFn,
  } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [approval, setApproval] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useInjectReducer({ key: 'join', reducer });
  useInjectSaga({ key: 'join', saga });

  useEffect(() => {
    selectDefinitionFn('viewersDefinition');
  });

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(upsertUserInfoFn)}>
        <Helmet>
          <title>Join</title>
          <meta name="description" content="Description of Join" />
        </Helmet>
        <Fragment>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            className={classes.appBar}
          />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Add My Details
              </Typography>
              <Stepper activeStep={activeStep} className={classes.stepper}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Fragment>
                <Fragment>
                  {getStepContent(activeStep, { ...props, setApproval })}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep === steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                        disabled={!approval || !valid || pristine || submitting}
                      >
                        Register
                      </Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                      <Fragment>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          className={classes.button}
                          disabled={!valid || pristine || submitting}
                        >
                          {'Next'}
                        </Button>
                      </Fragment>
                    )}
                  </div>
                </Fragment>
              </Fragment>
            </Paper>
          </main>
        </Fragment>
      </form>
    </div>
  );
}

JoinC.propTypes = {
  handleSubmit: PropTypes.func,
  upsertUserInfoFn: PropTypes.func,
  pristine: PropTypes.bool,
  valid: PropTypes.bool,
  submitting: PropTypes.bool,
  selectDefinitionFn: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  join: makeSelectJoin(),
  definitions: makeSelectDefinition(),
  credentials: selectUserName,
  initialValues: state => ({ 'Email address': selectUserName(state) }),
});

function mapDispatchToProps(dispatch) {
  return {
    upsertUserInfoFn: info => dispatch(upsertUserInfo(info, false)),
    selectDefinitionFn: definition => dispatch(selectDefintion(definition)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export const Join = compose(
  withConnect,
  memo,
  reduxForm({
    form: 'syncValidation', // a unique identifier for this form
    validate, // <--- validation function given to redux-form
    // warn, // <--- warning function given to redux-form
  }),
)(JoinC);
