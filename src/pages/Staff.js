import React, { useContext } from 'react'
import { matchPath } from 'react-router'
import { StaffContext } from '../providers/staffProvider'
import { Container } from 'reactstrap'
import EmployeeForm from '../components/EmployeeForm'
import EmployeesTable from '../components/EmployeesTable'

function Staff({ location }) {
  const { staff } = useContext(StaffContext)

  if (!staff) return null

  const match = matchPath(location.pathname, {
    path: '/staff/:uid',
    exact: true,
    strict: false,
  })

  let employee
  if (match) employee = staff.find(e => e.uid === match.params.uid)

  return (
    <Container>
      <h2 className="my-2">Manage Staff</h2>
      <EmployeeForm employee={match ? employee : null} />
      <EmployeesTable />
    </Container>
  )
}

export default Staff
