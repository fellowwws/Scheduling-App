import React, { useState, useContext, Fragment } from 'react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import { withRouter } from 'react-router'
import { functions } from '../firebase'
import { AuthContext } from '../providers/authProvider'
import { StaffContext } from '../providers/staffProvider'

const deleteUser = functions.httpsCallable('deleteUserRecord')

function _Dropdown({ employee, history }) {
  const { user } = useContext(AuthContext)
  const { setStaffLoading } = useContext(StaffContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen(!dropdownOpen)

  const handleEdit = () => {
    history.push(`/staff/${employee.uid}`)
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure?')) {
      deleteUser(employee)
        .then(() => console.log('User deleted'))
        .catch(error => console.log(error))
      setStaffLoading(true)
      history.push('/staff')
    }
  }

  return (
    <Dropdown className="float-right" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Actions</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={handleEdit}>Edit ✏️</DropdownItem>
        {user.uid !== employee.uid && ( //User shouldn't be able to delete themselves;
          <Fragment>
            <DropdownItem divider />
            <DropdownItem onClick={handleDelete}>Delete 🗑</DropdownItem>
          </Fragment>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}

export default withRouter(_Dropdown)
