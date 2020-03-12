import * as React from "react";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Forgot from "./Forgot";
import NotFound from "../NotFound";
import Grid from "../Grid";


interface Props {
  handleLogin: () => void;
}

const UnauthedHome: React.FunctionComponent<Props> = ({ handleLogin }) => {
  return (
    <HashRouter>
      <Grid>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route
            exact
            path="/login"
            render={() => <Login handleLogin={handleLogin} />}
          />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/forgot" component={Forgot} />
          <Route
            path="/*"
            render={() => <Redirect to="/" />} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </HashRouter>
  );
};

export default UnauthedHome;
