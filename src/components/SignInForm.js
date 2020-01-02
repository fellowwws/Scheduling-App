import React, { 
  useState,
  useEffect,
  useContext
} from 'react';
import { Button, 
  Form, FormGroup, FormFeedback,
  Label, 
  Input, 
  Alert,
  Spinner
} from 'reactstrap';
import { AuthContext } from '../providers/authProvider';
import { incorrectUsernameOrPassword } from '../errors';

function SignIn() {
  const { auth } = useContext(AuthContext);

  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({
    email: false,
    password: false
  })
  const [showErrors, setShowErrors] = useState(false); 
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setErrors(errors => ({...errors, 
      email: values.email.length > 0 ? false : true
    }));
    setErrors(errors => ({...errors, 
      password: values.password.length > 0 ? false : true
    }));
  }, [values]);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues(values => ({...values, [name]: value.trim()}));
  }

  const isValid = () => {
    return !errors.email && !errors.password
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showErrors) setShowErrors(true)

    if (isValid()) {
      setSubmitting(true);

      auth.signInWithEmailAndPassword(values.email, values.password)
        .catch(error => {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              setErrors(errors => ({...errors, auth: {
                ...incorrectUsernameOrPassword
              }}));
              break;
            default:
              setErrors(errors => ({...errors, auth: {
                code: 'Error',
                message: 'Something went wrong. Please try again'
              }}));
          }
          setSubmitting(false);
        });
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      {errors.auth && 
        <Alert color="danger" isOpen={errors.auth}>
          {<b>{errors.auth.code}</b>}{" "}{errors.auth.message}
        </Alert>
      }
      <FormGroup>
        <Label className="sr-only" for="email">Email</Label>
        <Input
          onChange={handleChange} 
          value={values.email}
          invalid={showErrors && errors.email}
          type="email" name="email" 
          placeholder="Email" 
          size="lg"
        />
        <FormFeedback>You must provide an email address</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label className="sr-only" for="password">Password</Label>
        <Input
          onChange={handleChange}
          value={values.password}
          invalid={showErrors && errors.password}
          type="password" name="password" 
          placeholder="Password" 
          size="lg"
        />
        <FormFeedback>You must provide a password</FormFeedback>
      </FormGroup>
      
      <Button
        disabled={submitting}
        color="primary" 
        size="lg" block>
        {submitting ? <Spinner color="light" /> : 'Sign In'}
      </Button>
    </Form>
  );
}

export default SignIn;