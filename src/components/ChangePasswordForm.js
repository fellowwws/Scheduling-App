import React, {
  useState,
  useEffect,
  useReducer,
  Fragment
} from 'react';
import {auth, functions} from '../firebase';
import { 
  Button,
  Alert, 
  Form, FormGroup, FormFeedback, Label, Input,
  Spinner
} from 'reactstrap';

const sendPasswordChangedEmail = functions.httpsCallable('sendPasswordChangedEmail');

const initState = {
  password: '',
  confirmPassword: ''
};
const initErrorState = {
  password: true,
  confirmPassword: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'PASSWORD':
      return {...state, password: action.payload};
    case 'CONFIRM_PASSWORD':
      return {...state, confirmPassword: action.payload};
    case 'RESET':
      return {...initState}
    default:
      return state;
  }
}

function ChangePasswordForm() {
  const [user] = useState(auth.currentUser);
  const [state, dispatch] = useReducer(reducer, initState);
  const [errors, setErrors] = useState({...initErrorState});
  const [showErrors, setShowErrors] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => setErrors({...errors,
    password: !!(state.password.length < 6),
    confirmPassword: !!(state.password !== state.confirmPassword)
  }), [state.password, state.confirmPassword]);

  const isValid = () => !errors.password && !errors.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);
    
    if (!isValid()) return;
    setSubmitting(true);

    user.updatePassword(state.password)
      .then(() => {
        sendPasswordChangedEmail({displayName: user.displayName, email: user.email})
          .then(() => auth.signOut());
      }).catch(error => {
        setSubmitting(false);
        setErrors({...initErrorState, auth: {...error}});
        console.log('Error updating password', error);
      });
    
    setShowErrors(false);
    dispatch({type: 'RESET'});
  }
  return (
    <Fragment>
    {errors.auth && <Alert color="danger">
      <b>Error</b> {errors.auth.message}
    </Alert>}

    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label 
          className="sr-only" 
          for="new-password">
          New Password
        </Label>
        <Input 
          type="password" id="new-password"
          placeholder="New Password" size="lg"
          value={state.password}
          invalid={showErrors && errors.password}
          onChange={(e) => dispatch({
            type: 'PASSWORD', 
            payload: e.target.value.trim()
          })}
        />
        <FormFeedback>Password must be at least 6 characters</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label 
          className="sr-only" 
          for="confirm-password">
          Confirm Password
        </Label>
        <Input 
          type="password" id="confirm-password" 
          placeholder="Confirm Password" size="lg"
          value={state.confirmPassword}
          invalid={showErrors && errors.confirmPassword}
          onChange={(e) => dispatch({
            type: 'CONFIRM_PASSWORD',
            payload: e.target.value.trim()
          })}
        />
        <FormFeedback>Password and confirm password do not match</FormFeedback>
      </FormGroup>
      
      <FormGroup>
        <Button 
          color="primary" size="lg"
          disabled={submitting}
          block>
          {submitting ? <Spinner color="light" /> : 'Submit' }
        </Button>
      </FormGroup>
    </Form>
    </Fragment>
  );
}

export default ChangePasswordForm;