import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import Grid from "../Grid";

interface Props {
  handleLogin(): any;
}
const Login: React.FunctionComponent<Props> = ({ handleLogin }) => {
  const [credentials, setCredentials] = React.useState({
    email: "",
    password: ""
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(credentials => {
      return {
        ...credentials,
        [name]: value
      };
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setCredentials(credentials => {
      const { email, password } = credentials;
      axios
        .post("/api/login", { email, password })
        .then(res => {
          console.log(res.data);
          handleLogin();
        })
        .catch(e => {
          console.log(e);
          console.log(e.response.data);
        });

      return {
        ...credentials,
        email: "",
        password: ""
      };
    });
  };

  return (
    <Grid>
      <LoginContainer>
        <h1>Login</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="email"
            placeholder="email@email.ca"
            value={credentials.email}
            onChange={handleFormChange}
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="password goes here."
            value={credentials.password}
            onChange={handleFormChange}
          />
          <input type="submit" value="signup" />
        </form>
      </LoginContainer>
    </Grid>
  );
};

const LoginContainer = styled.div`
  grid-column: 2 / span 12;
`;

export default Login;
