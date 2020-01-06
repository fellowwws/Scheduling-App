import React, { Fragment, useState, useEffect } from 'react'
import { Button, Table, Input, CustomInput, Row, Col } from 'reactstrap'
import { firestore } from '../../../firebase'
import { withRouter } from 'react-router-dom'
import { DatePicker } from '@material-ui/pickers'
import { createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'
import Schedule from './Schedule'
import Events from './Events'

const materialTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
})

function Rota({ rota, editing, history }) {
  const [state, setState] = useState(rota)

  useEffect(() => {
    setState(rota)
  }, [rota])

  const handleDateChange = date => {
    setState({ ...state, date })
  }
  const handleNotesChange = e => {
    setState({ ...state, notes: e.target.value })
  }

  const handleEventChange = e => {
    const index = e.target.getAttribute('data-index')
    const value = e.target.value
    const events = [...state.events]
    events[index] = value
    setState({
      ...state,
      events,
    })
  }

  const handleScheduleChange = e => {
    const { id, value } = e.target //<Input id={"c523ded2-4f1f-47..."} />
    const index = e.target.getAttribute('data-index') //<Input data-index="0" />
    const body = { ...state.body }
    body[id].schedule[index] = value
    setState({
      ...state,
      body,
    })
  }

  const handlePublishOrSaveDraft = () => {
    if (state.published && !window.confirm('Are you sure?')) return

    if (editing) {
      firestore
        .collection(state.published ? 'published' : 'unpublished')
        .doc(rota.id)
        .set({ ...state }) // Overwrite existing
        .then(() => history.push('/')) // Redirect
        .catch(error => console.log('Error updating rota:', error))
    } else {
      firestore
        .collection(state.published ? 'published' : 'unpublished')
        .add({ ...state }) // Create new
        .then(() => history.push('/')) // Redirect
        .catch(error => console.log('Error creating rota', error))
    }
  }

  return (
    <Fragment>
      <Head>
        <ThemeProvider theme={materialTheme}>
          <DatePicker
            format="dd MMMM yyyy"
            inputVariant="outlined"
            value={state.date}
            onChange={handleDateChange}
          />
        </ThemeProvider>
        <Notes notes={state.notes} handleChange={handleNotesChange} />
      </Head>

      <Table bordered responsive>
        <thead>
          <DaysOfTheWeek state={state} setState={setState} />
          <Events events={state.events} handleChange={handleEventChange} />
        </thead>
        <tbody>
          {Object.keys(state.body).map(key => (
            <Schedule
              key={state.body[key].uid} // "c523ded2-4f1f-47..."
              employee={state.body[key]}
              handleChange={handleScheduleChange}
            />
          ))}
        </tbody>
      </Table>

      <Footer>
        <Button
          size="lg"
          block
          color={state.published ? 'primary' : 'secondary'}
          onClick={handlePublishOrSaveDraft}
        >
          {state.published ? 'Publish' : 'Save Draft'}
        </Button>
      </Footer>
    </Fragment>
  )
}

const DaysOfTheWeek = ({ state, setState }) => {
  const style = 'bg-dark text-white text-center'
  return (
    <tr>
      <th className="border-0">
        <CustomInput
          id="customSwitch"
          type="switch"
          label="Publish"
          onChange={e => setState({ ...state, published: !state.published })}
          checked={state.published}
        />
      </th>
      <th className={style}>MON</th>
      <th className={style}>TUE</th>
      <th className={style}>WED</th>
      <th className={style}>THU</th>
      <th className={style}>FRI</th>
      <th className={style}>SAT</th>
      <th className={style}>SUN</th>
    </tr>
  )
}

function Head({ children }) {
  const [DatePicker, Notes] = children
  return (
    <Row className="pb-2">
      <Col className="pb-2" md="4">
        {DatePicker}
      </Col>
      <Col className="pb-1" md="8">
        {Notes}
      </Col>
    </Row>
  )
}

const Notes = ({ notes, handleChange }) => (
  <Input
    bsSize="lg"
    type="text"
    name="notes"
    value={notes}
    placeholder="Notes"
    onChange={handleChange}
  />
)

function Footer({ children: PublishOrSaveDraftButton }) {
  return (
    <Row className="mb-2">
      <Col className="py-1">{PublishOrSaveDraftButton}</Col>
    </Row>
  )
}

export default withRouter(Rota)
