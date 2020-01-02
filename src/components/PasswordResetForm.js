import React, {
  useState,
  useEffect,
  useContext
} from 'react';
import {
  Alert, 
  Button, 
  Form, FormGroup, FormFeedback,
  Label, Input,
  Spinner
} from 'reactstrap';
import { withRouter } from "react-router";
import { AuthContext } from '../providers/authProvider';
import { userNotFound } from '../errors';

function PasswordResetForm({ history }) {
  const { auth } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setEmailError(email.length > 0 ? false : true);
  }, [email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authError) setAuthError(null);
    if (!showEmailError) setShowEmailError(true);

    if (!emailError) {
      setIsSubmitting(true);

      auth.sendPasswordResetEmail(email)
        .then(() => history.push('/'))
        .catch(error => {
          let authError = {};
          switch (error.code) {
            case 'auth/user-not-found':
              authError = userNotFound;
              break;
            default:
              authError.code = 'Error';
              authError.message = 'Something went wrong. Please try again';
          }
          setAuthError(authError);
          setIsSubmitting(false);
      });
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Alert color="danger" isOpen={authError}>
        {authError && <b>{authError.code}</b>}
        {' '}
        {authError && authError.message}
      </Alert>
      <FormGroup>
        <Label className="sr-only" for="email">Email</Label>
        <Input
          onChange={(e) => setEmail(e.target.value.trim())}
          invalid={showEmailError && emailError} 
          type="email" name="email" 
          placeholder="Email" size="lg"
        />
        <FormFeedback>You must provide an email address</FormFeedback>
      </FormGroup>

      <Button
        disabled={isSubmitting}
        color="primary" 
        block size="lg">
        {isSubmitting ? <Spinner color="light" /> : 'Send'}
      </Button>
    </Form>
  );
}

export default withRouter(PasswordResetForm);