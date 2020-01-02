import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useContext
} from 'react';
import { withRouter } from "react-router"
import { 
  Form,
  Button,
  Col, Row,
  Input, Label,
  FormFeedback,
  Alert,
  Spinner
} from 'reactstrap';
import { emailAlreadyExists } from '../errors';
import { StaffContext } from '../providers/staffProvider';
import { functions } from '../firebase';

const createUser = functions.httpsCallable('createUser');
const updateUser = functions.httpsCallable('updateUserRecord');

const initState = {
  name: {
    first: '',
    last: ''
  },
  email: ''
}
const initErrorState = {
  name: { first: false, last: false },
  email: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'FIRST_NAME':
      return {...state, name: {...state.name, first: action.payload}}
    case 'LAST_NAME':
      return {...state, name: {...state.name, last: action.payload}}
    case 'EMAIL':
      return {...state, email: action.payload}
    case 'RESET':
      return {...initState}
    default:
      return state;
  }
}

function EmployeeForm({employee, history}) {
  const { staffLoading, setStaffLoading } = useContext(StaffContext);
  const [state, dispatch] = useReducer(reducer, initState);
  const [errors, setErrors] = useState(initErrorState)
  const [showErrors, setShowErrors] = useState(false);
  const [showAuthErrors, setShowAuthErrors] = useState(false);

  useEffect(() => {
    if (!employee) {
      dispatch({type: 'RESET'})
    } else {
      dispatch({type: 'FIRST_NAME', payload: employee.name.first});
      dispatch({type: 'LAST_NAME', payload: employee.name.last});
      dispatch({type: 'EMAIL', payload: employee.email});
    }
  }, [employee]);

  useEffect(() => {
    setErrors(errors => ({...errors, 
      name: { ...errors.name, first: state.name.first.length > 0 ? false : true }
    }));
    setErrors(errors => ({...errors, 
      name: { ...errors.name, last: state.name.last.length > 0 ? false : true }
    }));
    setErrors(errors => ({...errors, 
      email: state.email.length > 0 ? false : true
    }));
  }, [state]);

  const isValid = () => {
    return (
      errors.name.first !== true &&
      errors.name.last !== true &&
      errors.email     !== true
    );
  }

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!showErrors) setShowErrors(true)

    if (isValid()) {
      createUser({
        name: {
          first: state.name.first,
          last: state.name.last,
        },
        email: state.email
      })
      .catch(() => {
        setShowAuthErrors(true);
        setErrors(errors => ({...errors, auth: {
          ...emailAlreadyExists
        }}));
        setStaffLoading(false);
      });
      
      setShowErrors(false);
      setShowAuthErrors(false);
      dispatch({type: 'RESET'});
      setStaffLoading(true)
    }
  }

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!showErrors) setShowErrors(true)

    if (isValid()) {
      updateUser({
        uid: employee.uid,
        name: {
          first: state.name.first,
          last: state.name.last
        }
      })
      .then(() => console.log('User updated'))
      .catch(error => console.log(error));

      setShowErrors(false);
      dispatch({type: 'RESET'});
      setStaffLoading(true)
      history.push('/staff');
    }
  }
  
  return (
    <Fragment>
    {(showAuthErrors && errors.auth) && 
      <Alert color="danger" isOpen={errors.auth}>
        {<b>{errors.auth.code}</b>}{" "}{errors.auth.message}
      </Alert>
    }
    <Form
      className="mb-3" 
      onSubmit={employee ? handleUpdateUser : handleCreateUser}>
      <Row form>

        <Col md={6} lg={3}>
          <Label for="first-name" className="sr-only">First Name</Label>
          <Input
            className="mb-2" size="lg"
            type="text" name="first-name"
            placeholder="First Name"
            value={state.name.first} 
            onChange={(e) => dispatch({type: 'FIRST_NAME', payload: e.target.value.trim()})} 
            invalid={showErrors && errors.name.first} disabled={staffLoading}
          />
          <FormFeedback className="my-2">You must provide a first name</FormFeedback>
        </Col>

        <Col md={6} lg={3}>
          <Label for="last-name" className="sr-only">Last Name</Label>
          <Input
            className="mb-2" size="lg" 
            type="text" name="last-name"
            placeholder="Last Name"
            value={state.name.last} 
            onChange={(e) => dispatch({type: 'LAST_NAME', payload: e.target.value.trim()})} 
            invalid={showErrors && errors.name.last} disabled={staffLoading}
          />
          <FormFeedback className="my-2">You must provide a last name</FormFeedback>
        </Col>
        
        <Col lg={3}>
          <Label for="email" className="sr-only">Email</Label>
          <Input
            className="mb-2" size="lg" 
            type="email" name="email"
            placeholder="Email"
            value={state.email} 
            onChange={(e) => dispatch({type: 'EMAIL', payload: e.target.value.trim()})} 
            invalid={showErrors && errors.email} disabled={employee || staffLoading}
          />
          <FormFeedback className="my-2">You must provide an email address</FormFeedback>
        </Col>

        <Col lg={3}>
          <Button
            block size="lg"
            type="submit" 
            color="primary"
            disabled={staffLoading}>
            {staffLoading ? 
              <Spinner color="light" /> :
                employee ? 'Update Employee' : 'Add Employee'}
          </Button>
        </Col>

      </Row>
    </Form>
    </Fragment>
  );
};

export default withRouter(EmployeeForm);