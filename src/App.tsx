import * as React from "react";
import { Route, HashRouter } from "react-router-dom";
import { hot } from "react-hot-loader";
import Form from "./Form";
import Nav from "./Nav";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));
const Contact = React.lazy(() => import("./Contact"));

interface Props {}

interface State {}

class App extends React.Component<Props, State> {
  state: State = {};

  componentDidMount() {}

  render() {
    return (
      <div className="root">
        <Form />

        <HashRouter>
          <div>
            <Nav />
            <React.Suspense fallback={"totally not loading..."}>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
            </React.Suspense>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default hot(module)(App);
