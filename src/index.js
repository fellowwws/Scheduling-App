import React from "react";
import ReactDOM from "react-dom";
import AuthProvider from "./providers/authProvider";
import StaffProvider from "./providers/staffProvider";
import PublishedProvider from "./providers/rota/publishedProvider";
import UnpublishedProvider from "./providers/rota/unpublishedProvider";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

ReactDOM.render(
  <AuthProvider>
    <StaffProvider>
      <PublishedProvider>
        <UnpublishedProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </UnpublishedProvider>
      </PublishedProvider>
    </StaffProvider>
  </AuthProvider>,
  document.getElementById("root")
);
