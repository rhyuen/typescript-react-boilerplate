import * as React from "react";
import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import axios from "axios";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import NotFound from "./NotFound"
import Nav from "./Nav";
import Grid from "./Grid";

import UnauthedHome from "./unauthed/UnauthedHome";

const Home = React.lazy(() => import("./authed/Home"));
const Posts = React.lazy(() => import("./authed/Posts"));
const Friends = React.lazy(() => import("./authed/Friends"));

interface Props { }

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

  toggleToLoggedOutState = async () => {
    try {
      const result = await axios.get("/api/logout");
      console.dir(result);
      console.log('signout result.');


      const { authenticatedFlag } = this.state;
      window.localStorage.setItem(authenticatedFlag, "loggedOut");
      return this.setState({
        signedIn: false
      });
    } catch (e) {
      if (e.response.status === 500) {
        console.log("Something went wrong with the logout process");
        const { authenticatedFlag } = this.state;
        window.localStorage.setItem(authenticatedFlag, "loggedOut");
        return this.setState({
          signedIn: false
        });

      }
    };
  }

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

    return signedIn === "loggedIn" ? (
      <HashRouter>
        <Grid>
          <Nav handleLogout={this.toggleToLoggedOutState} />
          <ContentFrame>
            <React.Suspense fallback={"totally not loading..."}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/friends" component={Friends} />
                <Redirect to="/" />
              </Switch>
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
