import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import ChangePasswordForm from '../components/ChangePasswordForm'

const styles = {
  ul: {
    padding: '0',
  },
  li: {
    listStyle: 'none',
    fontSize: '1rem',
    color: '#007bff',
    cursor: 'pointer',
    borderRight: '2px solid #007bff',
  },
}

function Settings() {
  return (
    <Container>
      <h2 className="py-2">Settings</h2>
      <Row>
        <Col md="3" className="mb-2">
          <ul style={styles.ul}>
            <li style={styles.li}>Password</li>
          </ul>
        </Col>

        <Col md="9">
          <h3 className="pb-2">Change Password</h3>
          <ChangePasswordForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Settings
