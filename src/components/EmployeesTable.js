import React, {
  useContext
} from 'react';
import { Table } from 'reactstrap';
import { StaffContext } from '../providers/staffProvider';
import { useMediaQuery } from 'react-responsive'
import Dropdown from './EmployeesTableDropdown';


function EmployeesTable() {
  const { staff } = useContext(StaffContext);
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Name</th>
          {!isMobile && <th>Email</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
      {staff && staff.map(employee => (
        <Row 
          key={employee.uid}
          employee={employee}
        />
      ))}
      </tbody>
    </Table>
  );
}

const Row = ({ employee }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  
  return (
    <tr>
      <td style={{verticalAlign: 'middle'}}>
        {employee.name.first} {employee.name.last}
      </td>
      {!isMobile && 
      <td style={{verticalAlign: 'middle'}}>{employee.email}</td>
      }
      <td style={{verticalAlign: 'middle'}}>
        <Dropdown employee={employee} />
      </td>
    </tr>
  );
};

export default EmployeesTable;