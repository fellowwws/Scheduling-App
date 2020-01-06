import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react'
import { firestore } from '../firebase'
import { AuthContext } from './authProvider'

export const StaffContext = createContext()

function StaffProvider(props) {
  const { user } = useContext(AuthContext)
  const componentDidMount = useRef(false)
  const [staff, setStaff] = useState(null)
  const [staffLoading, setStaffLoading] = useState(true)

  useEffect(() => {
    if (componentDidMount.current) {
      return firestore
        .collection('users')
        .orderBy('name', 'desc')
        .onSnapshot(snapshot => {
          const staff = snapshot.docs.map(doc => doc.data())
          setStaff(staff)
          setStaffLoading(false)
        })
    }
    componentDidMount.current = true
  }, [user])

  const values = {
    staff,
    staffLoading,
    setStaffLoading,
  }

  return (
    <StaffContext.Provider value={values}>
      {props.children}
    </StaffContext.Provider>
  )
}

export default StaffProvider
