import React, { Fragment, useContext } from 'react'
import { Table } from 'reactstrap'
import { AuthContext } from '../providers/authProvider'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import Dropdown from './RotaTableDropdown'
import Text from '../components/Generic/Text'

const styles = {
  table: {
    tr: {
      fontSize: '1.25rem',
    },
    td: {
      verticalAlign: 'middle',
    },
  },
}

function RotaTable({ rotas }) {
  const { user } = useContext(AuthContext)

  return (
    <Fragment>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Notes</th>
            {user.admin && <th></th>}
          </tr>
        </thead>
        <tbody>
          {rotas && rotas.map(rota => <Row key={rota.id} rota={rota} />)}
        </tbody>
      </Table>
      {rotas.length < 1 && (
        <Text small center>
          No rotas
        </Text>
      )}
    </Fragment>
  )
}

const Row = ({ rota }) => {
  const { user } = useContext(AuthContext)

  const date = format(rota.date, 'd MMM yyyy') //01 Jan 1970

  return (
    <tr style={styles.table.tr}>
      <td style={styles.table.td}>
        <Link to={`/view/${rota.id}`}>w/c {date}</Link>
      </td>
      <td style={styles.table.td}>{rota.notes ? rota.notes : 'None 🤷‍'}</td>
      {user.admin && (
        <td style={styles.table.td}>
          <Dropdown rota={rota} />
        </td>
      )}
    </tr>
  )
}

export default RotaTable
