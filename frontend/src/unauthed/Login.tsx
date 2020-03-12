import * as React from "react";
import TextInput from "../shared/TextInput";
import SubmitInput from "../shared/SubmitInput"
import axios from "axios";
import Header from "../shared/Header";
import TwoCol from "../shared/TwoCol";
import ContentFrameCenter from "../shared/ContentFrameCenter";

interface Props {
  handleLogin: () => void;
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
    <ContentFrameCenter>
      <TwoCol>
        <Header>Sign in to your account.</Header>
        <form onSubmit={handleFormSubmit}>
          <TextInput
            type="text"
            name="email"
            placeholder="email@email.ca"
            value={credentials.email}
            onChange={handleFormChange}
          />
          <br />
          <TextInput
            type="password"
            name="password"
            placeholder="password goes here."
            value={credentials.password}
            onChange={handleFormChange}
          /><br />
          <SubmitInput type="submit" value="Login" />
        </form>
      </TwoCol>
      <TwoCol>
        <h1>A picture goes here.</h1>
      </TwoCol>
    </ContentFrameCenter>
  );
};




export default Login;
