import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import SignInForm from '../components/SignInForm'

function SignIn() {
  return (
    <Container>
      <Row>
        <Col md="3"></Col>
        <Col md="6">
          <h2 className="py-2 text-center">Sign In</h2>
          <SignInForm />

          <p className="text-center text-primary py-4">
            <small>
              <Link to="/reset">I forgot my password</Link>
            </small>
          </p>
        </Col>
        <Col md="3"></Col>
      </Row>
    </Container>
  )
}

export default SignIn
