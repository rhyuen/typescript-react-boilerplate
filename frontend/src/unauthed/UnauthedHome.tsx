import * as React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Forgot from "./Forgot";
import NotFound from "../NotFound";


interface Props {
  handleLogin(): any;
}

const UnauthedHome: React.FunctionComponent<Props> = ({ handleLogin }) => {
  return (
    <HashRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={routeProps => <Login handleLogin={handleLogin} />}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot" component={Forgot} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  );
};

export default UnauthedHome;
