import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { AuthContext } from "../providers/authProvider";
import Navigation from "./Navigation";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";
import CreateEditRota from "../pages/CreateEditRota";
import ViewRota from "../pages/ViewRota";
import Staff from "../pages/Staff";
import Settings from "../pages/Settings";
import PasswordReset from "../pages/PasswordReset";
import Loading from "./Generic/Loading";

function App() {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) return <Splash />; //Prevents flash of content;

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={user ? Dashboard : SignIn} />
        <PrivateRoute path="/view/:id" component={ViewRota} />
        <PrivateRoute admin path="/rota" component={CreateEditRota} />
        <PrivateRoute admin exact path="/rota/:id" component={CreateEditRota} />
        <PrivateRoute admin path="/staff" component={Staff} />
        <PrivateRoute admin exact path="/staff/:uid" component={Staff} />
        <PrivateRoute path="/settings" component={Settings} />
        <Route path="/reset" component={PasswordReset} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  if (rest.admin) {
    return (
      <Route
        {...rest}
        render={props =>
          user && user.admin ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/" }} />
          )
        }
      />
    );
  }

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to={{ pathname: "/" }} />
      }
    />
  );
}

function NoMatch() {
  return <Redirect to={{ pathname: "/" }} />;
}

function Splash() {
  const styles = {
    aligner: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    alignerItem: {
      maxWidth: "50%"
    }
  };
  const Aligner = ({ children }) => (
    <div style={styles.aligner}>{children}</div>
  );
  const AlignerItem = ({ children }) => (
    <div style={styles.alignerItem}>{children}</div>
  );
  return (
    <Aligner>
      <AlignerItem>
        <h4 className="text-primary">RotaApp</h4>
        <Loading />
      </AlignerItem>
    </Aligner>
  );
}

export default App;
