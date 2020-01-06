import React from 'react'
import { Input } from 'reactstrap'

const styles = {
  td: {
    padding: '2px',
  },
  input: {
    textAlign: 'center',
    minWidth: '75px',
    height: '75px',
    padding: '2px',
    border: 'none',
    borderRadius: '0',
    transform: 'translate3d(0, 0, 0)', //https://stackoverflow.com/questions/36697835/ios-safari-input-text-disappearing
  },
  employeeName: {
    verticalAlign: 'middle',
  },
}

function Schedule({ employee, handleChange }) {
  const [MON, TUE, WED, THU, FRI, SAT, SUN] = employee.schedule

  return (
    <tr>
      <td className="bg-light" style={styles.employeeName}>
        {employee.name.first} {employee.name.last.toUpperCase()}
      </td>
      <td style={styles.td}>
        {/* MONDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="0"
          value={MON}
          onChange={handleChange}
        />
      </td>
      <td style={styles.td}>
        {/* TUESDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="1"
          value={TUE}
          onChange={handleChange}
        />
      </td>
      <td style={styles.td}>
        {/* WEDNESDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="2"
          value={WED}
          onChange={handleChange}
        />
      </td>
      <td style={styles.td}>
        {/* THURSDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="3"
          value={THU}
          onChange={handleChange}
        />
      </td>
      <td style={styles.td}>
        {/* FRIDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="4"
          value={FRI}
          onChange={handleChange}
        />
      </td>
      <td style={styles.td}>
        {/* SATURDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="5"
          value={SAT}
          onChange={handleChange}
        />
      </td>
      <td style={styles.td}>
        {/* SUNDAY */}
        <Input
          style={styles.input}
          type="text"
          id={employee.uid}
          data-index="6"
          value={SUN}
          onChange={handleChange}
        />
      </td>
    </tr>
  )
}

export default Schedule
