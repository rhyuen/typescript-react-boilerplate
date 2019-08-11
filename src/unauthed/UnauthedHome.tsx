import * as React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Forgot from "./Forgot";

const NoMatch: React.FunctionComponent<{}> = () => {
  return <Redirect to="/" />;
};

interface Props {
  handleLogin(): any;
}

const UnauthedHome: React.FunctionComponent<Props> = ({ handleLogin }) => {
  return (
    <HashRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/login"
          render={routeProps => <Login handleLogin={handleLogin} />}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot" component={Forgot} />
        <Route component={NoMatch} />
      </div>
    </HashRouter>
  );
};

export default UnauthedHome;
