import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './providers/authProvider';
import StaffProvider from './providers/staffProvider';
import PublishedProvider from './providers/rota/publishedProvider';
import UnpublishedProvider from './providers/rota/unpublishedProvider';
// import RotaProvider from './providers/rotaProvider';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Global.css';

ReactDOM.render(
  <AuthProvider>
    <StaffProvider>
      {/* <RotaProvider> */}
      <PublishedProvider>
        <UnpublishedProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </UnpublishedProvider>
      </PublishedProvider>
      {/* </RotaProvider> */}
    </StaffProvider>
  </AuthProvider>,
  document.getElementById('root')
);
