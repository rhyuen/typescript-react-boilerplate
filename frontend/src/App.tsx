import * as React from "react";
import { Route, HashRouter, Redirect } from "react-router-dom";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import Nav from "./Nav";
import Grid from "./Grid";

import UnauthedHome from "./unauthed/UnauthedHome";

const Home = React.lazy(() => import("./authed/Home"));
const About = React.lazy(() => import("./authed/About"));
const Contact = React.lazy(() => import("./authed/Contact"));

interface Props {}

interface State {
  authenticatedFlag: string;
  signedIn: boolean;
}

const ContentFrame: React.FunctionComponent<{}> = styled.section`
  background-color: papayawhip;
  grid-column: 2 / span 12;
`;

class App extends React.Component<Props, State> {
  state: State = {
    authenticatedFlag: "isAuthenticated",
    signedIn: false
  };

  toggleToLoggedInState = () => {
    const { authenticatedFlag } = this.state;
    window.localStorage.setItem(authenticatedFlag, "loggedIn");
    return this.setState({
      signedIn: true
    });
  };

  toggleToLoggedOutState = () => {
    const { authenticatedFlag } = this.state;
    window.localStorage.setItem(authenticatedFlag, "loggedOut");
    return this.setState({
      signedIn: false
    });
  };

  componentDidMount() {
    const { authenticatedFlag } = this.state;
    console.log(window.localStorage.getItem(authenticatedFlag));
    if (!window.localStorage.getItem(authenticatedFlag)) {
      window.localStorage.setItem(authenticatedFlag, "loggedOut");
    }
  }

  render() {
    const { authenticatedFlag } = this.state;
    const signedIn = window.localStorage.getItem(authenticatedFlag);
    console.log(`The value is ${signedIn}`);
    return signedIn === "loggedIn" ? (
      <HashRouter>
        <Grid>
          <Nav handleLogout={this.toggleToLoggedOutState} />
          <ContentFrame>
            <React.Suspense fallback={"totally not loading..."}>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route render={() => <Redirect to="/" />} />
            </React.Suspense>
          </ContentFrame>
        </Grid>
      </HashRouter>
    ) : (
      <UnauthedHome handleLogin={this.toggleToLoggedInState} />
    );
  }
}

export default hot(module)(App);