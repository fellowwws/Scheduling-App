import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import PasswordResetForm from '../components/PasswordResetForm';

function PasswordReset() {
  return (
    <Container>
      <Row>
          <Col md="3"></Col>
          <Col md="6">
            <h2 className="py-2 text-center">Reset Password</h2>
            <PasswordResetForm />
            <p className="text-center text-muted py-4">
              <small>Not recieved an email? Check your spam folder</small>
            </p>
          </Col>
          <Col md="3"></Col>
        </Row>
    </Container>
  );
}

export default PasswordReset;
