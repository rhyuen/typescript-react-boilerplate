import * as React from "react";
import { Link } from "react-router-dom";

const Nav: React.FunctionComponent<{}> = () => {
  return (
    <nav>
      <section>
        <span>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="/about">About</Link>
        </span>
        <span>
          <Link to="/contact">contact</Link>
        </span>
      </section>
      <section>
        <span>UserName</span>
      </section>
    </nav>
  );
};

export default Nav;
